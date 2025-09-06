#!/usr/bin/env pwsh
# CAYC BAKE - Universal Installation Script (PowerShell)
# Works on: Windows PowerShell, PowerShell Core, WSL
# Version: 2.2.0
# Author: @jlucus https://github.com/jlucus

param(
    [switch]$SkipPrompts = $false,
    [switch]$Minimal = $false,
    [switch]$Dev = $false
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

# Colors and formatting
$Script:Colors = @{
    Red     = "`e[31m"
    Green   = "`e[32m"
    Yellow  = "`e[33m"
    Blue    = "`e[34m"
    Magenta = "`e[35m"
    Cyan    = "`e[36m"
    White   = "`e[37m"
    Reset   = "`e[0m"
}

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host "$($Script:Colors[$Color])$Message$($Script:Colors['Reset'])"
}

function Write-Success { Write-ColorOutput "[✓] $args" "Green" }
function Write-Error { Write-ColorOutput "[✗] $args" "Red" }
function Write-Warning { Write-ColorOutput "[!] $args" "Yellow" }
function Write-Info { Write-ColorOutput "[i] $args" "Cyan" }
function Write-Step { Write-ColorOutput "`n► $args" "Magenta" }

# Detect operating system and environment
function Get-SystemInfo {
    $info = @{
        OS = ""
        IsWSL = $false
        IsWindows = $false
        IsLinux = $false
        IsMacOS = $false
        HasBash = $false
        HasPython = $false
        HasGit = $false
        HasGo = $false
        PythonVersion = ""
        Architecture = ""
    }
    
    # Check if running in WSL
    if ($IsLinux -and (Test-Path "/proc/version")) {
        $procVersion = Get-Content "/proc/version" -Raw
        if ($procVersion -match "Microsoft|WSL") {
            $info.IsWSL = $true
            $info.OS = "WSL"
        }
    }
    
    # Detect OS
    if ($PSVersionTable.Platform -eq "Unix") {
        if ($info.IsWSL) {
            $info.OS = "WSL"
        } elseif ($PSVersionTable.OS -match "Darwin") {
            $info.IsMacOS = $true
            $info.OS = "macOS"
        } else {
            $info.IsLinux = $true
            $info.OS = "Linux"
        }
    } else {
        $info.IsWindows = $true
        $info.OS = "Windows"
    }
    
    # Check for required tools
    $info.HasBash = (Get-Command bash -ErrorAction SilentlyContinue) -ne $null
    $info.HasPython = (Get-Command python3 -ErrorAction SilentlyContinue) -ne $null
    if (-not $info.HasPython) {
        $info.HasPython = (Get-Command python -ErrorAction SilentlyContinue) -ne $null
    }
    $info.HasGit = (Get-Command git -ErrorAction SilentlyContinue) -ne $null
    $info.HasGo = (Get-Command go -ErrorAction SilentlyContinue) -ne $null
    
    # Get Python version
    if ($info.HasPython) {
        try {
            $pythonCmd = if (Get-Command python3 -ErrorAction SilentlyContinue) { "python3" } else { "python" }
            $info.PythonVersion = & $pythonCmd --version 2>&1 | Select-String -Pattern "\d+\.\d+" | ForEach-Object { $_.Matches[0].Value }
        } catch {
            $info.PythonVersion = "Unknown"
        }
    }
    
    # Get architecture
    if ($info.IsWindows) {
        $info.Architecture = $env:PROCESSOR_ARCHITECTURE
    } else {
        $info.Architecture = & uname -m 2>/dev/null
    }
    
    return $info
}

