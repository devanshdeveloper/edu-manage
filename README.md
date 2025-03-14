# EduManage Client

## Overview

EduManage Client is the frontend component of the Education Management System. It provides a modern, responsive user interface for educational institutions, administrators, teachers, students, and parents. Built with React and Vite, it offers a seamless experience for managing all aspects of educational institutions.

## Features

- **User Authentication**: Secure login and registration system
- **Dashboard**: Customized dashboards for different user roles
- **Institution Management**: Tools for managing educational institutions
- **User Management**: Interface for handling different user types
- **Course Management**: Create and manage courses, assignments, and grades
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Documentation**: Built-in documentation for users

## Technology Stack

- [React](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [HeroUI](https://heroui.com) - UI Component Library
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS Framework
- [Tailwind Variants](https://tailwind-variants.org) - Variant Management
- [Framer Motion](https://www.framer.com/motion) - Animation Library

## Project Structure

```
client/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # Reusable UI components
│   ├── config/          # Configuration files
│   ├── constants/       # Application constants
│   ├── context/         # React context providers
│   ├── helpers/         # Helper utilities
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Page layouts
│   ├── pages/           # Application pages
│   ├── routes/          # Route definitions
│   ├── styles/          # Global styles
│   ├── utils/           # Utility functions
│   ├── main.jsx         # Application entry point
│   └── provider.jsx     # Provider wrapper
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
└── vite.config.js       # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/edu-manage.git
   cd edu-manage/client
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. If using pnpm, add the following to your `.npmrc` file:
   ```
   public-hoist-pattern[]=*@heroui/*
   ```

### Running the Application

#### Development Mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This will start the development server at `http://localhost:5173` (or another port if 5173 is in use).

#### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

This will generate optimized production files in the `dist` directory.

#### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
# or
bun preview
```

This will serve the production build locally for testing.

## Deployment

### Vercel Deployment

The project includes a `vercel.json` configuration file for easy deployment to Vercel:

1. Install Vercel CLI
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel
   ```bash
   vercel
   ```

### Traditional Deployment

1. Build the project
   ```bash
   npm run build
   ```

2. Deploy the contents of the `dist` directory to your web server or hosting service

## Future Improvements

- Implement advanced data visualization components
- Add offline support with service workers
- Enhance accessibility features
- Implement comprehensive end-to-end testing
- Add support for multiple languages (i18n)
- Optimize bundle size and performance
- Implement progressive web app (PWA) features
- Add theme customization options

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.