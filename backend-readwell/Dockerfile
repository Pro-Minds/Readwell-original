FROM openjdk:17-slim
LABEL authors="sinke"

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Copy the wait-for-it script
COPY ./scripts/wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

# Copy the source code
COPY src ./src

# Build the application
RUN ./mvnw clean install -DskipTests
RUN ./mvnw package -DskipTests

# Specify the command to run your application
CMD ["wait-for-it", "postgres:5432", "--", "java", "-jar", "target/backend-readwell-0.0.1-SNAPSHOT.jar"]
