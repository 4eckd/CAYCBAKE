# Docker Setup Guide

## Overview

CAYC BAKE provides comprehensive Docker support for containerized deployment, making it easy to run the security testing framework in isolated environments with all dependencies pre-configured.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- At least 4GB RAM available for containers
- 10GB free disk space

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/4eckd/cayc-bake.git
cd cayc-bake
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Build and Start Services

```bash
# Using Make
make build
make up

# Or using Docker Compose directly
docker-compose build
docker-compose up -d
```

### 4. Access the Container

```bash
make shell
# Or
docker-compose exec cayc-bake /bin/bash
```

## Architecture

### Multi-Stage Build

The Dockerfile uses a multi-stage build approach:

1. **python-base**: Base Python image with system dependencies
2. **go-builder**: Builds Go-based scanning tools
3. **final**: Production image with all tools installed

### Services

#### Core Service (cayc-bake)

- Main container running the security testing framework
- Includes all scanning tools and Python dependencies
- Runs as non-root user for security

#### Database (postgres)

- PostgreSQL 15 for storing scan results
- Persistent volume for data retention
- Health checks for reliability

#### Cache (redis)

- Redis 7 for task queue and caching
- Password-protected by default
- Append-only mode in production

## Configuration

### Environment Variables

Key environment variables to configure:

```bash
# Application
ENVIRONMENT=development|production
LOG_LEVEL=DEBUG|INFO|WARNING|ERROR
DEBUG=true|false

# Database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=caycbake
DB_USER=caycuser
DB_PASSWORD=your-secure-password

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# AWS (for S3 scanning)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_DEFAULT_REGION=us-west-2
```

### Volume Mounts

```yaml
volumes:
  - ./results:/app/results      # Scan results
  - ./logs:/app/logs            # Application logs
  - ./wordlists:/app/wordlists  # Custom wordlists
  - ./payloads:/app/payloads    # Attack payloads
  - ./configs:/app/configs      # Configuration files
```

## Development Setup

### Running in Development Mode

```bash
make dev
# Or
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Development mode includes:
- Hot reloading for code changes
- Debug port exposed (5678)
- Adminer for database management (port 8081)
- Redis Commander for cache inspection (port 8082)

### Debugging

Connect your IDE debugger to `localhost:5678` for remote debugging.

## Production Deployment

### Building for Production

```bash
docker build -t cayc-bake:prod --target final .
```

### Running in Production

```bash
make prod
# Or
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

Production features:
- Resource limits enforced
- Health checks enabled
- Monitoring with Prometheus/Grafana
- Log rotation configured
- Security hardening applied

### Monitoring

Access monitoring dashboards:
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000

Default Grafana credentials: admin/admin (change immediately)

## Security Considerations

### Container Security

1. **Non-root User**: Containers run as non-privileged user `caycbake`
2. **Read-only Mounts**: Configuration files mounted as read-only
3. **No New Privileges**: Security option prevents privilege escalation
4. **Resource Limits**: CPU and memory limits prevent resource exhaustion

### Network Security

```yaml
networks:
  cayc-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.25.0.0/16
```

Isolated network for inter-container communication.

### Secrets Management

- Use Docker secrets for sensitive data in production
- Never commit `.env` files to version control
- Rotate credentials regularly

## Common Operations

### View Logs

```bash
make logs
# Or specific service
docker-compose logs -f postgres
```

### Run Tests

```bash
make test
```

### Database Operations

```bash
# Run migrations
make db-migrate

# Reset database
make db-reset

# Backup database
make backup
```

### Clean Up

```bash
# Stop and remove containers
make clean

# Remove all Docker resources
docker system prune -a
```

## Troubleshooting

### Container Won't Start

1. Check logs: `docker-compose logs cayc-bake`
2. Verify environment variables in `.env`
3. Ensure ports aren't already in use
4. Check Docker daemon is running

### Permission Issues

```bash
# Fix ownership
docker-compose exec cayc-bake chown -R caycbake:caycbake /app
```

### Database Connection Failed

1. Verify database container is healthy:
   ```bash
   docker-compose ps
   ```
2. Check connection settings in `.env`
3. Ensure database is initialized:
   ```bash
   make db-migrate
   ```

### Out of Memory

Increase Docker memory allocation or adjust container limits:

```yaml
deploy:
  resources:
    limits:
      memory: 4G
```

## Advanced Configuration

### Custom Dockerfile

Create `Dockerfile.custom` for additional tools:

```dockerfile
FROM cayc-bake:latest

# Install additional tools
RUN apt-get update && apt-get install -y \
    your-custom-tool

# Add custom scripts
COPY custom-scripts/ /app/custom/
```

### Docker Swarm Deployment

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml cayc-stack
```

### Kubernetes Deployment

Convert Docker Compose to Kubernetes manifests:

```bash
kompose convert -f docker-compose.yml
kubectl apply -f .
```

## Performance Tuning

### Build Cache Optimization

```bash
# Enable BuildKit
export DOCKER_BUILDKIT=1
docker build .
```

### Layer Caching

Order Dockerfile instructions from least to most frequently changing:
1. System packages
2. Python requirements
3. Application code

### Multi-CPU Builds

```bash
docker build --build-arg BUILDKIT_INLINE_CACHE=1 .
```

## Best Practices

1. **Regular Updates**: Keep base images and dependencies updated
2. **Minimal Images**: Use alpine variants where possible
3. **Layer Optimization**: Combine RUN commands to reduce layers
4. **Health Checks**: Implement health checks for all services
5. **Logging**: Use structured logging with appropriate log levels
6. **Backups**: Regular automated backups of data volumes
7. **Security Scanning**: Scan images for vulnerabilities:
   ```bash
   docker scan cayc-bake:latest
   ```

## Support

For Docker-related issues:
1. Check the [troubleshooting guide](./troubleshooting.md)
2. Review [Docker documentation](https://docs.docker.com)
3. Open an issue on [GitHub](https://github.com/4eckd/cayc-bake/issues)
