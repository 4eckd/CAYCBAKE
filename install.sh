#!/usr/bin/env bash
# CAYC BAKE - Universal Installation Script (Bash)
# Works on: Linux, macOS, WSL, Git Bash on Windows
# Version: 2.1.0
# Author: @jlucus https://github.com/jlucus

set -e

# Parse command line arguments
SKIP_PROMPTS=false
MINIMAL=false
DEV_MODE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --skip-prompts|-y)
            SKIP_PROMPTS=true
            shift
            ;;
        --minimal|-m)
            MINIMAL=true
            shift
            ;;
        --dev|-d)
            DEV_MODE=true
            shift
            ;;
        --help|-h)
            echo "CAYC BAKE Universal Installer"
            echo "Usage: ./install.sh [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --skip-prompts, -y  Skip all prompts (auto-yes)"
            echo "  --minimal, -m       Minimal installation (core only)"
            echo "  --dev, -d          Developer mode with extra tools"
            echo "  --help, -h         Show this help message"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Print functions
print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_info() {
    echo -e "${CYAN}[i]${NC} $1"
}

print_step() {
    echo -e "\n${MAGENTA}►${NC} ${WHITE}$1${NC}"
}

# Detect operating system and environment
detect_system() {
    OS=""
    DISTRO=""
    IS_WSL=false
    IS_WINDOWS=false
    IS_LINUX=false
    IS_MACOS=false
    IS_GIT_BASH=false
    ARCH=""
    
    # Detect architecture
    ARCH=$(uname -m)
    
    # Check for Git Bash on Windows
    if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        IS_GIT_BASH=true
        IS_WINDOWS=true
        OS="Windows (Git Bash)"
        DISTRO="Windows"
    # Check for WSL
    elif grep -q Microsoft /proc/version 2>/dev/null || grep -q WSL /proc/version 2>/dev/null; then
        IS_WSL=true
        IS_LINUX=true
        OS="WSL"
        if command -v lsb_release &> /dev/null; then
            DISTRO=$(lsb_release -si 2>/dev/null || echo "Unknown")
        else
            DISTRO="Unknown"
        fi
    # Check for macOS
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        IS_MACOS=true
        OS="macOS"
        DISTRO="macOS $(sw_vers -productVersion 2>/dev/null || echo "")"
    # Check for Linux
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        IS_LINUX=true
        OS="Linux"
        if command -v lsb_release &> /dev/null; then
            DISTRO=$(lsb_release -si 2>/dev/null || echo "Unknown")
        elif [[ -f /etc/os-release ]]; then
            . /etc/os-release
            DISTRO="${NAME:-Unknown}"
        else
            DISTRO="Unknown"
        fi
    else
        OS="Unknown"
        DISTRO="Unknown"
    fi
}

# Show banner
show_banner() {
    clear
    cat << 'EOF'

     ██████╗ █████╗ ██╗   ██╗ ██████╗    ██████╗  █████╗ ██╗  ██╗███████╗
    ██╔════╝██╔══██╗╚██╗ ██╔╝██╔════╝    ██╔══██╗██╔══██╗██║ ██╔╝██╔════╝
    ██║     ███████║ ╚████╔╝ ██║         ██████╔╝███████║█████╔╝ █████╗  
    ██║     ██╔══██║  ╚██╔╝  ██║         ██╔══██╗██╔══██║██╔═██╗ ██╔══╝  
    ╚██████╗██║  ██║   ██║   ╚██████╗    ██████╔╝██║  ██║██║  ██╗███████╗
     ╚═════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
                                                                            
           🤡 Come At You, Clown - Baking Security Since 2025 🍰          
                    Universal Installation Script v2.1                      
                              
EOF
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}        \"Let them eat cake... after we test their security!\"${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════════════${NC}"
    echo ""
}

