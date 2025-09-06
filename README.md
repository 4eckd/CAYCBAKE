<!-- 
Author: @jlucus https://github.com/jlucus
Date: September 5, 2025
Version: 2.0.0
-->

# schneckyirl Security Testing Framework

## ⚠️ CRITICAL SECURITY ADVISORY

**This codebase contains CRITICAL security vulnerabilities. DO NOT deploy to production.**

---

## 📁 Project Structure

```
schneckyirl/
├── 📄 schneckyirl.js          # Main application file (VULNERABLE)
├── 📄 REPORT.md               # Security audit report
├── 📄 TOOLING.md              # Security tools documentation
├── 📄 README.md               # This file
├── 📄 requirements.txt        # Python dependencies
├── 📄 install.sh              # Installation script
│
├── 📁 tools/                  # Security testing tools
│   ├── reconnaissance/        # Information gathering tools
│   ├── web_testing/          # Web application testing
│   ├── fuzzing/              # Fuzzing tools
│   ├── exploitation/         # Exploitation frameworks
│   ├── csrf/                 # CSRF testing tools
│   ├── cloud/                # Cloud security tools
│   ├── crypto/               # Cryptographic analysis
│   ├── scraping/             # Data extraction tools
│   ├── analysis/             # Static/dynamic analysis
│   └── networking/           # Network analysis tools
│
├── 📁 test_cases/            # Attack test cases
│   ├── TEST_CASES.md         # Test cases documentation
│   ├── csrf_attacks/         # CSRF attack tests
│   ├── xss_attacks/          # XSS attack tests
│   ├── data_exfiltration/    # Data extraction tests
│   ├── api_fuzzing/          # API fuzzing tests
│   ├── rng_manipulation/     # RNG analysis tests
│   ├── path_traversal/       # Path traversal tests
│   └── cloud_enum/           # Cloud enumeration tests
│
├── 📁 scanner/               # S3 bucket scanner (Go)
├── 📁 payloads/              # Attack payloads
├── 📁 wordlists/             # Fuzzing wordlists
├── 📁 results/               # Test results
├── 📁 scripts/               # Utility scripts
└── 📁 logs/                  # Application logs
```

---

## 🚨 Identified Vulnerabilities

### Critical Issues (CVSS 9.0+)
1. **Exposed CSRF Token** - Static token in HTML
2. **Massive Data Exposure** - Complete user database in client-side
3. **API Endpoints Exposed** - Full routing configuration visible
4. **RNG Implementation Exposed** - Gambling randomness compromised

### High Risk Issues (CVSS 7.0-8.9)
5. **Laravel Cloud URLs** - Infrastructure fingerprinting
6. **Client-Side Routing** - Authentication bypass potential
7. **XSS Vulnerabilities** - Multiple injection points

### Medium/Low Risk Issues
8. **Weak Data Obfuscation** - Predictable username masking
9. **Information Disclosure** - Error handling issues
10. **Mixed Content** - External resource loading

---

## 🛠️ Installation

### Prerequisites
- **OS**: Linux, macOS, Windows (PowerShell/WSL/Git Bash)
- **Python**: 3.8 or higher
- **Git**: Any recent version
- **RAM**: 4GB minimum (8GB recommended)
- **Disk**: 5GB minimum (10GB recommended)

### 🚀 Universal Quick Install

```bash
# Clone repository
git clone https://github.com/4eckd/cayc-bake.git
cd cayc-bake

# Run the installer for your system:

# Linux/macOS/WSL:
chmod +x install.sh
./install.sh

# Windows PowerShell:
.\install.ps1

# Windows Git Bash:
bash install.sh
```

### Installation Options

```bash
# Minimal installation (core tools only)
./install.sh --minimal        # or: .\install.ps1 -Minimal

# Skip all prompts (automated)
./install.sh --skip-prompts   # or: .\install.ps1 -SkipPrompts

# Developer mode (all tools)
./install.sh --dev           # or: .\install.ps1 -Dev

# View help
./install.sh --help          # or: .\install.ps1 -Help
```

