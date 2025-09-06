# CAYC BAKE Makefile
# Provides convenient commands for Docker operations

.PHONY: help build up down restart logs shell clean test lint format security-scan

# Default target
help:
	@echo "CAYC BAKE Docker Management Commands"
	@echo "====================================="
	@echo "make build       - Build Docker images"
	@echo "make up          - Start all services"
	@echo "make down        - Stop all services"
	@echo "make restart     - Restart all services"
	@echo "make logs        - View container logs"
	@echo "make shell       - Enter CAYC BAKE container shell"
	@echo "make clean       - Clean up containers and volumes"
	@echo "make test        - Run tests"
	@echo "make lint        - Run linters"
	@echo "make format      - Format code"
	@echo "make security    - Run security scan"

# Build Docker images
build:
	docker-compose build --no-cache

# Start services
up:
	docker-compose up -d
	@echo "Services started! Access at http://localhost:8080"

# Stop services
down:
	docker-compose down

# Restart services
restart: down up

# View logs
logs:
	docker-compose logs -f cayc-bake

# Enter container shell
shell:
	docker-compose exec cayc-bake /bin/bash

# Clean up
clean:
	docker-compose down -v
	docker system prune -f
	rm -rf results/* logs/*

# Run tests
test:
	docker-compose exec cayc-bake python -m pytest tests/ -v

# Run linters
lint:
	docker-compose exec cayc-bake python -m flake8 scripts/
	docker-compose exec cayc-bake python -m pylint scripts/

# Format code
format:
	docker-compose exec cayc-bake python -m black scripts/
	docker-compose exec cayc-bake python -m isort scripts/

# Security scan
security:
	docker-compose exec cayc-bake python -m bandit -r scripts/
	docker-compose exec cayc-bake python -m safety check

# Database operations
db-migrate:
	docker-compose exec cayc-bake alembic upgrade head

db-reset:
	docker-compose exec postgres psql -U caycuser -d caycbake -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
	$(MAKE) db-migrate

# Backup operations
backup:
	mkdir -p backups
	docker-compose exec postgres pg_dump -U caycuser caycbake > backups/db_$(shell date +%Y%m%d_%H%M%S).sql
	tar -czf backups/results_$(shell date +%Y%m%d_%H%M%S).tar.gz results/

# Development mode
dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production mode
prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