# Check system requirements
check_requirements() {
    print_step "Checking System Requirements"
    
    local requirements_met=true
    local issues=()
    
    # Check Python
    echo -n "  Checking Python 3.8+... "
    if command -v python3 &> /dev/null; then
        python_version=$(python3 --version 2>&1 | grep -oE '[0-9]+\.[0-9]+' | head -1)
        if [[ $(echo "$python_version >= 3.8" | bc -l 2>/dev/null || echo 0) -eq 1 ]]; then
            print_success "($python_version)"
        else
            print_error "(Found $python_version, need 3.8+)"
            requirements_met=false
            issues+=("Python 3.8+ required")
        fi
    elif command -v python &> /dev/null; then
        python_version=$(python --version 2>&1 | grep -oE '[0-9]+\.[0-9]+' | head -1)
        if [[ ${python_version%%.*} -eq 3 ]]; then
            print_success "($python_version)"
        else
            print_error "(Found Python 2, need Python 3.8+)"
            requirements_met=false
            issues+=("Python 3.8+ required")
        fi
    else
        print_error "(Not found)"
        requirements_met=false
        issues+=("Python not installed")
    fi
    
    # Check Git
    echo -n "  Checking Git... "
    if command -v git &> /dev/null; then
        git_version=$(git --version | cut -d' ' -f3)
        print_success "($git_version)"
    else
        print_error "(Not found)"
        requirements_met=false
        issues+=("Git not installed")
    fi
    
    # Check Go (optional)
    echo -n "  Checking Go (optional)... "
    if command -v go &> /dev/null; then
        go_version=$(go version | cut -d' ' -f3)
        print_success "($go_version)"
    else
        print_warning "(Not found - some tools won't be installed)"
    fi
    
    # Check disk space
    echo -n "  Checking disk space... "
    if [[ "$IS_MACOS" == true ]]; then
        available_space=$(($(df -k . | awk 'NR==2 {print $4}') / 1024 / 1024))
    else
        available_space=$(df -BG . | awk 'NR==2 {print $4}' | sed 's/G//')
    fi
    
    if [[ $available_space -ge 5 ]]; then
        print_success "(${available_space}GB available)"
    else
        print_warning "(${available_space}GB available, recommend 5GB+)"
    fi
    
    # Check RAM
    echo -n "  Checking RAM... "
    if [[ "$IS_MACOS" == true ]]; then
        total_ram=$(($(sysctl -n hw.memsize 2>/dev/null || echo 0) / 1024 / 1024 / 1024))
    elif [[ "$IS_LINUX" == true ]] || [[ "$IS_WSL" == true ]]; then
        total_ram=$(free -g 2>/dev/null | awk 'NR==2 {print $2}' || echo 0)
    else
        total_ram=0
    fi
    
    if [[ $total_ram -ge 4 ]]; then
        print_success "(${total_ram}GB)"
    elif [[ $total_ram -gt 0 ]]; then
        print_warning "(${total_ram}GB, recommend 4GB+)"
    else
        print_warning "(Unable to detect)"
    fi
    
    echo ""
    
    if [[ "$requirements_met" == false ]]; then
        print_warning "Some requirements are not met:"
        for issue in "${issues[@]}"; do
            echo "  - $issue"
        done
        
        if [[ "$SKIP_PROMPTS" == false ]]; then
            read -p "Continue anyway? (y/N): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                print_error "Installation cancelled."
                exit 1
            fi
        fi
    else
        print_success "All requirements met!"
    fi
}

# Install system packages based on OS
install_system_packages() {
    print_step "Installing System Packages"
    
    if [[ "$IS_GIT_BASH" == true ]]; then
        print_warning "Git Bash detected. System package installation not available."
        print_info "Please install tools manually using Windows installers or WSL."
        return
    fi
    
    if [[ "$IS_MACOS" == true ]]; then
        # macOS with Homebrew
        if ! command -v brew &> /dev/null; then
            print_warning "Homebrew not found. Installing..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi
        
        print_info "Installing packages with Homebrew..."
        brew install python3 git nmap nikto dirb sqlmap hashcat john hydra ffuf gobuster || true
        
    elif [[ "$IS_LINUX" == true ]] || [[ "$IS_WSL" == true ]]; then
        # Linux/WSL package installation
        if command -v apt &> /dev/null; then
            print_info "Updating package repositories..."
            sudo apt update
            
            print_info "Installing packages with apt..."
            sudo apt install -y \
                python3 python3-pip python3-venv \
                git curl wget \
                build-essential libssl-dev libffi-dev python3-dev \
                nmap nikto dirb sqlmap \
                hashcat john hydra \
                tcpdump whois dnsutils net-tools || true
                
        elif command -v yum &> /dev/null || command -v dnf &> /dev/null; then
            PKG_MANAGER=$(command -v dnf || command -v yum)
            print_info "Installing packages with $PKG_MANAGER..."
            sudo $PKG_MANAGER install -y \
                python3 python3-pip \
                git curl wget \
                gcc gcc-c++ make openssl-devel \
                nmap nikto dirb sqlmap \
                hashcat john hydra || true
                
        elif command -v pacman &> /dev/null; then
            print_info "Installing packages with pacman..."
            sudo pacman -S --noconfirm \
                python python-pip \
                git curl wget \
                base-devel \
                nmap nikto dirb sqlmap \
                hashcat john hydra || true
                
        elif command -v apk &> /dev/null; then
            print_info "Installing packages with apk..."
            sudo apk add --no-cache \
                python3 py3-pip \
                git curl wget \
                build-base openssl-dev libffi-dev python3-dev \
                nmap nikto sqlmap hydra || true
        else
            print_warning "Unknown package manager. Please install packages manually."
        fi
    fi
    
    print_success "System packages installation completed"
}

