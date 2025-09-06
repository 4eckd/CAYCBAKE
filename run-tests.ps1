# schneckyirl Security Testing Launcher
param(
    [Parameter(Mandatory=$true)]
    [string]$Target,
    
    [Parameter(Mandatory=$false)]
    [string]$TestType = "all"
)

# Activate virtual environment
& ".\venv\Scripts\Activate.ps1"

# Run tests
Write-Host "Starting security tests against: $Target" -ForegroundColor Cyan
python test_cases\run_all_tests.py $Target

# Open report
$reportPath = "results\test_report.html"
if (Test-Path $reportPath) {
    Start-Process $reportPath
}
