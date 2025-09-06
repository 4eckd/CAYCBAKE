#!/usr/bin/env pwsh
# CAYC BAKE Git Workflow Helper Script
# Automates common git workflow tasks

param(
    [Parameter(Position=0)]
    [ValidateSet('feature', 'bugfix', 'security', 'release', 'hotfix', 'finish', 'sync', 'status')]
    [string]$Action = 'status',
    
    [Parameter(Position=1)]
    [string]$Name = '',
    
    [switch]$Push = $false,
    [switch]$Help = $false
)

# Colors
function Write-Success { Write-Host $args -ForegroundColor Green }
function Write-Error { Write-Host $args -ForegroundColor Red }
function Write-Warning { Write-Host $args -ForegroundColor Yellow }
function Write-Info { Write-Host $args -ForegroundColor Cyan }

# Show help
if ($Help) {
    Write-Host @"
🔀 CAYC BAKE Git Workflow Helper

Usage: .\git-workflow.ps1 <action> [name] [options]

Actions:
  feature <name>  - Create new feature branch
  bugfix <name>   - Create bugfix branch
  security <name> - Create security patch branch
  release <version> - Start release process
  hotfix <version> - Create hotfix branch
  finish          - Finish current branch (merge to develop)
  sync            - Sync with remote branches
  status          - Show workflow status

Options:
  -Push           - Push to remote after creating branch
  -Help           - Show this help message

Examples:
  .\git-workflow.ps1 feature xss-detector
  .\git-workflow.ps1 bugfix installer-error -Push
  .\git-workflow.ps1 release 2.2.0
  .\git-workflow.ps1 finish
"@
    exit 0
}

# Check if in git repository
if (!(Test-Path .git)) {
    Write-Error "Not in a git repository!"
    exit 1
}

# Get current branch
$currentBranch = git rev-parse --abbrev-ref HEAD

# Functions
function New-Branch {
    param($prefix, $name)
    
    if (!$name) {
        Write-Error "Branch name required!"
        exit 1
    }
    
    $branchName = "$prefix/$name"
    
    # Check if branch exists
    $exists = git show-ref --verify --quiet "refs/heads/$branchName"
    if ($LASTEXITCODE -eq 0) {
        Write-Error "Branch $branchName already exists!"
        exit 1
    }
    
    # Create from develop branch
    Write-Info "Creating branch: $branchName from develop..."
    git checkout develop
    git pull origin develop
    git checkout -b $branchName
    
    if ($Push) {
        Write-Info "Pushing to remote..."
        git push -u origin $branchName
    }
    
    Write-Success "✅ Created branch: $branchName"
    Write-Info "Start working on your changes, then run: .\git-workflow.ps1 finish"
}

function Finish-Branch {
    if ($currentBranch -in @('main', 'master', 'develop')) {
        Write-Error "Cannot finish $currentBranch branch!"
        exit 1
    }
    
    Write-Info "Finishing branch: $currentBranch"
    
    # Check for uncommitted changes
    $status = git status --porcelain
    if ($status) {
        Write-Warning "You have uncommitted changes. Commit them first!"
        $commit = Read-Host "Commit all changes? (y/n)"
        if ($commit -eq 'y') {
            $message = Read-Host "Commit message"
            git add -A
            git commit -m $message
        } else {
            exit 1
        }
    }
    
    # Determine target branch
    $target = 'develop'
    if ($currentBranch -match '^(hotfix|security)/') {
        $target = 'main'
    }
    
    Write-Info "Merging to $target..."
    git checkout $target
    git pull origin $target
    git merge --no-ff $currentBranch -m "Merge branch '$currentBranch'"
    
    if ($Push) {
        git push origin $target
    }
    
    # Ask to delete branch
    $delete = Read-Host "Delete branch $currentBranch? (y/n)"
    if ($delete -eq 'y') {
        git branch -d $currentBranch
        if ($Push) {
            git push origin --delete $currentBranch
        }
    }
    
    Write-Success "✅ Branch $currentBranch merged to $target"
}

function Start-Release {
    param($version)
    
    if (!$version) {
        Write-Error "Version required! (e.g., 2.2.0)"
        exit 1
    }
    
    $branchName = "release/v$version"
    
    Write-Info "Starting release: v$version"
    
    # Create release branch from develop
    git checkout develop
    git pull origin develop
    git checkout -b $branchName
    
    # Update version files
    Write-Info "Update version in the following files:"
    Write-Host "  - README.md"
    Write-Host "  - install.ps1"
    Write-Host "  - install.sh"
    Write-Host "  - requirements.txt"
    
    $continue = Read-Host "Press Enter when version updates are complete"
    
    # Commit version bump
    git add -A
    git commit -m "chore: bump version to v$version"
    
    if ($Push) {
        git push -u origin $branchName
    }
    
    Write-Success "✅ Release branch created: $branchName"
    Write-Info "Next steps:"
    Write-Host "  1. Complete testing"
    Write-Host "  2. Merge to main: git checkout main && git merge --no-ff $branchName"
    Write-Host "  3. Tag: git tag -a v$version -m 'Release v$version'"
    Write-Host "  4. Merge back to develop: git checkout develop && git merge --no-ff $branchName"
}

function Sync-Branches {
    Write-Info "Syncing with remote..."
    
    git fetch --all --prune
    
    # Update main branches
    $branches = @('main', 'master', 'develop')
    foreach ($branch in $branches) {
        if (git show-ref --verify --quiet "refs/heads/$branch") {
            Write-Info "Updating $branch..."
            git checkout $branch
            git pull origin $branch
        }
    }
    
    git checkout $currentBranch
    Write-Success "✅ Branches synced"
}

function Show-Status {
    Write-Host ""
    Write-Host "🔀 CAYC BAKE Git Workflow Status" -ForegroundColor Cyan
    Write-Host "=================================" -ForegroundColor Cyan
    
    Write-Info "Current branch: $currentBranch"
    
    # Show branch list with descriptions
    Write-Host "`nLocal branches:" -ForegroundColor Yellow
    git branch -v
    
    # Show recent commits
    Write-Host "`nRecent commits:" -ForegroundColor Yellow
    git log --oneline -5
    
    # Show status
    Write-Host "`nWorking tree status:" -ForegroundColor Yellow
    git status -s
    
    # Show remotes
    Write-Host "`nRemote branches:" -ForegroundColor Yellow
    git branch -r
}

# Main execution
switch ($Action) {
    'feature' { New-Branch 'feature' $Name }
    'bugfix' { New-Branch 'bugfix' $Name }
    'security' { New-Branch 'security' $Name }
    'release' { Start-Release $Name }
    'hotfix' { New-Branch 'hotfix' $Name }
    'finish' { Finish-Branch }
    'sync' { Sync-Branches }
    'status' { Show-Status }
    default { Show-Status }
}