# Setup Python environment
setup_python_env() {
    print_step "Setting up Python Environment"
    
    # Determine Python command
    if command -v python3 &> /dev/null; then
        PYTHON_CMD="python3"
    elif command -v python &> /dev/null; then
        PYTHON_CMD="python"
    else
        print_error "Python not found!"
        exit 1
    fi
    
    # Create virtual environment
    if [[ ! -d "venv" ]]; then
        print_info "Creating virtual environment..."
        $PYTHON_CMD -m venv venv
        print_success "Virtual environment created"
    else
        print_info "Virtual environment already exists"
    fi
    
    # Activate virtual environment
    print_info "Activating virtual environment..."
    source venv/bin/activate
    
    # Upgrade pip
    print_info "Upgrading pip..."
    pip install --upgrade pip --quiet
    
    # Install or create requirements.txt
    if [[ -f "requirements.txt" ]]; then
        print_info "Installing Python packages from requirements.txt..."
        pip install -r requirements.txt --quiet
        print_success "Python packages installed"
    else
        print_warning "requirements.txt not found, creating one..."
        cat > requirements.txt << 'EOF'
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
pytest>=7.4.0
black>=23.7.0
EOF
        pip install -r requirements.txt --quiet
        print_success "Requirements file created and packages installed"
    fi
}

# Install Go tools
install_go_tools() {
    print_step "Installing Go-based Security Tools"
    
    if ! command -v go &> /dev/null; then
        print_warning "Go not installed. Skipping Go tools."
        return
    fi
    
    export GOPATH="$HOME/go"
    export PATH="$PATH:$GOPATH/bin"
    
    go_tools=(
        "github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest"
        "github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest"
        "github.com/projectdiscovery/httpx/cmd/httpx@latest"
        "github.com/ffuf/ffuf/v2@latest"
        "github.com/OJ/gobuster/v3@latest"
    )
    
    for tool in "${go_tools[@]}"; do
        tool_name=$(basename "$tool" | cut -d'@' -f1)
        print_info "Installing $tool_name..."
        GO111MODULE=on go install -v "$tool" 2>/dev/null && \
            print_success "$tool_name installed" || \
            print_warning "Failed to install $tool_name"
    done
}

# Clone additional security tools
clone_security_tools() {
    print_step "Cloning Additional Security Tools"
    
    mkdir -p tools
    
    declare -A repos=(
        ["XSStrike"]="https://github.com/s0md3v/XSStrike"
        ["Bolt"]="https://github.com/s0md3v/Bolt"
        ["cloud_enum"]="https://github.com/initstring/cloud_enum"
    )
    
    for name in "${!repos[@]}"; do
        url="${repos[$name]}"
        path="tools/$name"
        
        if [[ ! -d "$path" ]]; then
            print_info "Cloning $name..."
            git clone "$url" "$path" 2>/dev/null && \
                print_success "$name cloned" || \
                print_warning "Failed to clone $name"
            
            # Install requirements if exists
            if [[ -f "$path/requirements.txt" ]]; then
                pip install -r "$path/requirements.txt" --quiet 2>/dev/null
            fi
        else
            print_info "$name already exists"
        fi
    done
}