# Show banner
function Show-Banner {
    Clear-Host
    Write-Host @"

     ██████╗ █████╗ ██╗   ██╗ ██████╗    ██████╗  █████╗ ██╗  ██╗███████╗
    ██╔════╝██╔══██╗╚██╗ ██╔╝██╔════╝    ██╔══██╗██╔══██╗██║ ██╔╝██╔════╝
    ██║     ███████║ ╚████╔╝ ██║         ██████╔╝███████║█████╔╝ █████╗  
    ██║     ██╔══██║  ╚██╔╝  ██║         ██╔══██╗██╔══██║██╔═██╗ ██╔══╝  
    ╚██████╗██║  ██║   ██║   ╚██████╗    ██████╔╝██║  ██║██║  ██╗███████╗
     ╚═════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
                                                                            
           🤡 Come At You, Clown - Baking Security Since 2025 🍰          
                    Universal Installation Script v2.1                      
                              
"@ -ForegroundColor Cyan
    
    Write-ColorOutput ("=" * 72) "Cyan"
    Write-ColorOutput '        "Let them eat cake... after we test their security!"' "Yellow"
    Write-ColorOutput ("=" * 72) "Cyan"
    Write-Host ""
}

# Check system requirements
function Test-Requirements {
    param($SystemInfo)
    
    Write-Step "Checking System Requirements"
    
    $requirements = @{
        Met = $true
        Issues = @()
    }
    
    # Check Python
    Write-Host -NoNewline "  Checking Python 3.10+... "
    if ($SystemInfo.HasPython) {
        $version = $SystemInfo.PythonVersion
        if ([version]$version -ge [version]"3.10") {
            Write-Success "($version)"
        } else {
            Write-Error "(Found $version, need 3.10+)"
            $requirements.Issues += "Python 3.10+ required"
            $requirements.Met = $false
        }
    } else {
        Write-Error "(Not found)"
        $requirements.Issues += "Python not installed"
        $requirements.Met = $false
    }
    
    # Check Git
    Write-Host -NoNewline "  Checking Git... "
    if ($SystemInfo.HasGit) {
        $gitVersion = git --version | Select-String -Pattern "\d+\.\d+" | ForEach-Object { $_.Matches[0].Value }
        Write-Success "($gitVersion)"
    } else {
        Write-Error "(Not found)"
        $requirements.Issues += "Git not installed"
        $requirements.Met = $false
    }
    
    # Check Go (optional)
    Write-Host -NoNewline "  Checking Go (optional)... "
    if ($SystemInfo.HasGo) {
        $goVersion = go version | Select-String -Pattern "go\d+\.\d+" | ForEach-Object { $_.Matches[0].Value }
        Write-Success "($goVersion)"
    } else {
        Write-Warning "(Not found - some tools won't be installed)"
    }
    
    # Check disk space
    Write-Host -NoNewline "  Checking disk space... "
    if ($SystemInfo.IsWindows) {
        $drive = (Get-Location).Drive
        $freeSpace = [math]::Round((Get-PSDrive $drive).Free / 1GB, 2)
    } else {
        $freeSpace = [math]::Round((Get-PSDrive .).Free / 1GB, 2)
    }
    
    if ($freeSpace -ge 5) {
        Write-Success "($freeSpace GB available)"
    } else {
        Write-Warning "($freeSpace GB available, recommend 5GB+)"
    }
    
    Write-Host ""
    return $requirements
}

