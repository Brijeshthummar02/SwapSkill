# Supabase Setup Guide for SkillSwap

## Prerequisites

1. Create a [Supabase account](https://supabase.com)
2. Create a new Supabase project

## Setup Steps

### 1. Environment Configuration

1. Copy `.env.example` to `.env`
2. Fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   VITE_ADMIN_EMAIL=admin@skillswap.com
   ```

### 2. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL script to create all necessary tables and policies

### 3. Authentication Setup

1. In your Supabase dashboard, go to Authentication > Settings
2. Configure your site URL: `http://localhost:8080`
3. Add any additional redirect URLs you need for production

### 4. Row Level Security

The schema automatically enables Row Level Security (RLS) with appropriate policies:

- Users can only see and edit their own profiles
- Users can view public skills and other users' skills
- Users can only access swaps and messages they're involved in
- Reviews are publicly viewable if marked as public

### 5. Admin User Setup

To make a user an admin:

1. Register the user through your app
2. In Supabase dashboard, go to Authentication > Users
3. Find the user and edit their raw user meta data
4. Add: `{"role": "admin"}`
5. Or set their email to match `VITE_ADMIN_EMAIL` in your .env file

### 6. Database Tables Created

- `profiles` - Extended user profiles
- `skills` - Available skills in the system
- `user_skills` - Skills users can teach
- `user_learning_interests` - Skills users want to learn
- `skill_swaps` - Skill exchange requests
- `messages` - Messages between users
- `reviews` - User reviews and ratings
- `admin_users` - Admin permissions (optional)
- `reports` - Content moderation reports

### 7. Available Authentication Methods

The app supports:

- Email/Password authentication
- Social logins (can be configured in Supabase)
- Password reset
- Email confirmation

### 8. Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### 9. Production Deployment

1. Update environment variables for production
2. Configure production URLs in Supabase dashboard
3. Set up proper CORS policies
4. Configure email templates for authentication

## Security Notes

- All tables have Row Level Security enabled
- Users can only access their own data
- Admin access is controlled via user metadata or email matching
- API keys should never be exposed in client-side code (use environment variables)

## Troubleshooting

1. **Connection issues**: Verify your Supabase URL and API keys
2. **Authentication errors**: Check your site URL configuration
3. **Permission errors**: Verify RLS policies are correctly applied
4. **Admin access issues**: Ensure user has admin role in metadata
