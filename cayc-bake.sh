#!/usr/bin/env bash
# CAYC BAKE - Come At You, Clown - Baking Security Framework
# Cross-platform Offensive Security Testing Installer
# Version: 2.0.0
# Date: September 5, 2025
# Author: @jlucus https://github.com/jlucus
# "Let them eat cake... after we test their security!"

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Detect OS
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if grep -q Microsoft /proc/version 2>/dev/null; then
            OS="wsl"
            DISTRO=$(lsb_release -si 2>/dev/null || echo "Unknown")
        else
            OS="linux"
            DISTRO=$(lsb_release -si 2>/dev/null || echo "Unknown")
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        OS="macos"
        DISTRO="macOS"
    elif [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
        OS="windows"
        DISTRO="Windows"
    else
        OS="unknown"
        DISTRO="Unknown"
    fi
}

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

# Show progress bar
show_progress() {
    local current=$1
    local total=$2
    local status=$3
    local progress=$((current * 100 / total))
    local completed=$((progress / 2))
    
    printf "\r["
    printf "%${completed}s" | tr ' ' '='
    printf "%$((50 - completed))s" | tr ' ' ' '
    printf "] %3d%% - %s" "$progress" "$status"
}

# ASCII Banner
show_banner() {
    cat << 'EOF'

     ██████╗ █████╗ ██╗   ██╗ ██████╗    ██████╗  █████╗ ██╗  ██╗███████╗
    ██╔════╝██╔══██╗╚██╗ ██╔╝██╔════╝    ██╔══██╗██╔══██╗██║ ██╔╝██╔════╝
    ██║     ███████║ ╚████╔╝ ██║         ██████╔╝███████║█████╔╝ █████╗  
    ██║     ██╔══██║  ╚██╔╝  ██║         ██╔══██╗██╔══██║██╔═██╗ ██╔══╝  
    ╚██████╗██║  ██║   ██║   ╚██████╗    ██████╔╝██║  ██║██║  ██╗███████╗
     ╚═════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
                                                                            
           🤡 Come At You, Clown - Baking Security Since 2025 🍰          
                   Offensive Security Testing Framework                     
                              Version 2.0.0                                
EOF
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}        "Let them eat cake... after we test their security!"${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════════════${NC}"
    echo ""
}

# Check system requirements
check_requirements() {
    print_step "Checking System Requirements"
    
    local requirements_met=true
    
    # Check Python
    echo -n "  Checking Python 3.8+... "
    if command -v python3 &> /dev/null; then
        python_version=$(python3 --version 2>&1 | grep -oE '[0-9]+\.[0-9]+' | head -1)
        if [[ $(echo "$python_version >= 3.8" | bc -l) -eq 1 ]]; then
            echo -e "${GREEN}✓${NC} ($python_version)"
        else
            echo -e "${RED}✗${NC} (Found $python_version, need 3.8+)"
            requirements_met=false
        fi
    else
        echo -e "${RED}✗${NC} (Not found)"
        requirements_met=false
    fi
    
    # Check Git
    echo -n "  Checking Git... "
    if command -v git &> /dev/null; then
        echo -e "${GREEN}✓${NC} ($(git --version | cut -d' ' -f3))"
    else
        echo -e "${RED}✗${NC} (Not found)"
        requirements_met=false
    fi
    
    # Check Go (optional)
    echo -n "  Checking Go (optional)... "
    if command -v go &> /dev/null; then
        echo -e "${GREEN}✓${NC} ($(go version | cut -d' ' -f3))"
    else
        echo -e "${YELLOW}⚠${NC} (Not found - some tools won't be installed)"
    fi
    
    # Check disk space
    echo -n "  Checking disk space... "
    available_space=$(df -BG . | awk 'NR==2 {print $4}' | sed 's/G//')
    if [[ $available_space -ge 10 ]]; then
        echo -e "${GREEN}✓${NC} (${available_space}GB available)"
    else
        echo -e "${YELLOW}⚠${NC} (Only ${available_space}GB available, recommend 10GB+)"
    fi
    
    # Check RAM
    echo -n "  Checking RAM... "
    if [[ "$OS" == "macos" ]]; then
        total_ram=$(($(sysctl -n hw.memsize) / 1024 / 1024 / 1024))
    else
        total_ram=$(free -g | awk 'NR==2 {print $2}')
    fi
    if [[ $total_ram -ge 4 ]]; then
        echo -e "${GREEN}✓${NC} (${total_ram}GB)"
    else
        echo -e "${YELLOW}⚠${NC} (${total_ram}GB, recommend 4GB+)"
    fi
    
    echo ""
    
    if [[ "$requirements_met" == false ]]; then
        print_warning "Some requirements are not met."
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_error "Installation cancelled."
            exit 1
        fi
    else
        print_success "All requirements met!"
    fi
}

