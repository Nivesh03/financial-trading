# Financial Trading App

This is a monorepo project for a financial trading application, built with a modern tech stack.

## Overview

The project is divided into two main parts:

-   `apps/server`: The backend server built with Express.js and TypeScript.
-   `apps/web`: The frontend client built with React.js and TypeScript.

## Deployed Apps

-   **Frontend (Netlify):** [https://financial-trading-nivesh.netlify.app/](https://financial-trading-nivesh.netlify.app/)
-   **Backend (Render):** [https://financial-trading-backend.onrender.com/](https://financial-trading-backend.onrender.com/)

## Tech Stack

**Server:**

-   [Bun](https://bun.sh/)
-   [Express.js](https://expressjs.com/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Drizzle ORM](https://orm.drizzle.team/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Zod](https://zod.dev/)

**Web:**

-   [Bun](https://bun.sh/)
-   [React.js](https://reactjs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Vite](https://vitejs.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Tanstack Query](https://tanstack.com/query/latest)
-   [Tanstack Router](https://tanstack.com/router/latest)

## Setup

### Prerequisites

-   [Bun](https://bun.sh/docs/installation)
-   [Node.js](https://nodejs.org/en/download/) (for `bun`)
-   [PostgreSQL](https://www.postgresql.org/download/)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/financial-trading.git
cd financial-trading
```

### 2. Install dependencies

```bash
bun install
```

### 3. Environment Variables

**Server:**

Create a `.env` file in the `apps/server` directory by copying the `.env.example` file.

```bash
cp apps/server/.env.example apps/server/.env
```

Update the `.env` file with your PostgreSQL database credentials.

```
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<db>"
```

### 4. Database Migration

Run the following command to migrate the database schema.

```bash
bun db:migrate
```

## Development

To run both the server and web development servers concurrently, run the following command from the root directory:

```bash
bun dev
```

To run the servers individually:

**Server:**

```bash
bun dev:server
```

The server will start on `http://localhost:5000`.

**Web:**

```bash
bun dev:web
```

The web client will start on `http://localhost:3001`.

## API Documentation

### Auth Routes

-   **POST** `/api/auth/sign-up` - Register a new user.
-   **POST** `/api/auth/sign-in` - Authenticate a user.
-   **POST** `/api/auth/sign-out` - Sign out the current user.
-   **GET** `/api/auth/get-user` - Get the current user's data.

### Dashboard Routes

-   **GET** `/api/dashboard/portfolio` - Get the user's portfolio.
-   **GET** `/api/dashboard/watchlist` - Get the user's watchlist.
-   **POST** `/api/dashboard/watchlist/:productId` - Add a product to the user's watchlist.
-   **DELETE** `/api/dashboard/watchlist/:productId` - Remove a product from the user's watchlist.

### Product Routes

-   **GET** `/api/products` - Get a list of all products.
-   **GET** `/api/products/:id` - Get information about a specific product.

### Transaction Routes

-   **POST** `/api/transactions/buy` - Handle a new transaction.