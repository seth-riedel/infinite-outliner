# Infinite Outliner - Frontend

A React + TypeScript frontend for the Infinite Outliner application, built with Vite and Material UI.

## Features

- **Modern Material Design**: Clean, professional interface using Material UI components
- **Responsive Header**: Top navigation bar with hamburger menu, search functionality, and user controls
- **TypeScript**: Full type safety for better development experience
- **Fast Development**: Hot module replacement with Vite

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── App.tsx          # Main application component with Material UI
├── main.tsx         # Application entry point
├── index.css        # Minimal global styles
└── assets/          # Static assets
```

## Development

The application uses:
- **React 19** with hooks for state management
- **TypeScript** for type safety
- **Material UI** for component library and styling
- **Vite** for fast development and building
- **ESLint** for code quality

## UI Components

- **AppBar**: Top navigation bar with hamburger menu
- **Search**: Integrated search functionality in the header
- **IconButtons**: Settings, notifications, and user profile icons
- **Typography**: Consistent text styling throughout the app

## Contributing

1. Follow the existing code style
2. Use Material UI components for consistency
3. Add TypeScript types for new features
4. Test your changes before submitting
