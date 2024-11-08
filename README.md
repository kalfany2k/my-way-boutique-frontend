````markdown
# MWB Frontend

Frontend application for MWB (My Wedding Boutique) e-commerce platform.

## Tech Stack

- React with TypeScript
- Tailwind CSS
- FastAPI Client Integration
- Authentication with JWT

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:yourusername/mwb-frontend.git
   cd mwb-frontend
   ```
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Development Guidelines

### Branch Naming

- `feature/`: For new features
- `bugfix/`: For bug fixes
- `hotfix/`: For urgent production fixes
- `release/`: For release preparations

### Commit Convention

```
type(scope): description

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance
```

### Pull Request Process

1. Create branch from `develop`
2. Implement changes
3. Submit PR to `develop`
4. Require one approval
5. Squash and merge

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run test`: Run tests
- `npm run lint`: Run linter

```

```
