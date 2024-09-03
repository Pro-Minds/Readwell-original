FROM openjdk:17-jre-slim
LABEL authors="sinke"

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Copy the source code
COPY src ./src

# Build the application
RUN ./mvnw package -DskipTests

# Expose the port your app runs on
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/your-backend-application.jar"]