# Install Python if needed
function Install-Python {
    param($SystemInfo)
    
    Write-Step "Checking Python Installation"
    
    $requiredVersion = [version]"3.10.0"
    $needsInstall = $false
    
    if (-not $SystemInfo.HasPython) {
        Write-Warning "Python not found. Installing Python 3.10+..."
        $needsInstall = $true
    } else {
        $currentVersion = [version]$SystemInfo.PythonVersion
        if ($currentVersion -lt $requiredVersion) {
            Write-Warning "Python $($SystemInfo.PythonVersion) found, but 3.10+ required. Installing..."
            $needsInstall = $true
        } else {
            Write-Success "Python $($SystemInfo.PythonVersion) is already installed"
            return
        }
    }
    
    if ($needsInstall) {
        if ($SystemInfo.IsWindows -and -not $SystemInfo.IsWSL) {
            # Windows - use winget or download directly
            $hasWinget = (Get-Command winget -ErrorAction SilentlyContinue) -ne $null
            
            if ($hasWinget) {
                Write-Info "Installing Python via winget..."
                winget install --id Python.Python.3.10 --silent --accept-package-agreements --accept-source-agreements
            } else {
                Write-Info "Downloading Python installer..."
                $pythonUrl = "https://www.python.org/ftp/python/3.10.11/python-3.10.11-amd64.exe"
                $installerPath = "$env:TEMP\python-installer.exe"
                
                Invoke-WebRequest -Uri $pythonUrl -OutFile $installerPath
                Start-Process -FilePath $installerPath -ArgumentList "/quiet", "InstallAllUsers=1", "PrependPath=1" -Wait
                Remove-Item $installerPath
            }
        } elseif ($SystemInfo.IsLinux -or $SystemInfo.IsWSL) {
            # Linux/WSL - use deadsnakes PPA for Ubuntu/Debian
            Write-Info "Installing Python 3.10 via package manager..."
            
            if (Get-Command apt -ErrorAction SilentlyContinue) {
                sudo apt update
                sudo apt install -y software-properties-common
                sudo add-apt-repository -y ppa:deadsnakes/ppa
                sudo apt update
                sudo apt install -y python3.10 python3.10-venv python3.10-dev python3-pip
                
                # Set python3.10 as default python3
                sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.10 1
            } elseif (Get-Command yum -ErrorAction SilentlyContinue) {
                sudo yum install -y python3.10 python3.10-devel python3-pip
            }
        } elseif ($SystemInfo.IsMacOS) {
            # macOS - use Homebrew
            Write-Info "Installing Python 3.10 via Homebrew..."
            brew install python@3.10
        }
        
        Write-Success "Python installation completed"
    }
}