# Install system packages
install_system_packages() {
    print_step "Installing System Packages"
    
    if [[ "$OS" == "macos" ]]; then
        # macOS with Homebrew
        if ! command -v brew &> /dev/null; then
            print_warning "Homebrew not found. Installing..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi
        
        print_info "Installing packages with Homebrew..."
        brew install python3 git nmap nikto dirb sqlmap hashcat john hydra ffuf gobuster
        
    elif [[ "$OS" == "linux" ]] || [[ "$OS" == "wsl" ]]; then
        # Linux/WSL with apt
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
                tcpdump whois dnsutils net-tools
                
        # Linux with yum/dnf
        elif command -v yum &> /dev/null || command -v dnf &> /dev/null; then
            PKG_MANAGER=$(command -v dnf || command -v yum)
            print_info "Installing packages with $PKG_MANAGER..."
            sudo $PKG_MANAGER install -y \
                python3 python3-pip \
                git curl wget \
                gcc gcc-c++ make openssl-devel \
                nmap nikto dirb sqlmap \
                hashcat john hydra
                
        # Arch Linux with pacman
        elif command -v pacman &> /dev/null; then
            print_info "Installing packages with pacman..."
            sudo pacman -S --noconfirm \
                python python-pip \
                git curl wget \
                base-devel \
                nmap nikto dirb sqlmap \
                hashcat john hydra
        else
            print_warning "Unknown package manager. Please install packages manually."
        fi
    fi
    
    print_success "System packages installed"
}

# Create Python virtual environment
setup_python_env() {
    print_step "Setting up Python Environment"
    
    if [[ ! -d "venv" ]]; then
        print_info "Creating virtual environment..."
        python3 -m venv venv
        print_success "Virtual environment created"
    else
        print_info "Virtual environment already exists"
    fi
    
    print_info "Activating virtual environment..."
    source venv/bin/activate
    
    print_info "Upgrading pip..."
    pip install --upgrade pip --quiet
    
    if [[ -f "requirements.txt" ]]; then
        print_info "Installing Python packages..."
        
        # Count total packages
        total_packages=$(grep -c -v '^#\|^$' requirements.txt || echo "0")
        current_package=0
        
        while IFS= read -r package; do
            # Skip comments and empty lines
            [[ "$package" =~ ^#.*$ ]] && continue
            [[ -z "$package" ]] && continue
            
            ((current_package++))
            package_name=$(echo "$package" | cut -d'>' -f1 | cut -d'=' -f1 | cut -d'<' -f1)
            show_progress $current_package $total_packages "Installing $package_name"
            
            pip install "$package" --quiet 2>/dev/null || true
        done < requirements.txt
        
        echo "" # New line after progress
        print_success "Python packages installed"
    else
        print_warning "requirements.txt not found"
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
        go install -v "$tool" 2>/dev/null && print_success "$tool_name installed" || print_warning "Failed to install $tool_name"
    done
}

# Clone additional tools
clone_security_tools() {
    print_step "Cloning Additional Security Tools"
    
    declare -A repos=(
        ["XSStrike"]="https://github.com/s0md3v/XSStrike tools/exploitation/xsstrike"
        ["Bolt"]="https://github.com/s0md3v/Bolt tools/csrf/bolt"
        ["Cloud_enum"]="https://github.com/initstring/cloud_enum tools/cloud/cloud_enum"
    )
    
    for name in "${!repos[@]}"; do
        IFS=' ' read -r url path <<< "${repos[$name]}"
        if [[ ! -d "$path" ]]; then
            print_info "Cloning $name..."
            git clone "$url" "$path" 2>/dev/null && print_success "$name cloned" || print_warning "Failed to clone $name"
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
        ["Common"]="https://raw.githubusercontent.com/danielmiessler/SecLists/master/Discovery/Web-Content/common.txt"
        ["Directory-Medium"]="https://raw.githubusercontent.com/danielmiessler/SecLists/master/Discovery/Web-Content/directory-list-2.3-medium.txt"
        ["API-Endpoints"]="https://raw.githubusercontent.com/danielmiessler/SecLists/master/Discovery/Web-Content/api/api-endpoints.txt"
    )
    
    for name in "${!wordlists[@]}"; do
        url="${wordlists[$name]}"
        filename="wordlists/$(basename "$url")"
        
        if [[ ! -f "$filename" ]]; then
            print_info "Downloading $name..."
            curl -sL "$url" -o "$filename" && print_success "$name downloaded" || print_warning "Failed to download $name"
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
    )
    
    for dir in "${directories[@]}"; do
        if [[ ! -d "$dir" ]]; then
            mkdir -p "$dir"
            print_success "Created $dir"
        fi
    done
    
    # Create .gitkeep files
    for dir in "${directories[@]}"; do
        touch "$dir/.gitkeep" 2>/dev/null
    done
}

