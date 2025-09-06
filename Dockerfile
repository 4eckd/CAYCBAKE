# CAYC BAKE Docker Image
# Multi-stage build for security testing framework

# Stage 1: Python base with security tools
FROM python:3.10-slim AS python-base

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-pip \
    nmap \
    dnsutils \
    net-tools \
    netcat-openbsd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python-based security tools
RUN pip3 install --no-cache-dir \
    requests \
    beautifulsoup4 \
    lxml \
    paramiko \
    dnspython \
    python-nmap

# Stage 2: Go builder for scanner (optional - skip if no Go code)
FROM golang:1.21-alpine AS go-builder

WORKDIR /build
# Skip Go build if scanner directory doesn't exist
RUN echo "Skipping Go build - scanner not present"

# Stage 3: Final image
FROM python-base

LABEL maintainer="CAYC BAKE Team"
LABEL description="CAYC BAKE Security Testing Framework"
LABEL version="2.1.0"

# Create app user
RUN useradd -m -s /bin/bash caycbake

WORKDIR /app

# Copy Python requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt || true

# Copy application files
COPY --chown=caycbake:caycbake . .

# Skip copying Go scanner if not built
# COPY --from=go-builder /build/s3scanner /usr/local/bin/

# Set up directories
RUN mkdir -p results logs wordlists payloads \
    && chown -R caycbake:caycbake /app

# Switch to non-root user
USER caycbake

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PATH="/app/venv/bin:$PATH"

# Create virtual environment
RUN python -m venv venv \
    && ./venv/bin/pip install --upgrade pip \
    && ./venv/bin/pip install -r requirements.txt || true

# Expose port for potential web interface
EXPOSE 8080

# Default command
CMD ["/bin/bash"]
