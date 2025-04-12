# Contributing to DevWorks

Thank you for your interest in contributing to DevWorks! This document provides guidelines and steps for contributing to our project.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/devworks.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Push to your fork: `git push origin feature/your-feature-name`
6. Create a Pull Request

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Branch Naming Convention

- `feature/`: New features
- `bugfix/`: Bug fixes
- `hotfix/`: Urgent fixes
- `release/`: Release preparation
- `docs/`: Documentation updates

## Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Adding or modifying tests
- chore: Maintenance tasks

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the documentation if needed
3. The PR must pass all CI checks
4. You may merge the PR once you have the sign-off of at least one other developer

## Testing

Please ensure all tests pass before submitting a PR:
```bash
npm test
```

## Questions?

Feel free to open an issue if you have any questions! 