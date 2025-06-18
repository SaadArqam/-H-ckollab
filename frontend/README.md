# H@ckollab Frontend

A modern React-based frontend for the H@ckollab developer collaboration platform.

## Features

- **Developer Discovery**: Browse and filter developers by skills, experience, and availability
- **Project Management**: Create, view, and manage collaborative projects
- **User Profiles**: Detailed developer profiles with skills, portfolio links, and project history
- **Authentication**: Secure authentication powered by Clerk
- **Responsive Design**: Beautiful, mobile-first design with Tailwind CSS
- **Real-time Features**: Ready for real-time updates and notifications

## Tech Stack

- **React 19** - Modern React with hooks and context
- **React Router** - Client-side routing
- **Clerk** - Authentication and user management
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - Global state management

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file in the frontend directory:
```env
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_USE_MOCK_DATA=true
```

3. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

## Environment Variables

- `REACT_APP_CLERK_PUBLISHABLE_KEY` - Your Clerk publishable key for authentication
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:3001/api)
- `REACT_APP_USE_MOCK_DATA` - Use mock data for development (default: true)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header
│   ├── Footer.js       # Site footer
│   ├── Layout.js       # Page layout wrapper
│   ├── ProjectCard.js  # Project preview card
│   ├── DeveloperCard.js # Developer preview card
│   ├── SearchFilters.js # Filter component for search
│   ├── SkillList.js    # Reusable skill display
│   └── ...
├── pages/              # Page components
│   ├── HomePage.js     # Landing/home page
│   ├── ExplorePage.js  # Developer discovery
│   ├── ProfilePage.js  # User profile view
│   ├── ProjectDetailsPage.js # Project details
│   ├── CreateProjectPage.js  # Project creation
│   └── ...
├── contexts/           # React contexts
│   └── AppContext.jsx  # Global app state
├── data/              # Sample/mock data
│   └── sampleData.js  # Development data
├── App.js             # Main app component
├── AppRoutes.jsx      # Route definitions
└── index.js           # Entry point
```

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Key Components

### AppContext
Global state management for:
- User authentication status
- Projects and developers data
- API call helpers
- Loading and error states

### Page Components
- **HomePage**: Landing page with featured projects and call-to-action
- **ExplorePage**: Developer discovery with advanced filtering
- **ProfilePage**: Detailed user profiles with projects and skills
- **ProjectDetailsPage**: Full project information with team details
- **CreateProjectPage**: Project creation form with validation

### Reusable Components
- **ProjectCard**: Displays project summary in grid layouts
- **DeveloperCard**: Shows developer information in search results
- **SearchFilters**: Advanced filtering for developer search
- **SkillList**: Consistent skill/technology display
- **ProtectedRoute**: Authentication-required route wrapper

## Development Mode

When `REACT_APP_USE_MOCK_DATA=true`, the app uses sample data for development:
- 5 sample developers with various skills and experience levels
- 6 sample projects in different stages
- Mock API functions with simulated network delays

## Authentication

Authentication is handled by Clerk with:
- Sign up/Sign in pages
- Protected routes
- User profile management
- Session persistence

## Styling

The project uses Tailwind CSS for styling with:
- Responsive design patterns
- Custom color scheme (primary: blue-600)
- Consistent spacing and typography
- Custom utilities for line clamping

## API Integration

The frontend is designed to work with a REST API. Key endpoints expected:

- `GET /api/users` - Fetch developers with optional filters
- `GET /api/users/:id` - Fetch specific developer
- `GET /api/projects` - Fetch projects with optional filters
- `GET /api/projects/:id` - Fetch specific project
- `POST /api/projects` - Create new project
- `POST /api/invitations` - Send project invitation

## Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting platform

3. Update environment variables for production:
- Set your production Clerk publishable key
- Set your production API URL
- Set `REACT_APP_USE_MOCK_DATA=false`

## Contributing

1. Follow the existing code structure and naming conventions
2. Use functional components with hooks
3. Implement responsive design for all new components
4. Add proper error handling and loading states
5. Write descriptive commit messages

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
