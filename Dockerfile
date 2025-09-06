# CAYC BAKE Docker Image
# Multi-stage build for security testing framework

# Stage 1: Python base with security tools
FROM python:3.10-slim as python-base

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    build-essential \
    libssl-dev \
    libffi-dev \
    nmap \
    nikto \
    dirb \
    sqlmap \
    hydra-gtk \
    dnsutils \
    net-tools \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Stage 2: Go builder for scanner
FROM golang:1.21-alpine as go-builder

WORKDIR /build
COPY scanner/go.mod scanner/go.sum ./
RUN go mod download

COPY scanner/ ./
RUN go build -o s3scanner ./main.go

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
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY --chown=caycbake:caycbake . .

# Copy Go scanner from builder
COPY --from=go-builder /build/s3scanner /usr/local/bin/

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
    && ./venv/bin/pip install -r requirements.txt

# Expose port for potential web interface
EXPOSE 8080

# Default command
CMD ["/bin/bash"]
