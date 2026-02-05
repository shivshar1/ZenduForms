# ZenduForm

An Angular application for managing and viewing reports with advanced search, sort, and pagination features. Built with Angular 20 and TypeScript, featuring a modern, responsive UI powered by Bootstrap.

## 🌐 Live Demo

**Production URL:** [https://zendu-forms-black.vercel.app/reports](https://zendu-forms-black.vercel.app/reports)

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Main Components](#main-components)
- [Technologies Used](#technologies-used)
- [Additional Notes for Reviewers](#additional-notes-for-reviewers)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.x or higher recommended)
- **npm** (version 9.x or higher) - comes with Node.js
- **Angular CLI** (version 20.x) - will be installed as a dev dependency

## Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd ZenduForm
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   This will install all required dependencies including Angular 20, Bootstrap, Bootstrap Icons, and other project dependencies.

## Running the Project

### Development Server

To start the development server:

```bash
npm start
```

or

```bash
ng serve
```

The application will be available at `http://localhost:4200/`. The development server supports hot-reload, so any changes you make to the code will automatically refresh in the browser.

### Build and Watch Mode

To build the project in watch mode (automatically rebuilds on file changes):

```bash
npm run watch
```

This runs `ng build --watch --configuration development`.

### Running Tests

To execute unit tests:

```bash
npm test
```

or

```bash
ng test
```

## Building for Production

To build the project for production:

```bash
npm run build
```

or

```bash
ng build
```

The production build will be output to the `dist/browser/` directory. The build includes:
- Optimized and minified JavaScript bundles
- Optimized CSS
- Source maps (disabled in production)
- Asset hashing for cache busting

## Project Structure

```
ZenduForm/
├── src/
│   ├── app/
│   │   ├── layout/
│   │   │   └── navbar/          # Navigation bar component
│   │   ├── reports/
│   │   │   ├── reports-list/     # Reports list page component
│   │   │   ├── report-table/     # Report table component
│   │   │   └── report.model.ts   # Report data model/interface
│   │   ├── shared/
│   │   │   ├── searchable-paginated-table/  # Reusable table component
│   │   │   └── feature-placeholder/        # Placeholder for future features
│   │   ├── app.ts                # Root component
│   │   ├── app.routes.ts         # Application routing configuration
│   │   └── app.config.ts         # Application configuration
│   ├── styles.scss               # Global styles
│   └── index.html                # Main HTML file
├── angular.json                   # Angular CLI configuration
├── package.json                   # Project dependencies and scripts
└── tsconfig.json                 # TypeScript configuration
```

## Main Components

### 1. **ReportsList Component** (`src/app/reports/reports-list/`)

The main component for displaying and managing reports.

**Functionality:**
- Displays a list of reports in a searchable, sortable, and paginated table
- Supports deletion and editing of reports (edit functionality can be extended)
- Configures table columns: Report Name, Created Date, Modified Date, Owner, and Form
- Search functionality across name, owner, and form fields
- Default sorting by creation date (newest first)

**Key Features:**
- Uses the reusable `SearchablePaginatedTable` component
- Manages report data (currently using mock data)
- Handles delete and edit actions

### 2. **SearchablePaginatedTable Component** (`src/app/shared/searchable-paginated-table/`)

A highly reusable, generic table component with advanced features.

**Functionality:**
- **Search**: Real-time search across specified fields
- **Sorting**: Multi-column sorting with visual indicators (ascending/descending)
- **Pagination**: Configurable page size with page navigation
- **Quick Sort**: "Newest First" and "Oldest First" quick sort buttons
- **Customizable**: Supports custom row templates and track-by functions
- **Events**: Emits events for delete, edit, page change, and sort change

**Inputs:**
- `data`: Array of data items to display
- `columns`: Column configuration (key, label, sortable flag)
- `pageSize`: Number of items per page (default: 5)
- `searchFields`: Fields to search across
- `sortConfig`: Initial sort configuration
- `rowTemplate`: Optional custom template for table rows

**Outputs:**
- `itemDelete`: Emitted when a delete action is triggered
- `itemEdit`: Emitted when an edit action is triggered
- `pageChange`: Emitted when the page changes
- `sortChange`: Emitted when sorting changes

### 3. **Navbar Component** (`src/app/layout/navbar/`)

The main navigation component.

**Functionality:**
- Provides navigation links to different sections of the application
- Routes: Reports, Forms, Customers, Submissions, History, Workflow
- Highlights active route using Angular Router's `RouterLinkActive`
- Responsive design using Bootstrap

### 4. **FeaturePlaceholder Component** (`src/app/shared/feature-placeholder/`)

A placeholder component for features that are not yet implemented.

**Functionality:**
- Displays a message indicating that a feature is coming soon
- Used for routes like Forms, Customers, Submissions, History, and Workflow

### 5. **Report Model** (`src/app/reports/report.model.ts`)

TypeScript interface defining the Report data structure.

**Properties:**
- `id`: Unique identifier (number)
- `name`: Report name (string)
- `created`: Creation date (Date)
- `modified`: Last modification date (Date)
- `owner`: Owner email (string)
- `form`: Associated form name (string)

## Technologies Used

- **Angular 20.3.0** - Modern Angular framework with standalone components
- **TypeScript 5.9.2** - Type-safe JavaScript
- **Bootstrap 5.3.8** - CSS framework for responsive design
- **Bootstrap Icons 1.13.1** - Icon library
- **RxJS 7.8.0** - Reactive programming library
- **Angular Router** - Client-side routing
- **SCSS** - CSS preprocessor for styling

## Additional Notes for Reviewers

### Code Quality & Architecture

- **Standalone Components**: The project uses Angular's standalone components architecture (no NgModules), making it modern and easier to maintain
- **Type Safety**: Full TypeScript implementation with interfaces for data models
- **Reusability**: The `SearchablePaginatedTable` component is designed to be reusable across different data types
- **Separation of Concerns**: Clear separation between components, models, and shared utilities

### Current Implementation Status

- ✅ **Reports List**: Fully functional with search, sort, and pagination
- ✅ **Navigation**: Complete navigation structure with active route highlighting
- ⏳ **Forms, Customers, Submissions, History, Workflow**: Placeholder components ready for future implementation

### Data Management

- Currently uses **mock data** stored in the `ReportsList` component
- The component structure is ready for integration with a backend API
- Delete functionality is implemented (removes from local array)
- Edit functionality has a placeholder (console.log) ready for implementation

### Styling & UI

- Uses Bootstrap 5 for responsive design
- Custom SCSS files for component-specific styling
- Bootstrap Icons for consistent iconography
- Modern, clean UI with hover effects and smooth interactions

### Performance Considerations

- Uses `trackBy` functions for efficient list rendering
- Pagination reduces DOM elements for better performance
- Search filtering is optimized with lowercase comparison
- Sorting handles multiple data types (Date, number, string)

### Future Enhancements

- Backend API integration for data persistence
- User authentication and authorization
- Advanced filtering options
- Export functionality (CSV, PDF)
- Bulk operations (select multiple, bulk delete)
- Form builder and submission management
- Customer management features
- Workflow automation

### Testing

- Test files are included (`.spec.ts` files)
- Run tests using `npm test` or `ng test`
- Karma and Jasmine are configured for unit testing

### Deployment

- The project is configured for deployment to Vercel
- Production build optimizations are enabled
- Asset hashing is configured for cache management
- The application is currently live at: [https://zendu-forms-black.vercel.app/reports](https://zendu-forms-black.vercel.app/reports)

---

**For questions or support, please contact @shivam.upmanyu12@gmail.com.**
