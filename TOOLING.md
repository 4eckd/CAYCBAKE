<!-- 
Author: @jlucus https://github.com/jlucus
Date: September 5, 2025
Version: 2.0.0
-->

# Security Testing Tooling Documentation
**Project:** schneckyirl Security Audit  
**Date:** September 6, 2025  
**Version:** 1.0.0

---

## 📋 Table of Contents
1. [Environment Setup](#environment-setup)
2. [Core Tools](#core-tools)
3. [Specialized Tools](#specialized-tools)
4. [Custom Scripts](#custom-scripts)
5. [Installation Guide](#installation-guide)
6. [Usage Examples](#usage-examples)

---

## 🖥️ Environment Setup

### System Requirements
```yaml
Minimum:
  RAM: 8GB
  Storage: 50GB free
  CPU: 4 cores
  Network: Stable internet connection

Recommended:
  RAM: 16GB+
  Storage: 100GB+ SSD
  CPU: 8+ cores
  Network: Multiple IPs/VPN capability
```

### Operating System Configuration
```bash
# WSL2 on Windows (Primary)
wsl --install -d Ubuntu-24.04
wsl --set-default-version 2

# Kali Linux (Alternative)
# Download from: https://www.kali.org/get-kali/
```

---

## 🔧 Core Tools

### 1. `/tools/reconnaissance/`
Tools for information gathering and enumeration.

#### **Nmap** - Network Scanner
```bash
# Installation
sudo apt install nmap

# Location: /tools/reconnaissance/nmap/
# Version: 7.94
# Purpose: Port scanning, service detection, OS fingerprinting
```

#### **Subfinder** - Subdomain Discovery
```bash
# Installation
go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest

# Location: /tools/reconnaissance/subfinder/
# Version: 2.6.3
# Purpose: Enumerate subdomains using passive sources
```

#### **Amass** - Asset Discovery
```bash
# Installation
go install -v github.com/owasp-amass/amass/v4/...@master

# Location: /tools/reconnaissance/amass/
# Version: 4.2.0
# Purpose: Network mapping and external asset discovery
```

---

### 2. `/tools/web_testing/`
Web application security testing tools.

#### **Burp Suite** - Web Security Testing Platform
```bash
# Download Community Edition
wget https://portswigger.net/burp/releases/download?product=community&type=Linux

# Location: /tools/web_testing/burp/
# Version: 2024.2.1
# Purpose: Intercepting proxy, scanner, intruder
```

#### **OWASP ZAP** - Web App Scanner
```bash
# Installation
sudo snap install zaproxy --classic

# Location: /tools/web_testing/zap/
# Version: 2.14.0
# Purpose: Automated web application security scanner
```

#### **Nikto** - Web Server Scanner
```bash
# Installation
sudo apt install nikto

# Location: /tools/web_testing/nikto/
# Version: 2.5.0
# Purpose: Web server vulnerability scanner
```

#### **SQLMap** - SQL Injection Tool
```bash
# Installation
git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git

# Location: /tools/web_testing/sqlmap/
# Version: 1.7
# Purpose: Automated SQL injection and database takeover
```

---

### 3. `/tools/fuzzing/`
Fuzzing and directory brute-forcing tools.

#### **FFuF** - Fast Web Fuzzer
```bash
# Installation
go install github.com/ffuf/ffuf/v2@latest

# Location: /tools/fuzzing/ffuf/
# Version: 2.1.0
# Purpose: Fast web fuzzer for directory/file discovery
```

#### **Gobuster** - Directory/File Brute-forcer
```bash
# Installation
go install github.com/OJ/gobuster/v3@latest

# Location: /tools/fuzzing/gobuster/
# Version: 3.6.0
# Purpose: Directory and file brute-forcing
```

#### **Dirb** - Web Content Scanner
```bash
# Installation
sudo apt install dirb

# Location: /tools/fuzzing/dirb/
# Version: 2.22
# Purpose: Web content scanner and directory brute-forcer
```

---

### 4. `/tools/exploitation/`
Exploitation frameworks and tools.

#### **Metasploit** - Exploitation Framework
```bash
# Installation
curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall
chmod 755 msfinstall
./msfinstall

# Location: /tools/exploitation/metasploit/
# Version: 6.3.45
# Purpose: Penetration testing framework
```

#### **BeEF** - Browser Exploitation Framework
```bash
# Installation
git clone https://github.com/beefproject/beef
cd beef && ./install

# Location: /tools/exploitation/beef/
# Version: 0.5.4.0
# Purpose: Browser exploitation and XSS testing
```

#### **XSStrike** - XSS Detection Suite
```bash
# Installation
git clone https://github.com/s0md3v/XSStrike
cd XSStrike && pip3 install -r requirements.txt

# Location: /tools/exploitation/xsstrike/
# Version: 3.1.5
# Purpose: Advanced XSS detection and exploitation
```

---

### 5. `/tools/csrf/`
CSRF testing and exploitation tools.

#### **CSRFTester** - CSRF PoC Generator
```bash
# Custom implementation
# Location: /tools/csrf/csrf_tester/
# See: csrf_attacker.py
```

#### **Bolt** - CSRF Scanner
```bash
# Installation
git clone https://github.com/s0md3v/Bolt
cd Bolt && pip3 install -r requirements.txt

# Location: /tools/csrf/bolt/
# Version: 1.0
# Purpose: CSRF token extraction and testing
```

---

### 6. `/tools/cloud/`
Cloud infrastructure testing tools.

#### **S3Scanner** - S3 Bucket Scanner
```bash
# Already present in project
# Location: /scanner/
# Purpose: AWS S3 bucket enumeration and permission testing
```

#### **CloudEnum** - Multi-cloud OSINT
```bash
# Installation
git clone https://github.com/initstring/cloud_enum
cd cloud_enum && pip3 install -r requirements.txt

# Location: /tools/cloud/cloud_enum/
# Version: Latest
# Purpose: Multi-cloud storage enumeration
```

#### **ScoutSuite** - Cloud Security Auditing
```bash
# Installation
pip3 install scoutsuite

# Location: /tools/cloud/scoutsuite/
# Version: 5.13.0
# Purpose: Multi-cloud security auditing
```

---

### 7. `/tools/crypto/`
Cryptographic analysis tools.

#### **HashCat** - Password Recovery
```bash
# Installation
sudo apt install hashcat

# Location: /tools/crypto/hashcat/
# Version: 6.2.6
# Purpose: Advanced password recovery
```

#### **John the Ripper** - Password Cracker
```bash
# Installation
sudo apt install john

# Location: /tools/crypto/john/
# Version: 1.9.0
# Purpose: Password cracking and hash analysis
```

---

### 8. `/tools/scraping/`
Data extraction and scraping tools.

#### **Scrapy** - Web Scraping Framework
```bash
# Installation
pip3 install scrapy

# Location: /tools/scraping/scrapy/
# Version: 2.11.0
# Purpose: Web scraping and data extraction
```

#### **Playwright** - Browser Automation
```bash
# Installation
pip3 install playwright
playwright install

# Location: /tools/scraping/playwright/
# Version: 1.40.0
# Purpose: Browser automation for dynamic content
```

---

### 9. `/tools/analysis/`
Static and dynamic analysis tools.

#### **Semgrep** - Static Analysis
```bash
# Installation
pip3 install semgrep

# Location: /tools/analysis/semgrep/
# Version: 1.45.0
# Purpose: Static code analysis for vulnerabilities
```

#### **TruffleHog** - Secret Scanner
```bash
# Installation
pip3 install truffleHog

# Location: /tools/analysis/trufflehog/
# Version: 3.63.0
# Purpose: Find secrets in code repositories
```

---

### 10. `/tools/networking/`
Network analysis and manipulation tools.

#### **Wireshark** - Packet Analyzer
```bash
# Installation
sudo apt install wireshark

# Location: /tools/networking/wireshark/
# Version: 4.2.0
# Purpose: Network protocol analyzer
```

#### **TCPDump** - Packet Capture
```bash
# Installation
sudo apt install tcpdump

# Location: /tools/networking/tcpdump/
# Version: 4.99.4
# Purpose: Command-line packet analyzer
```

#### **Proxychains** - Proxy Management
```bash
# Installation
sudo apt install proxychains4

# Location: /tools/networking/proxychains/
# Version: 4.16
# Purpose: Force TCP connections through proxy
```

---

## 📦 Installation Scripts

### Master Installation Script
```bash
#!/bin/bash
# Location: /install.sh

echo "=== schneckyirl Security Testing Tools Installation ==="
echo "[+] Starting installation process..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install base dependencies
sudo apt install -y \
    curl wget git python3 python3-pip \
    golang-go nodejs npm \
    build-essential libssl-dev \
    libffi-dev python3-dev

# Install Python packages
pip3 install --upgrade pip
pip3 install -r requirements.txt

# Install Go tools
go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
go install -v github.com/ffuf/ffuf/v2@latest
go install -v github.com/OJ/gobuster/v3@latest

# Install Node packages
npm install -g @angular/cli @vue/cli create-react-app

# Clone custom tools
git clone https://github.com/sqlmapproject/sqlmap.git /tools/web_testing/sqlmap/
git clone https://github.com/s0md3v/XSStrike /tools/exploitation/xsstrike/
git clone https://github.com/s0md3v/Bolt /tools/csrf/bolt/

echo "[+] Installation complete!"
```

### Requirements File
```txt
# Location: /requirements.txt
requests>=2.31.0
beautifulsoup4>=4.12.2
selenium>=4.15.0
scrapy>=2.11.0
playwright>=1.40.0
pandas>=2.1.3
numpy>=1.26.2
sqlalchemy>=2.0.23
aiohttp>=3.9.1
asyncio>=3.4.3
colorama>=0.4.6
termcolor>=2.3.0
python-dotenv>=1.0.0
pycryptodome>=3.19.0
paramiko>=3.3.1
scapy>=2.5.0
impacket>=0.11.0
ldap3>=2.9.1
pyOpenSSL>=23.3.0
cryptography>=41.0.7
```

---

## 🚀 Quick Start Commands

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/schneckyirl-security.git
cd schneckyirl-security

# Run installation script
chmod +x install.sh
./install.sh

# Set up environment variables
cp .env.example .env
nano .env
```

### Basic Reconnaissance
```bash
# Subdomain enumeration
subfinder -d schneckyirl.com -o subdomains.txt

# Port scanning
nmap -sV -sC -oA nmap_scan schneckyirl.com

# Directory fuzzing
ffuf -w /usr/share/wordlists/dirb/common.txt -u https://schneckyirl.com/FUZZ
```

### Web Testing
```bash
# Nikto scan
nikto -h https://schneckyirl.com -o nikto_results.txt

# SQL injection testing
python3 sqlmap.py -u "https://schneckyirl.com/page?id=1" --batch

# XSS testing
python3 xsstrike.py -u "https://schneckyirl.com/search?q=test"
```

---

## 📊 Tool Comparison Matrix

| Tool | Type | Speed | Accuracy | Stealth | Skill Required |
|------|------|-------|----------|---------|----------------|
| Nmap | Scanner | Medium | High | Low | Beginner |
| Burp Suite | Proxy | N/A | High | N/A | Intermediate |
| FFuF | Fuzzer | Very Fast | Medium | Low | Beginner |
| SQLMap | Exploitation | Slow | High | Low | Intermediate |
| Metasploit | Framework | Variable | High | Low | Advanced |
| XSStrike | Scanner | Fast | High | Medium | Intermediate |
| S3Scanner | Cloud | Fast | High | High | Beginner |
| Wireshark | Analysis | N/A | High | N/A | Advanced |

---

## 🔐 Security Considerations

### Operational Security
- Always use VPN or Tor for anonymity
- Rotate IP addresses regularly
- Use dedicated testing machines
- Maintain separate identities for testing

### Legal Compliance
- Only test systems you own or have permission to test
- Maintain proper documentation of authorization
- Follow responsible disclosure practices
- Comply with local and international laws

### Data Protection
- Encrypt all captured data
- Secure storage of credentials
- Regular deletion of test data
- Use of secure communication channels

---

## 📚 References

- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [MITRE ATT&CK Framework](https://attack.mitre.org/)
- [CVE Database](https://cve.mitre.org/)
- [Exploit Database](https://www.exploit-db.com/)

---

**Last Updated:** September 6, 2025  
**Maintained By:** Security Testing Team  
**Version:** 1.0.0