### Platform-Specific Notes

**Windows PowerShell:**
- May need to run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Installer will use winget or chocolatey if available

**WSL (Windows Subsystem for Linux):**
- Recommended for Windows users for best compatibility
- Full Linux toolchain support

**macOS:**
- Requires Homebrew (will be installed automatically if missing)
- Some tools may require additional permissions

**Git Bash on Windows:**
- Limited functionality - WSL recommended instead
- Python and tools must be installed separately

---

## 🎯 Usage

### Running Security Tests

⚠️ **WARNING: Only test systems you own or have explicit permission to test!**

```bash
# Activate virtual environment
source venv/bin/activate

# Run all tests
python test_cases/run_all_tests.py https://target.com

# Run specific test category
python test_cases/csrf_attacks/csrf_001_harvest.py
python test_cases/xss_attacks/xss_001_reflected.py
python test_cases/data_exfiltration/data_001_bulk.py

# Use S3 scanner
cd scanner
go run main.go -bucket target-bucket
```

### Individual Tool Usage

```bash
# Reconnaissance
subfinder -d target.com -o subdomains.txt
nmap -sV -sC target.com

# Web Testing
nikto -h https://target.com
dirb https://target.com wordlists/common.txt

# API Fuzzing
ffuf -w wordlists/api-endpoints.txt -u https://target.com/FUZZ

# XSS Testing
python tools/exploitation/xsstrike/xsstrike.py -u "https://target.com?q=test"
```

---

## 📊 Test Results

Results are saved in multiple formats:
- `results/test_results.json` - JSON format
- `results/test_report.html` - HTML report
- `results/[timestamp]_scan.txt` - Individual scan results

---

## 🔒 Security Considerations

### Legal Requirements
- ✅ Written authorization required
- ✅ Defined scope and boundaries
- ✅ Compliance with local laws
- ✅ Responsible disclosure

### Operational Security
- Use VPN/Tor for anonymity
- Rotate IP addresses
- Implement rate limiting
- Maintain audit logs

### Data Protection
- Encrypt all captured data
- Secure credential storage
- Regular data purging
- Secure communications

---

## 📚 Documentation

- **[REPORT.md](REPORT.md)** - Complete security audit findings
- **[TOOLING.md](TOOLING.md)** - Security tools documentation
- **[TEST_CASES.md](test_cases/TEST_CASES.md)** - Attack test cases

---

## 🚀 Quick Fixes

### Immediate Actions Required
```javascript
// 1. Remove CSRF token from HTML
// BAD: <meta name="csrf-token" content="STATIC_TOKEN">
// GOOD: Generate dynamic tokens server-side

// 2. Move data to API
// BAD: <div data-page="{all_user_data}">
// GOOD: Authenticated API endpoints

// 3. Implement CSP
response.setHeader('Content-Security-Policy', 
    "default-src 'self'; script-src 'self'");

// 4. Sanitize inputs
const clean = DOMPurify.sanitize(userInput);
```

---

## 🤝 Contributing

This project is for security research and education only.

### Reporting Issues
- Use GitHub Issues for vulnerability reports
- Include reproduction steps
- Provide impact assessment

### Pull Requests
- Follow existing code style
- Include tests for new features
- Update documentation

---

## ⚖️ Legal Disclaimer

**This framework is for authorized security testing only.**

- Only test systems you own or have explicit permission to test
- Unauthorized testing is illegal and unethical
- The authors assume no liability for misuse
- Use at your own risk

---

## 📝 License

This project is for educational purposes only. See LICENSE file for details.

---

## 🔗 References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [MITRE ATT&CK](https://attack.mitre.org/)

---

## 📞 Contact

For security issues, contact: hello@jlucus.dev

---

**Remember: With great power comes great responsibility. Use these tools ethically and legally.**