# Create launcher scripts
create_launcher_scripts() {
    print_step "Creating Launcher Scripts"
    
    # Unix launcher script
    cat > run-tests.sh << 'EOF'
#!/bin/bash
# CAYC BAKE Security Testing Launcher
# Author: @jlucus https://github.com/jlucus

if [ $# -eq 0 ]; then
    echo "Usage: $0 <target_url>"
    exit 1
fi

TARGET=$1

# Activate virtual environment
source venv/bin/activate

# Run tests
echo -e "\033[0;36mStarting security tests against: $TARGET\033[0m"
python3 test_cases/run_all_tests.py "$TARGET"

# Check if report was generated
if [ -f "results/test_report.html" ]; then
    echo -e "\033[0;32mReport generated: results/test_report.html\033[0m"
    
    # Try to open report in browser
    if command -v xdg-open &> /dev/null; then
        xdg-open results/test_report.html
    elif command -v open &> /dev/null; then
        open results/test_report.html
    else
        echo "Please open results/test_report.html manually"
    fi
fi
EOF
    
    chmod +x run-tests.sh
    print_success "Created run-tests.sh"
    
    # Create environment template
    if [[ ! -f ".env.example" ]]; then
        cat > .env.example << 'EOF'
# Target Configuration
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
EOF
        print_success "Created .env.example"
    fi
}

# Interactive menu
show_menu() {
    echo -e "\n${CYAN}What would you like to do now?${NC}"
    echo "  [1] View security report (REPORT.md)"
    echo "  [2] View tool documentation (TOOLING.md)"
    echo "  [3] Run a test scan"
    echo "  [4] Configure environment (.env)"
    echo "  [5] Exit"
    
    read -p "Select option (1-5): " choice
    
    case $choice in
        1)
            if [[ -f "REPORT.md" ]]; then
                less REPORT.md
            else
                print_warning "REPORT.md not found"
            fi
            ;;
        2)
            if [[ -f "TOOLING.md" ]]; then
                less TOOLING.md
            else
                print_warning "TOOLING.md not found"
            fi
            ;;
        3)
            read -p "Enter target URL: " target_url
            if [[ -n "$target_url" ]]; then
                ./run-tests.sh "$target_url"
            fi
            ;;
        4)
            if [[ ! -f ".env" ]]; then
                cp .env.example .env
                print_success "Created .env from template"
            fi
            ${EDITOR:-nano} .env
            ;;
        5)
            exit 0
            ;;
        *)
            print_warning "Invalid option"
            ;;
    esac
}

# Main installation function
main() {
    clear
    show_banner
    
    # Detect operating system
    detect_os
    print_info "Detected: $DISTRO on $OS"
    echo ""
    
    print_warning "${RED}⚠️  CAYC BAKE - Offensive Security Framework ⚠️${NC}"
    print_warning "This installer deploys professional penetration testing tools."
    print_warning "${YELLOW}Only test systems you OWN or have WRITTEN AUTHORIZATION to test!${NC}"
    echo -e "${RED}Unauthorized testing is ILLEGAL and UNETHICAL.${NC}"
    echo ""
    
    read -p "Do you understand and agree to use these tools responsibly? (yes/no): " consent
    if [[ "$consent" != "yes" ]]; then
        print_error "Installation cancelled. You must agree to responsible use."
        exit 1
    fi
    
    echo ""
    print_info "${MAGENTA}🍰 Starting CAYC BAKE installation process...${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════════════${NC}"
    
    # Run installation steps
    check_requirements
    
    # Ask for system package installation
    read -p "Install system packages? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        install_system_packages
    fi
    
    create_project_structure
    setup_python_env
    clone_security_tools
    download_wordlists
    
    # Ask for Go tools installation
    if command -v go &> /dev/null; then
        read -p "Install Go-based tools? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            install_go_tools
        fi
    fi
    
    create_launcher_scripts
    
    # Final summary
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════════════${NC}"
    print_success "${GREEN}🎂 CAYC BAKE Installation Complete! The oven is hot! 🔥${NC}"
    echo ""
    
    print_info "${MAGENTA}🍰 Your Security Kitchen is Ready:${NC}"
    echo "  1. 📋 Review the security report: ${YELLOW}REPORT.md${NC}"
    echo "  2. 🔧 Check tool documentation: ${YELLOW}TOOLING.md${NC}"
    echo "  3. ⚙️  Configure environment: ${YELLOW}cp .env.example .env${NC}"
    echo "  4. 🎯 Run security tests: ${YELLOW}./run-tests.sh https://example.com${NC}"
    echo ""
    
    echo -e "${RED}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║${NC} ${YELLOW}⚠️  LEGAL WARNING: Only test what you OWN or have PERMISSION! ${NC}${RED}║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════════════════╝${NC}"
    
    # Show interactive menu
    while true; do
        show_menu
    done
}

# Error handling
trap 'print_error "An error occurred. Exiting..."; exit 1' ERR

# Run main function
main "$@"
