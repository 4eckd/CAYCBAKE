# 🤝 Contributing to CAYC BAKE

First off, thank you for considering contributing to CAYC BAKE! 🍰

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Workflow Process](#workflow-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Security Guidelines](#security-guidelines)

## 📜 Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of background or identity.

### Expected Behavior
- 🤝 Be respectful and inclusive
- 🎯 Stay on topic and constructive
- 🔒 Follow security best practices
- 📚 Share knowledge openly
- ⚖️ Use tools ethically and legally

### Unacceptable Behavior
- ❌ Harassment or discrimination
- ❌ Sharing malicious exploits
- ❌ Unauthorized testing
- ❌ Publishing vulnerabilities without disclosure
- ❌ Violating privacy or legal boundaries

## 🎯 How Can I Contribute?

### 🐛 Reporting Bugs
Before creating bug reports, please check existing issues. When creating a bug report, include:

```markdown
**Description:** Clear description of the bug
**Version:** CAYC BAKE version (e.g., 2.1.0)
**OS:** Operating system and version
**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:** What should happen
**Actual Behavior:** What actually happens
**Screenshots:** If applicable
**Additional Context:** Any other relevant information
```

### 💡 Suggesting Enhancements
Enhancement suggestions are tracked as GitHub issues. Include:

- **Use case**: Why is this enhancement needed?
- **Current limitation**: What can't you do now?
- **Proposed solution**: How should it work?
- **Alternatives considered**: Other approaches you've thought about

### 🔧 Adding New Tools
Want to add a new security tool? Great! Please ensure:

1. **Legal compliance**: Tool must be legal and ethical
2. **Documentation**: Include usage instructions
3. **Testing**: Provide test cases
4. **Integration**: Works with existing framework
5. **Dependencies**: Clearly documented

### 📝 Improving Documentation
Documentation contributions are highly valued! You can:
- Fix typos or clarify instructions
- Add examples and use cases
- Translate documentation
- Create tutorials or guides

## 🛠️ Development Setup

### Prerequisites
```bash
# Required
- Git
- Python 3.8+
- Virtual environment support

# Optional but recommended
- Go 1.19+ (for scanner tools)
- Docker (for containerized testing)
- WSL2 (for Windows users)
```

### Local Development
```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/cayc-bake.git
cd cayc-bake

# 3. Add upstream remote
git remote add upstream https://github.com/4eckd/cayc-bake.git

# 4. Create development branch
git checkout -b feature/your-feature develop

# 5. Set up environment
./install.sh --dev  # or .\install.ps1 -Dev on Windows

# 6. Activate virtual environment
source venv/bin/activate  # or venv\Scripts\activate on Windows

# 7. Install pre-commit hooks
pre-commit install
```

## 🔀 Workflow Process

We follow a modified GitFlow workflow:

### 1. Create Your Branch
```bash
# For features
git checkout -b feature/tool-name develop

# For bug fixes
git checkout -b bugfix/issue-description develop

# For security patches
git checkout -b security/cve-number develop
```

### 2. Make Your Changes
- Write clean, documented code
- Add tests for new functionality
- Update documentation
- Follow coding standards

### 3. Commit Your Changes
Follow our commit convention:
```bash
# Format
<type>(<scope>): <subject>

# Examples
feat(scanner): add subdomain enumeration
fix(installer): resolve WSL compatibility issue
docs(readme): update installation instructions
vuln(xss): patch reflected XSS in output handler
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance
- `vuln`: Security fix
- `tool`: New tool addition
- `payload`: Payload updates

### 4. Test Your Changes
```bash
# Run tests
pytest tests/

# Check code style
black --check .
flake8 .

# Security scan
bandit -r .

# Run installer tests
./install.sh --minimal --skip-prompts
```

### 5. Push Your Branch
```bash
git push origin feature/your-feature
```

### 6. Create Pull Request
- Use the PR template
- Link related issues
- Provide clear description
- Include test evidence
- Request reviews

## 🎨 Coding Standards

### Python Style
We follow PEP 8 with these additions:
```python
# Use type hints
def scan_target(url: str, timeout: int = 30) -> dict:
    """
    Scan target URL for vulnerabilities.
    
    Args:
        url: Target URL to scan
        timeout: Request timeout in seconds
        
    Returns:
        Dictionary containing scan results
    """
    pass

# Use descriptive variable names
vulnerability_count = 0  # Good
vc = 0  # Bad

# Constants in UPPERCASE
MAX_THREADS = 10
DEFAULT_TIMEOUT = 30
```

### Bash Style
```bash
#!/usr/bin/env bash
# Script description

set -euo pipefail  # Fail on errors

# Functions use snake_case
function install_tools() {
    local tool_name="$1"
    echo "Installing ${tool_name}..."
}

# Use quotes for variables
if [[ "${USER_INPUT}" == "yes" ]]; then
    echo "Proceeding..."
fi
```

### Documentation
- Use Markdown for all docs
- Include code examples
- Add screenshots when helpful
- Keep README under 500 lines
- Create separate docs for complex topics

## 🔒 Security Guidelines

### Never Commit:
- 🚫 API keys or tokens
- 🚫 Passwords or credentials
- 🚫 Private keys or certificates
- 🚫 Personal information
- 🚫 Client/target data
- 🚫 Proprietary exploits

### Always:
- ✅ Use environment variables for secrets
- ✅ Add sensitive files to .gitignore
- ✅ Run secret scanning before commit
- ✅ Review code for security issues
- ✅ Follow responsible disclosure
- ✅ Test in isolated environments

### Security Review Checklist
- [ ] No hardcoded credentials
- [ ] Input validation implemented
- [ ] Output properly sanitized
- [ ] Rate limiting considered
- [ ] Error handling doesn't leak info
- [ ] Logs don't contain sensitive data
- [ ] Dependencies are secure
- [ ] Code follows least privilege

## 📊 Pull Request Review Process

### What We Look For:
1. **Functionality**: Does it work as intended?
2. **Security**: Are there vulnerabilities?
3. **Code Quality**: Is it clean and maintainable?
4. **Documentation**: Is it well documented?
5. **Tests**: Are there adequate tests?
6. **Legal**: Is it ethical and legal?

### Review Timeline:
- **Initial review**: Within 3 days
- **Feedback incorporation**: Ongoing
- **Final approval**: When all checks pass
- **Merge**: After approval from maintainer

## 🏆 Recognition

Contributors will be:
- Listed in AUTHORS.md
- Credited in release notes
- Mentioned in security advisories (if applicable)
- Added to Hall of Fame (for security researchers)

## 📚 Resources

### Learning Resources
- [Git Workflow Guide](GIT_WORKFLOW.md)
- [Tool Documentation](TOOLING.md)
- [Security Policy](SECURITY.md)
- [Test Cases](test_cases/TEST_CASES.md)

### External Resources
- [Python Style Guide (PEP 8)](https://www.python.org/dev/peps/pep-0008/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Security Best Practices](https://owasp.org/)

## 💬 Questions?

Feel free to:
- Open a discussion on GitHub
- Join our Discord (if available)
- Email maintainers
- Check existing issues

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make CAYC BAKE better! 🍰🤡

*Last updated: September 2025*
