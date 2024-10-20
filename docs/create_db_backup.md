Markdown file documenting the process of creating a PostgreSQL backup and deploying a database on Docker Hub.

# PostgreSQL Backup and Deployment Documentation

## Table of Contents
- [Overview](#overview)
- [Backup PostgreSQL Database](#backup-postgresql-database)
- [Deploy PostgreSQL Database on Docker Hub](#deploy-postgresql-database-on-docker-hub)

## Overview
This document outlines the process of creating a backup of a PostgreSQL database and deploying it on Docker Hub while preserving its current data.

## Backup PostgreSQL Database

### Prerequisites
- PostgreSQL server running and accessible.
- Docker installed on your machine.

### Steps to Create a Backup

1. **Backup the Database**:
   Use the `pg_dump` command to create a backup of the database.
   ```bash
   pg_dump -U your_username -h your_host_IP -F c -b -v -f /path/to/your_database.backup your_database

2. **Using Docker to Back Up**:
   Run a PostgreSQL Docker container and mount a local directory:
   ```bash
   docker run --rm -it -v /path/to/local/directory:/backup postgres:17.0 bash
   ```
   Inside the container, run:
   ```bash
   pg_dump -U admin -h your_host_IP -F c -b -v -f /backup/readwell-db.backup readwell-db
   ```
