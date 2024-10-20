## Deploy PostgreSQL Database on Docker Hub

### Prerequisites
- Docker installed on your machine.
- Docker Hub account.

### Steps to Deploy

#### 1. Export Your Current Database:
First, you need to export your current PostgreSQL database to a file see `create_db_backup.md` file.

#### 2. Create a Dockerfile

Create a `Dockerfile` that will copy the backup file into the image and restore it when the container starts. Here’s an example `Dockerfile`:

```dockerfile
FROM postgres:latest

# Set environment variables
ENV POSTGRES_DB=your_database
ENV POSTGRES_USER=your_username
ENV POSTGRES_PASSWORD=your_password

# Copy the backup file into the image
COPY your_database_backup.dump /docker-entrypoint-initdb.d/

# Restore the database from the backup
RUN chmod 755 /docker-entrypoint-initdb.d/your_database_backup.dump
```

### 3. Build the Docker Image

Run the following command in the directory containing your `Dockerfile` and the backup file:

```bash
docker build -t your_postgres_image .
```

### 4. Run the PostgreSQL Container

Now, run the container. The PostgreSQL image will automatically restore the database from the backup file upon initialization:

```bash
docker run --name your_postgres_container -d -v pg_data:/var/lib/postgresql/data your_postgres_image
```

### 5. Push to Docker Hub

1. **Log in to Docker Hub**:

   ```bash
   docker login
   ```

2. **Tag your image**:

   ```bash
   docker tag your_postgres_image your_dockerhub_username/your_postgres_image
   ```

3. **Push the image to Docker Hub**:

   ```bash
   docker push your_dockerhub_username/your_postgres_image
   ```

### Summary

- Export your existing database to a dump file using `pg_dump`.
- Create a `Dockerfile` that copies this dump file and sets up the database.
- Build the Docker image and run the container.
- Finally, push the image to Docker Hub.

This way, your PostgreSQL database will be deployed with its current data included in the Docker image.