#!/usr/bin/env bash
# CAYC BAKE - Codespaces Edition
# Optimized for GitHub Codespaces Environment
# Version: 2.0.0-codespace
# Author: @jlucus https://github.com/jlucus

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
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

# Banner
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
                        GitHub Codespaces Edition                           
                              Version 2.0.0                                
EOF
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}        \"Let them eat cake... after we test their security!\"${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════════════${NC}"
    echo ""
}

# Quick install for Codespaces
quick_install() {
    print_info "🚀 Quick installing for GitHub Codespaces..."
    
    # Update package list
    print_info "Updating package repositories..."
    sudo apt-get update -qq
    
    # Install essential tools
    print_info "Installing essential security tools..."
    sudo apt-get install -y -qq \
        nmap \
        nikto \
        dirb \
        sqlmap \
        hydra \
        curl \
        wget \
        jq \
        dnsutils \
        net-tools \
        tcpdump \
        whois \
        2>/dev/null || true
    
    # Setup Python environment
    print_info "Setting up Python environment..."
    python3 -m venv venv
    source venv/bin/activate
    pip install --upgrade pip -q
    
    # Install Python packages
    print_info "Installing Python security libraries..."
    pip install -q \
        requests \
        beautifulsoup4 \
        selenium \
        scrapy \
        paramiko \
        scapy \
        pwntools \
        impacket \
        python-nmap \
        shodan \
        censys \
        dnspython \
        cryptography \
        colorama \
        rich \
        2>/dev/null || true
    
    # Create directory structure
    print_info "Creating project directories..."
    mkdir -p {tools,wordlists,payloads,results,logs,scripts}/{reconnaissance,exploitation,post-exploitation,reporting}
    
    # Download essential wordlists
    print_info "Downloading wordlists..."
    curl -sL https://raw.githubusercontent.com/danielmiessler/SecLists/master/Discovery/Web-Content/common.txt -o wordlists/common.txt
    curl -sL https://raw.githubusercontent.com/danielmiessler/SecLists/master/Discovery/Web-Content/directory-list-2.3-small.txt -o wordlists/directories.txt
    
    # Clone key tools
    print_info "Cloning additional tools..."
    git clone https://github.com/s0md3v/XSStrike tools/XSStrike 2>/dev/null || true
    git clone https://github.com/s0md3v/Bolt tools/Bolt 2>/dev/null || true
    
    # Create launcher script
    cat > cayc-run.sh << 'LAUNCHER'
#!/bin/bash
# CAYC BAKE Launcher for Codespaces

source venv/bin/activate

echo -e "\033[0;36m🍰 CAYC BAKE Security Framework\033[0m"
echo "Available commands:"
echo "  nmap      - Network scanner"
echo "  nikto     - Web server scanner"
echo "  dirb      - Directory brute forcer"
echo "  sqlmap    - SQL injection tool"
echo ""
echo "Usage: ./cayc-run.sh <tool> <arguments>"

if [ $# -gt 0 ]; then
    "$@"
fi
LAUNCHER
    
    chmod +x cayc-run.sh
    
    # Create .env template
    cat > .env.example << 'ENV'
# CAYC BAKE Configuration
TARGET_URL=https://example.com
THREADS=10
TIMEOUT=30
OUTPUT_DIR=results
LOG_LEVEL=INFO
ENV
    
    print_success "Installation complete!"
}

# Main installation
main() {
    show_banner
    
    print_warning "⚠️  LEGAL NOTICE: Only test systems you OWN or have PERMISSION to test!"
    echo ""
    read -p "Do you understand and agree? (yes/no): " consent
    
    if [[ "$consent" != "yes" ]]; then
        print_error "Installation cancelled."
        exit 1
    fi
    
    echo ""
    quick_install
    
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════════════${NC}"
    print_success "🎂 CAYC BAKE is ready in your Codespace!"
    echo ""
    print_info "Next steps:"
    echo "  1. Activate environment: ${YELLOW}source venv/bin/activate${NC}"
    echo "  2. Configure settings: ${YELLOW}cp .env.example .env${NC}"
    echo "  3. Run tools: ${YELLOW}./cayc-run.sh nmap -sV target.com${NC}"
    echo ""
    echo -e "${RED}Remember: Only test what you have permission to test!${NC}"
}

main "$@"