# Download wordlists
download_wordlists() {
    print_step "Downloading Wordlists"
    
    mkdir -p wordlists
    
    declare -A wordlists=(
        ["common.txt"]="https://raw.githubusercontent.com/danielmiessler/SecLists/master/Discovery/Web-Content/common.txt"
        ["directory-list-small.txt"]="https://raw.githubusercontent.com/danielmiessler/SecLists/master/Discovery/Web-Content/directory-list-2.3-small.txt"
        ["api-endpoints.txt"]="https://raw.githubusercontent.com/danielmiessler/SecLists/master/Discovery/Web-Content/api/api-endpoints.txt"
    )
    
    for name in "${!wordlists[@]}"; do
        url="${wordlists[$name]}"
        filename="wordlists/$name"
        
        if [[ ! -f "$filename" ]]; then
            print_info "Downloading $name..."
            curl -sL "$url" -o "$filename" && \
                print_success "$name downloaded" || \
                print_warning "Failed to download $name"
        else
            print_info "$name already exists"
        fi
    done
}

# Create project structure
create_project_structure() {
    print_step "Creating Project Structure"
    
    directories=(
        "results"
        "logs"
        "payloads/xss"
        "payloads/sqli"
        "payloads/csrf"
        "scripts/automation"
        "scripts/reporting"
        "tools/reconnaissance"
        "tools/exploitation"
        "tools/post-exploitation"
    )
    
    for dir in "${directories[@]}"; do
        if [[ ! -d "$dir" ]]; then
            mkdir -p "$dir"
            print_success "Created $dir"
        fi
        touch "$dir/.gitkeep" 2>/dev/null
    done
}

# Create launcher scripts
create_launcher_scripts() {
    print_step "Creating Launcher Scripts"
    
    # Create unified run script
    cat > run.sh << 'EOF'
#!/bin/bash
# CAYC BAKE Launcher

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

TARGET="$1"
TOOL="${2:-scan}"

if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo -e "${CYAN}🍰 CAYC BAKE Security Testing Framework${NC}"
    echo "Usage: ./run.sh <target> [tool]"
    echo ""
    echo "Tools available:"
    echo "  scan     - Run comprehensive scan"
    echo "  xss      - XSS vulnerability testing"
    echo "  sqli     - SQL injection testing"
    echo "  api      - API fuzzing"
    echo "  rng      - RNG analysis"
    echo "  dir      - Directory bruteforce"
    echo "  nmap     - Network scan"
    exit 0
fi

# Activate virtual environment
if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
elif [ -f "venv/Scripts/activate" ]; then
    source venv/Scripts/activate
fi

echo -e "${CYAN}🍰 CAYC BAKE Security Framework${NC}"
echo -e "${YELLOW}Come At You, Clown - Let's bake some security!${NC}"
echo ""

if [ -n "$TARGET" ]; then
    echo -e "${GREEN}Target: $TARGET${NC}"
    echo -e "${GREEN}Tool: $TOOL${NC}"
    echo ""
    
    case $TOOL in
        scan)
            python3 attack_orcestrator.py "$TARGET" 2>/dev/null || python attack_orcestrator.py "$TARGET"
            ;;
        xss)
            echo "Running XSS Scanner..."
            python3 xss_scanner.py "$TARGET" 2>/dev/null || python xss_scanner.py "$TARGET"
            ;;
        sqli)
            echo "Running SQL Injection tests..."
            if command -v sqlmap &> /dev/null; then
                sqlmap -u "$TARGET" --batch
            else
                echo "SQLMap not installed"
            fi
            ;;
        api)
            echo "Running API Fuzzer..."
            python3 api_fuzzer.py "$TARGET" 2>/dev/null || python api_fuzzer.py "$TARGET"
            ;;
        rng)
            echo "Running RNG Analyzer..."
            python3 rng_analyzer.py "$TARGET" 2>/dev/null || python rng_analyzer.py "$TARGET"
            ;;
        dir)
            echo "Running Directory Bruteforce..."
            if command -v dirb &> /dev/null; then
                dirb "$TARGET" wordlists/common.txt
            elif command -v gobuster &> /dev/null; then
                gobuster dir -u "$TARGET" -w wordlists/common.txt
            else
                echo "No directory bruteforce tool found"
            fi
            ;;
        nmap)
            echo "Running Network Scan..."
            if command -v nmap &> /dev/null; then
                nmap -sV -sC "$TARGET"
            else
                echo "Nmap not installed"
            fi
            ;;
        *)
            echo -e "${RED}Unknown tool: $TOOL${NC}"
            echo "Use --help to see available tools"
            ;;
    esac