# Install system packages based on OS
function Install-SystemPackages {
    param($SystemInfo)
    
    Write-Step "Installing System Packages"
    
    if ($SystemInfo.IsWindows -and -not $SystemInfo.IsWSL) {
        # Windows native - use winget or chocolatey
        Write-Info "Checking for package managers..."
        
        $hasWinget = (Get-Command winget -ErrorAction SilentlyContinue) -ne $null
        $hasChoco = (Get-Command choco -ErrorAction SilentlyContinue) -ne $null
        
        if ($hasWinget) {
            Write-Info "Using winget to install packages..."
            $packages = @("Python.Python.3.11", "Git.Git", "GoLang.Go")
            foreach ($pkg in $packages) {
                try {
                    winget install --id $pkg --silent --accept-package-agreements --accept-source-agreements
                    Write-Success "Installed $pkg"
                } catch {
                    Write-Warning "Failed to install $pkg"
                }
            }
        } elseif ($hasChoco) {
            Write-Info "Using Chocolatey to install packages..."
            choco install python git golang -y
        } else {
            Write-Warning "No package manager found. Please install tools manually:"
            Write-Host "  - Python 3.8+: https://www.python.org/downloads/"
            Write-Host "  - Git: https://git-scm.com/download/win"
            Write-Host "  - Go: https://go.dev/dl/"
        }
        
    } elseif ($SystemInfo.IsLinux -or $SystemInfo.IsWSL) {
        Write-Info "Installing Linux packages..."
        
        # Detect package manager
        $hasApt = (Get-Command apt -ErrorAction SilentlyContinue) -ne $null
        $hasYum = (Get-Command yum -ErrorAction SilentlyContinue) -ne $null
        $hasDnf = (Get-Command dnf -ErrorAction SilentlyContinue) -ne $null
        $hasPacman = (Get-Command pacman -ErrorAction SilentlyContinue) -ne $null
        
        if ($hasApt) {
            Write-Info "Using apt package manager..."
            sudo apt update
            sudo apt install -y python3 python3-pip python3-venv git curl wget `
                build-essential libssl-dev libffi-dev python3-dev `
                nmap nikto dirb sqlmap hydra tcpdump whois dnsutils net-tools
        } elseif ($hasDnf -or $hasYum) {
            $pkgManager = if ($hasDnf) { "dnf" } else { "yum" }
            Write-Info "Using $pkgManager package manager..."
            sudo $pkgManager install -y python3 python3-pip git curl wget `
                gcc gcc-c++ make openssl-devel `
                nmap nikto dirb sqlmap hydra
        } elseif ($hasPacman) {
            Write-Info "Using pacman package manager..."
            sudo pacman -S --noconfirm python python-pip git curl wget `
                base-devel nmap nikto dirb sqlmap hydra
        }
        
    } elseif ($SystemInfo.IsMacOS) {
        Write-Info "Installing macOS packages..."
        
        # Check for Homebrew
        $hasBrew = (Get-Command brew -ErrorAction SilentlyContinue) -ne $null
        if (-not $hasBrew) {
            Write-Warning "Homebrew not found. Installing..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        }
        
        Write-Info "Using Homebrew to install packages..."
        brew install python3 git nmap nikto dirb sqlmap hashcat john hydra
    }
    
    Write-Success "System packages installation completed"
}

# Setup Python environment
function Initialize-PythonEnvironment {
    Write-Step "Setting up Python Environment"
    
    # Determine Python command
    $pythonCmd = if (Get-Command python3.10 -ErrorAction SilentlyContinue) { 
        "python3.10" 
    } elseif (Get-Command python3 -ErrorAction SilentlyContinue) { 
        "python3" 
    } else { 
        "python" 
    }
    
    Write-Info "Using Python command: $pythonCmd"
    
    # Ensure pip is installed
    Write-Info "Ensuring pip is installed..."
    & $pythonCmd -m ensurepip --upgrade 2>$null
    if (-not $?) {
        Write-Info "Installing pip..."
        $pipScript = New-TemporaryFile
        Invoke-WebRequest -Uri "https://bootstrap.pypa.io/get-pip.py" -OutFile $pipScript
        & $pythonCmd $pipScript
        Remove-Item $pipScript
    }
    
    # Upgrade pip
    Write-Info "Upgrading pip..."
    & $pythonCmd -m pip install --upgrade pip --quiet
    
    # Install venv if not available
    Write-Info "Checking venv module..."
    $venvCheck = & $pythonCmd -c "import venv" 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Info "Installing venv module..."
        if ($IsWindows) {
            & $pythonCmd -m pip install virtualenv --quiet
        } else {
            # On Linux, install python3-venv package
            if (Get-Command apt -ErrorAction SilentlyContinue) {
                sudo apt install -y python3.10-venv
            } elseif (Get-Command yum -ErrorAction SilentlyContinue) {
                sudo yum install -y python3-venv
            }
        }
    }
    
    # Create virtual environment
    if (-not (Test-Path "venv")) {
        Write-Info "Creating virtual environment..."
        & $pythonCmd -m venv venv
        if (-not (Test-Path "venv")) {
            # Fallback to virtualenv if venv fails
            Write-Warning "venv failed, trying virtualenv..."
            & $pythonCmd -m virtualenv venv
        }
        Write-Success "Virtual environment created"
    } else {
        Write-Info "Virtual environment already exists"
    }
    
    # Activate virtual environment
    Write-Info "Activating virtual environment..."
    if ($IsWindows -and -not $IsLinux) {
        $activateScript = ".\venv\Scripts\Activate.ps1"
    } else {
        $activateScript = "./venv/bin/activate"
    }
    
    if (Test-Path $activateScript) {
        & $activateScript
    }
    
    # Upgrade pip
    Write-Info "Upgrading pip..."
    & $pythonCmd -m pip install --upgrade pip --quiet
    
    # Install requirements
    if (Test-Path "requirements.txt") {
        Write-Info "Installing Python packages from requirements.txt..."
        & $pythonCmd -m pip install -r requirements.txt --quiet
        Write-Success "Python packages installed"
    } else {
        Write-Warning "requirements.txt not found, creating one..."
        
        $requirements = @"
# CAYC BAKE Python Requirements
requests>=2.31.0
beautifulsoup4>=4.12.0
selenium>=4.15.0
scrapy>=2.11.0
paramiko>=3.3.0
scapy>=2.5.0
pwntools>=4.11.0
impacket>=0.11.0
python-nmap>=0.7.1
shodan>=1.30.0
censys>=2.2.0
dnspython>=2.4.0
cryptography>=41.0.0
colorama>=0.4.6
rich>=13.5.0
python-dotenv>=1.0.0
aiohttp>=3.8.0
asyncio>=3.4.3
pytest>=7.4.0
black>=23.7.0
"@
        Set-Content -Path "requirements.txt" -Value $requirements
        & $pythonCmd -m pip install -r requirements.txt --quiet
    }
}

# Install Go tools
function Install-GoTools {
    param($SystemInfo)
    
    if (-not $SystemInfo.HasGo) {
        Write-Warning "Go not installed, skipping Go tools"
        return
    }
    
    Write-Step "Installing Go-based Security Tools"
    
    $env:GO111MODULE = "on"
    $goTools = @(
        "github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest",
        "github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest",
        "github.com/projectdiscovery/httpx/cmd/httpx@latest",
        "github.com/ffuf/ffuf/v2@latest",
        "github.com/OJ/gobuster/v3@latest"
    )
    
    foreach ($tool in $goTools) {
        $toolName = ($tool -split '/')[-1] -replace '@.*', ''
        Write-Info "Installing $toolName..."
        try {
            go install $tool 2>$null
            Write-Success "$toolName installed"
        } catch {
            Write-Warning "Failed to install $toolName"
        }
    }
}

# Clone additional security tools
function Install-SecurityTools {
    Write-Step "Installing Additional Security Tools"
    
    $tools = @{
        "XSStrike" = "https://github.com/s0md3v/XSStrike"
        "Bolt" = "https://github.com/s0md3v/Bolt"
        "cloud_enum" = "https://github.com/initstring/cloud_enum"
    }
    
    New-Item -ItemType Directory -Force -Path "tools" | Out-Null
    
    foreach ($tool in $tools.GetEnumerator()) {
        $toolPath = Join-Path "tools" $tool.Key
        if (-not (Test-Path $toolPath)) {
            Write-Info "Cloning $($tool.Key)..."
            git clone $tool.Value $toolPath 2>$null
            if ($?) {
                Write-Success "$($tool.Key) cloned"
                
                # Install requirements if exists
                $reqFile = Join-Path $toolPath "requirements.txt"
                if (Test-Path $reqFile) {
                    $pythonCmd = if (Get-Command python3 -ErrorAction SilentlyContinue) { "python3" } else { "python" }
                    & $pythonCmd -m pip install -r $reqFile --quiet 2>$null
                }
            } else {
                Write-Warning "Failed to clone $($tool.Key)"
            }
        } else {
            Write-Info "$($tool.Key) already exists"
        }
    }
}

# Download wordlists
function Install-Wordlists {
    Write-Step "Downloading Wordlists"
    
    New-Item -ItemType Directory -Force -Path "wordlists" | Out-Null
    
    $wordlists = @{
        "common.txt" = "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Discovery/Web-Content/common.txt"
        "directory-list-small.txt" = "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Discovery/Web-Content/directory-list-2.3-small.txt"
        "api-endpoints.txt" = "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Discovery/Web-Content/api/api-endpoints.txt"
    }
    
    foreach ($file in $wordlists.GetEnumerator()) {
        $outputPath = Join-Path "wordlists" $file.Key
        if (-not (Test-Path $outputPath)) {
            Write-Info "Downloading $($file.Key)..."
            try {
                Invoke-WebRequest -Uri $file.Value -OutFile $outputPath -UseBasicParsing
                Write-Success "$($file.Key) downloaded"
            } catch {
                Write-Warning "Failed to download $($file.Key)"
            }
        } else {
            Write-Info "$($file.Key) already exists"
        }
    }
}

# Create project structure
function Initialize-ProjectStructure {
    Write-Step "Creating Project Structure"
    
    $directories = @(
        "results",
        "logs",
        "payloads/xss",
        "payloads/sqli",
        "payloads/csrf",
        "scripts/automation",
        "scripts/reporting",
        "tools/reconnaissance",
        "tools/exploitation",
        "tools/post-exploitation"
    )
    
    foreach ($dir in $directories) {
        if (-not (Test-Path $dir)) {
            New-Item -ItemType Directory -Force -Path $dir | Out-Null
            Write-Success "Created $dir"
        }
    }
    
    # Create .gitkeep files
    foreach ($dir in $directories) {
        $gitkeep = Join-Path $dir ".gitkeep"
        if (-not (Test-Path $gitkeep)) {
            New-Item -ItemType File -Force -Path $gitkeep | Out-Null
        }
    }
}

# Create launcher scripts
function New-LauncherScripts {
    Write-Step "Creating Launcher Scripts"
    
    # Create PowerShell launcher
    $psLauncher = @'
#!/usr/bin/env pwsh
# CAYC BAKE Launcher (PowerShell)
param(
    [string]$Target = "",
    [string]$Tool = "",
    [switch]$Help
)

if ($Help) {
    Write-Host "CAYC BAKE Security Testing Framework"
    Write-Host "Usage: .\run.ps1 -Target <url> -Tool <tool>"
    Write-Host ""
    Write-Host "Tools available:"
    Write-Host "  scan     - Run comprehensive scan"
    Write-Host "  xss      - XSS vulnerability testing"
    Write-Host "  sqli     - SQL injection testing"
    Write-Host "  api      - API fuzzing"
    Write-Host "  rng      - RNG analysis"
    exit
}

# Activate virtual environment
if (Test-Path "venv\Scripts\Activate.ps1") {
    & ".\venv\Scripts\Activate.ps1"
} elseif (Test-Path "venv/bin/activate") {
    & bash -c "source venv/bin/activate"
}

Write-Host "🍰 CAYC BAKE Security Framework" -ForegroundColor Cyan

if ($Target) {
    Write-Host "Target: $Target" -ForegroundColor Yellow
    
    switch ($Tool) {
        "scan" { python attack_orcestrator.py $Target }
        "xss" { python xss_scanner.py $Target }
        "sqli" { sqlmap -u $Target --batch }
        "api" { python api_fuzzer.py $Target }
        "rng" { python rng_analyzer.py $Target }
        default { python attack_orcestrator.py $Target }
    }
} else {
    Write-Host "No target specified. Use -Target <url>" -ForegroundColor Red
}
'@
    
    Set-Content -Path "run.ps1" -Value $psLauncher
    
    # Create Bash launcher
    $bashLauncher = @'
#!/bin/bash
# CAYC BAKE Launcher (Bash)

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

TARGET="$1"
TOOL="${2:-scan}"

if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo -e "${CYAN}CAYC BAKE Security Testing Framework${NC}"
    echo "Usage: ./run.sh <target> [tool]"
    echo ""
    echo "Tools available:"
    echo "  scan     - Run comprehensive scan"
    echo "  xss      - XSS vulnerability testing"
    echo "  sqli     - SQL injection testing"
    echo "  api      - API fuzzing"
    echo "  rng      - RNG analysis"
    exit 0
fi

# Activate virtual environment
if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
fi

echo -e "${CYAN}🍰 CAYC BAKE Security Framework${NC}"

if [ -n "$TARGET" ]; then
    echo -e "${YELLOW}Target: $TARGET${NC}"
    
    case $TOOL in
        scan) python3 attack_orcestrator.py "$TARGET" ;;
        xss) python3 xss_scanner.py "$TARGET" ;;
        sqli) sqlmap -u "$TARGET" --batch ;;
        api) python3 api_fuzzer.py "$TARGET" ;;
        rng) python3 rng_analyzer.py "$TARGET" ;;
        *) python3 attack_orcestrator.py "$TARGET" ;;
    esac
else
    echo -e "${RED}No target specified. Usage: ./run.sh <target>${NC}"
fi
'@
    
    Set-Content -Path "run.sh" -Value $bashLauncher
    
    # Make bash script executable
    if (Get-Command chmod -ErrorAction SilentlyContinue) {
        chmod +x run.sh
    }
    
    # Create .env.example
    if (-not (Test-Path ".env.example")) {
        $envTemplate = @'
# CAYC BAKE Configuration
TARGET_URL=https://example.com
TARGET_DOMAIN=example.com

# API Keys (Keep these secret!)
SHODAN_API_KEY=
CENSYS_API_ID=
CENSYS_API_SECRET=
VIRUSTOTAL_API_KEY=

# Proxy Configuration
HTTP_PROXY=
HTTPS_PROXY=
SOCKS_PROXY=

# Rate Limiting
MAX_REQUESTS_PER_SECOND=10
DELAY_BETWEEN_REQUESTS=100

# Output Configuration
OUTPUT_DIR=results
LOG_LEVEL=INFO

# Security Settings
VERIFY_SSL=true
FOLLOW_REDIRECTS=true
MAX_REDIRECTS=10
TIMEOUT=30
'@
        Set-Content -Path ".env.example" -Value $envTemplate
        Write-Success "Created .env.example"
    }
    
    Write-Success "Launcher scripts created"
}

# Main installation function
function Start-Installation {
    Show-Banner
    
    # Get system information
    $systemInfo = Get-SystemInfo
    Write-Info "Detected: $($systemInfo.OS) on $($systemInfo.Architecture)"
    Write-Host ""
    
    # Legal notice
    Write-Warning "⚠️  CAYC BAKE - Offensive Security Framework ⚠️"
    Write-Warning "This installer deploys professional penetration testing tools."
    Write-Warning "Only test systems you OWN or have WRITTEN AUTHORIZATION to test!"
    Write-Host ""
    
    if (-not $SkipPrompts) {
        $consent = Read-Host "Do you understand and agree to use these tools responsibly? (yes/no)"
        if ($consent -ne "yes") {
            Write-Error "Installation cancelled. You must agree to responsible use."
            exit 1
        }
    }
    
    Write-Host ""
    Write-Info "Starting installation process..."
    Write-ColorOutput ("=" * 72) "Cyan"
    
    # Check requirements
    $requirements = Test-Requirements -SystemInfo $systemInfo
    if (-not $requirements.Met -and -not $SkipPrompts) {
        Write-Warning "Some requirements are not met:"
        $requirements.Issues | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
        $continue = Read-Host "Continue anyway? (y/N)"
        if ($continue -ne "y") {
            Write-Error "Installation cancelled."
            exit 1
        }
    }
    
    # Install Python if needed or wrong version
    Install-Python -SystemInfo $systemInfo
    
    # Re-check system info after potential Python installation
    $systemInfo = Get-SystemInfo
    
    # Installation steps
    if (-not $Minimal) {
        if (-not $SkipPrompts) {
            $installPackages = Read-Host "Install system packages? (y/N)"
            if ($installPackages -eq "y") {
                Install-SystemPackages -SystemInfo $systemInfo
            }
        }
    }
    
    Initialize-ProjectStructure
    Initialize-PythonEnvironment
    
    if (-not $Minimal) {
        Install-SecurityTools
        Install-Wordlists
        
        if ($systemInfo.HasGo -and -not $SkipPrompts) {
            $installGo = Read-Host "Install Go-based tools? (y/N)"
            if ($installGo -eq "y") {
                Install-GoTools -SystemInfo $systemInfo
            }
        }
    }
    
    New-LauncherScripts
    
    # Installation complete
    Write-Host ""
    Write-ColorOutput ("=" * 72) "Cyan"
    Write-Success "🎂 CAYC BAKE Installation Complete! The oven is hot! 🔥"
    Write-Host ""
    
    Write-Info "🍰 Your Security Kitchen is Ready:"
    Write-Host "  1. 📋 Review documentation: " -NoNewline
    Write-ColorOutput "README.md, TOOLING.md" "Yellow"
    Write-Host "  2. ⚙️  Configure environment: " -NoNewline
    Write-ColorOutput "cp .env.example .env" "Yellow"
    Write-Host "  3. 🎯 Run security tests:" -NoNewline
    Write-Host ""
    Write-ColorOutput "       PowerShell: .\run.ps1 -Target https://example.com" "Green"
    Write-ColorOutput "       Bash:       ./run.sh https://example.com" "Green"
    Write-Host ""
    
    Write-ColorOutput "╔════════════════════════════════════════════════════════════════╗" "Red"
    Write-ColorOutput "║  ⚠️  LEGAL WARNING: Only test what you OWN or have PERMISSION! ║" "Yellow"
    Write-ColorOutput "╚════════════════════════════════════════════════════════════════╝" "Red"
}

# Entry point
if ($MyInvocation.InvocationName -ne '.') {
    Start-Installation
}
