FROM postgres:latest

# Set environment variables
ENV POSTGRES_DB=readwell_db
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin

# Copy the backup file into the image
COPY ./19_Oct_24.backup /docker-entrypoint-initdb.d/
