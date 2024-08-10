# Contributing to the Project

Thank you for considering contributing to this project! We appreciate your help in making this project better. Please follow these guidelines to ensure a smooth contribution process.

## Table of Contents

- [Getting Started](#getting-started)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Types and Scopes](#types-and-scopes)
- [Code Style](#code-style)
- [Submitting Changes](#submitting-changes)

## Getting Started

1. **Fork the repository**: Click the "Fork" button on the top right of the repository page.
2. **Clone your fork**: Use the following command to clone your forked repository:

   ```bash
   git clone git@github.com:Pro-Minds/ReadWell-v2.git
   ```
3. **Setting Up Git Hooks**: To set up the commit message hooks, run the following command:
    ```bash
   chmod +x ./scripts/setup_hooks.sh
    ./scripts/setup_hooks.sh
    ````
4. **Create a new branch**: Always create a new branch for your changes:
    ```shell
    git checkout -b feature/issue-<issue_number>-<feature_name>
    ```
   Or run
    ```shell
    chmod +x scripts/create_branch.sh
    ./scripts/create_branch.sh <issue_number> "<feature_name>"
    ```
   E.g 
    `./scripts/create_branch.sh 1.1 "basic-html-parser"`

## Branch Naming Conventions
Branches should follow this format:

```shell
feature/issue-<issue_number>-<feature_name>
```
**Example**:

```shell
feature/issue-1.1-basic-html-parser
```

## Commit Message Guidelines
When committing changes, please ensure your commit messages follow the specified format:

```shell
<type>(<scope>): <subject>
```
**Examples:**
- `feat: clear commit msg`
- `feat(html-parser): clear commit msg`
If the commit message format is incorrect, you will receive an error message prompting you to correct it.

## Types and Scopes

### **Available Types:**
- **feat**: A new feature for the user.
- **fix**: A bug fix.
- **docs**: Documentation only changes.
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc.).
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **perf**: A code change that improves performance.
- **test**: Adding missing or correcting existing tests.
- **chore**: Changes to the build process or auxiliary tools and libraries.

### **Available Scopes:**
* **account-management**: Related to user account creation, login, and authentication for both admin and student roles.
* **class-management**: Related to creating, editing, and managing classes.
* **subject-management**: Related to creating, editing, and managing subjects within classes.
* **topic-management**: Related to creating, editing, and managing topics within subjects.
* **question-management**: Related to creating, editing, and managing questions and answers within topics.
* **quiz**: Related to quiz-taking functionalities, including question presentation and answer submission.
* **result-management**: Related to calculating, storing, and displaying quiz results.
* **ui-ux**: Related to the user interface and user experience design.
* **database**: Related to database configuration, connection, and schema design.
* **backend**: Related to backend development, including API creation and business logic implementation.
* **frontend**: Related to frontend development using Angular.
* **integration**: Related to integrating the frontend with the backend.
* **security**: Related to securing the application, including CORS configuration (authentication to be added later).
* **testing**: Related to writing and running tests to ensure the application works as expected.
* **deployment**: Related to deploying the application, including Docker setup and environment configuration.

## Submitting Changes
1. **Push your changes:**
```shell
git push origin feature/issue-<issue_number>-<feature_name>
```

2. **Create a Pull Request**: Go to the original repository and click on "Pull Requests." Then click on "New Pull Request" and select your branch.

3. **Describe your changes**: Provide a clear description of your changes and reference any related issues.

---
Thank you for contributing to the project! Your efforts help us improve and maintain the quality of our codebase.