else
    echo -e "${RED}No target specified. Usage: ./run.sh <target> [tool]${NC}"
fi
EOF
    
    chmod +x run.sh
    print_success "Created run.sh launcher"
    
    # Create .env.example
    if [[ ! -f ".env.example" ]]; then
        cat > .env.example << 'EOF'
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
EOF
        print_success "Created .env.example"
    fi
}

# Interactive menu
show_completion_menu() {
    echo -e "\n${CYAN}Installation Complete! What would you like to do?${NC}"
    echo "  [1] Run a test scan"
    echo "  [2] View documentation"
    echo "  [3] Configure environment"
    echo "  [4] Exit"
    
    read -p "Select option (1-4): " choice
    
    case $choice in
        1)
            read -p "Enter target URL: " target_url
            if [[ -n "$target_url" ]]; then
                ./run.sh "$target_url"
            fi
            ;;
        2)
            if [[ -f "README.md" ]]; then
                less README.md
            else
                print_warning "README.md not found"
            fi
            ;;
        3)
            if [[ ! -f ".env" ]]; then
                cp .env.example .env
                print_success "Created .env from template"
            fi
            ${EDITOR:-nano} .env
            ;;
        4)
            exit 0
            ;;
        *)
            print_warning "Invalid option"
            ;;
    esac
}

# Main installation function
main() {
    show_banner
    
    # Detect operating system
    detect_system
    print_info "Detected: $DISTRO on $OS ($ARCH)"
    echo ""
    
    # Legal warning
    print_warning "⚠️  CAYC BAKE - Offensive Security Framework ⚠️"
    print_warning "This installer deploys professional penetration testing tools."
    print_warning "Only test systems you OWN or have WRITTEN AUTHORIZATION to test!"
    echo -e "${RED}Unauthorized testing is ILLEGAL and UNETHICAL.${NC}"
    echo ""
    
    if [[ "$SKIP_PROMPTS" == false ]]; then
        read -p "Do you understand and agree to use these tools responsibly? (yes/no): " consent
        if [[ "$consent" != "yes" ]]; then
            print_error "Installation cancelled. You must agree to responsible use."
            exit 1
        fi
    fi
    
    echo ""
    print_info "🍰 Starting CAYC BAKE installation process..."
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════════════${NC}"
    
    # Run installation steps
    check_requirements
    
    # Ask for system package installation
    if [[ "$MINIMAL" == false ]] && [[ "$SKIP_PROMPTS" == false ]]; then
        read -p "Install system packages? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            install_system_packages
        fi
    elif [[ "$MINIMAL" == false ]] && [[ "$SKIP_PROMPTS" == true ]]; then
        install_system_packages
    fi
    
    create_project_structure
    setup_python_env
    
    if [[ "$MINIMAL" == false ]]; then
        clone_security_tools
        download_wordlists
        
        # Ask for Go tools installation
        if command -v go &> /dev/null; then
            if [[ "$SKIP_PROMPTS" == false ]]; then
                read -p "Install Go-based tools? (y/N): " -n 1 -r
                echo
                if [[ $REPLY =~ ^[Yy]$ ]]; then
                    install_go_tools
                fi
            elif [[ "$DEV_MODE" == true ]]; then
                install_go_tools
            fi
        fi
    fi
    
    create_launcher_scripts
    
    # Final summary
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════════════${NC}"
    print_success "🎂 CAYC BAKE Installation Complete! The oven is hot! 🔥"
    echo ""
    
    print_info "🍰 Your Security Kitchen is Ready:"
    echo -e "  1. 📋 Review documentation: ${YELLOW}README.md, TOOLING.md${NC}"
    echo -e "  2. ⚙️  Configure environment: ${YELLOW}cp .env.example .env${NC}"
    echo -e "  3. 🎯 Run security tests: ${YELLOW}./run.sh https://example.com${NC}"
    echo ""
    
    echo -e "${RED}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║${NC} ${YELLOW}⚠️  LEGAL WARNING: Only test what you OWN or have PERMISSION! ${NC}${RED}║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════════════════╝${NC}"
    
    # Show interactive menu unless in skip prompts mode
    if [[ "$SKIP_PROMPTS" == false ]]; then
        show_completion_menu
    fi
}

# Run main function
main "$@"
