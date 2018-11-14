# Stage 1 - the build process
FROM gradle:4.10-jdk8 as build-deps
COPY build.gradle settings.gradle ./
COPY gradle ./gradle
COPY src ./src
RUN gradle shadowJar

# Stage 2 - the production environment
FROM openjdk:8-jre-alpine
WORKDIR /usr/src/app
EXPOSE 8080 8081
COPY --from=build-deps /home/gradle/build/libs/*-all.jar ./
ENTRYPOINT ["java", "-jar", "yougo-api-all.jar"]
CMD ["server", "config.yml"]
