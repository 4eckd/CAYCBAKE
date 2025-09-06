# 🍰 CAYC BAKE Installation for GitHub Codespaces

## Quick Install (Copy & Paste)

Open a terminal in your Codespace at https://special-xylophone-jj4j77jp5pr4fq475.github.dev/ and run:

```bash
# Step 1: Download the installer
curl -sL https://raw.githubusercontent.com/jlucus/schneckyirl/main/cayc-codespace.sh -o cayc-install.sh

# OR if you're in the schneckyirl directory already:
# cp cayc-codespace.sh cayc-install.sh

# Step 2: Make it executable
chmod +x cayc-install.sh

# Step 3: Run the installer
./cayc-install.sh
```

## Alternative: Manual Quick Setup

If you prefer to set up manually or the script doesn't work:

```bash
# 1. Clone the repository (if not already in it)
git clone https://github.com/jlucus/schneckyirl.git
cd schneckyirl

# 2. Create Python virtual environment
python3 -m venv venv
source venv/bin/activate

# 3. Install Python packages
pip install --upgrade pip
pip install requests beautifulsoup4 selenium scrapy paramiko scapy pwntools impacket python-nmap shodan colorama rich

# 4. Install system tools
sudo apt-get update
sudo apt-get install -y nmap nikto dirb sqlmap hydra curl wget jq dnsutils net-tools

# 5. Create directories
mkdir -p tools wordlists payloads results logs scripts

# 6. Download wordlists
curl -sL https://raw.githubusercontent.com/danielmiessler/SecLists/master/Discovery/Web-Content/common.txt -o wordlists/common.txt

# 7. Clone additional tools
git clone https://github.com/s0md3v/XSStrike tools/XSStrike
git clone https://github.com/s0md3v/Bolt tools/Bolt
```

## 🚀 Using CAYC BAKE in Codespaces

### Basic Commands

```bash
# Activate the environment
source venv/bin/activate

# Network scanning
nmap -sV example.com

# Web scanning
nikto -h http://example.com

# Directory bruteforce
dirb http://example.com wordlists/common.txt

# SQL injection testing
sqlmap -u "http://example.com/page.php?id=1" --batch
```

### Running Test Suites

```bash
# Run all tests against a target
./cayc-run.sh nmap -sV target.com

# Run specific test case
python3 test_cases/xss_scanner.py https://example.com

# Generate report
python3 scripts/generate_report.py
```

## 📁 Directory Structure

```
schneckyirl/
├── venv/                 # Python virtual environment
├── tools/                # Security testing tools
│   ├── XSStrike/        # XSS detection
│   └── Bolt/            # CSRF scanner
├── wordlists/           # Attack wordlists
├── payloads/            # Custom payloads
├── results/             # Scan results
├── logs/                # Application logs
└── scripts/             # Automation scripts
```

## ⚠️ Important Notes for Codespaces

1. **Resource Limits**: Codespaces have limited resources. Avoid intensive scans.
2. **Network Restrictions**: Some network operations may be restricted.
3. **Persistence**: Changes persist in your Codespace but not in the repo unless committed.
4. **Legal**: Only test systems you own or have explicit permission to test.

## 🔧 Troubleshooting

### Permission Denied
```bash
sudo chmod +x cayc-install.sh
```

### Package Not Found
```bash
sudo apt-get update
sudo apt-get install -y <package-name>
```

### Python Module Missing
```bash
source venv/bin/activate
pip install <module-name>
```

## 🎯 Quick Test

Test the installation with a safe target:

```bash
# Test DNS resolution
nslookup example.com

# Test HTTP headers
curl -I https://example.com

# Test Python environment
python3 -c "import requests; print('✓ Python packages working')"
```

## 📚 Resources

- [CAYC BAKE Documentation](./TOOLING.md)
- [Test Cases Guide](./TEST_CASES.md)
- [Security Report](./REPORT.md)

---

**Remember**: Only test systems you OWN or have WRITTEN PERMISSION to test! Unauthorized testing is illegal and unethical.

🍰 Happy Baking! 🤡
