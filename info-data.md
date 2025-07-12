# SkillSwap - Connect & Learn

SkillSwap is a modern web application designed to connect individuals who want to learn new skills by exchanging knowledge with others in their community. It provides a platform for users to create profiles, list skills they can teach and skills they want to learn, and find matching partners for skill exchange.

## Tech Stack

This project is built with a modern, type-safe, and efficient technology stack:

-   **Frontend:**
    -   **Framework:** React with Vite
    -   **Language:** TypeScript
    -   **UI Components:** Shadcn/UI
    -   **Styling:** Tailwind CSS
    -   **Routing:** React Router
    -   **State Management:** React Query, React Hooks & Context API
    -   **Animations:** Framer Motion
-   **Backend:**
    -   **Service:** Supabase
    -   **Database:** PostgreSQL
    -   **Authentication:** Supabase Auth

## Project Structure

The project is organized into the following directories:

-   `public/`: Contains static assets like images and fonts.
-   `src/`: The main source code for the application.
    -   `components/`: Reusable UI components.
        -   `admin/`: Components specific to the admin portal.
        -   `ui/`: Core UI components from Shadcn/UI.
    -   `hooks/`: Custom React hooks for managing state and logic.
    -   `lib/`: Utility functions, Supabase client, and other shared logic.
    -   `pages/`: Top-level page components for each route.
        -   `admin/`: Pages for the admin portal.
    -   `types/`: TypeScript type definitions.
-   `supabase/`: Supabase configuration and migrations.
    -   `migrations/`: Database schema migrations.

## Core Features

-   **User Authentication:** Secure sign-up and sign-in functionality using Supabase Auth.
-   **Profile Management:** Users can create and update their profiles with personal information, skills, and availability.
-   **Skill Matching:** A discovery feature to find other users with complementary skills.
-   **Admin Portal:** A dedicated section for administrators to manage users and moderate content.
-   **Responsive Design:** A modern and responsive UI that works on all devices.

## Setup and Installation

To get the project running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Create a `.env` file in the root of the project.
    -   Add your Supabase project URL and anon key:
        ```
        VITE_SUPABASE_URL=your-supabase-url
        VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
        ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Supabase Backend

The backend is powered by Supabase, which provides a PostgreSQL database, authentication, and auto-generated APIs.

-   **Database Schema:** The database schema is managed through migration files in the `supabase/migrations` directory.
-   **Authentication:** User authentication is handled by Supabase Auth, with helper functions available in `src/lib/supabase.ts`.
-   **API Interaction:** The Supabase client is configured in `src/lib/supabase.ts` and is used throughout the application to interact with the database.

## Admin Portal

The admin portal is a protected section of the application that allows administrators to manage the platform.

-   **Access Control:** Admin access is managed through a role-based system. Users with the `admin` role in the Supabase database can access the admin portal.
-   **Features:** The admin portal includes user management, content moderation, and other administrative features.

## Code Overview

-   **`src/App.tsx`**: The main application component that sets up routing and global providers.
-   **`src/components/Header.tsx`**: The main navigation header for the application.
-   **`src/pages/Discover.tsx`**: The page where users can discover other users and skills.
-   **`src/hooks/useAuth.tsx`**: A custom hook for managing user authentication state.
-   **`src/lib/supabase.ts`**: Contains the Supabase client and helper functions for interacting with the backend.