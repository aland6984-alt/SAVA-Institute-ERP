# Supabase Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=SAVA Institute ERP

# Image Storage
NEXT_PUBLIC_STORAGE_BUCKET=profiles
```

## Database Setup

1. Create a new Supabase project at https://supabase.com
2. Go to SQL Editor in Supabase console
3. Run the migration files in order:
   - `supabase/migrations/001_create_schema.sql` - Creates all tables and policies
   - `supabase/migrations/002_create_storage.sql` - Creates storage bucket for images

## Storage Setup

1. Go to Storage in Supabase console
2. Create a bucket named `profiles` (public)
3. Add the RLS policies from `002_create_storage.sql`

## Authentication Setup

1. Enable Email/Password authentication in Supabase
2. Configure email templates if needed
3. Optionally enable OAuth providers (Google, GitHub, etc.)

## Initial Data

To add sample departments, run:

```sql
INSERT INTO public.departments (name, code, description, theme_color) VALUES
('Nursing', 'NUR', 'Bachelor of Science in Nursing', '#FF6B9D'),
('Pharmacy', 'PHARM', 'Bachelor of Science in Pharmacy', '#00C9A7'),
('Medical Laboratory Technology', 'MLT', 'Diploma in Medical Laboratory Technology', '#845EC2'),
('Dental Technology', 'DENT', 'Diploma in Dental Technology', '#0094D8'),
('Aesthetic Clinic', 'AEST', 'Aesthetic and Cosmetology Studies', '#FF9671'),
('English', 'ENG', 'English Language Studies', '#FFB347'),
('Hospital Administration', 'ADMIN', 'Health Administration Program', '#8E7CC3'),
('Marketing', 'MKT', 'Marketing Management', '#C4C4FF'),
('Network Services', 'NET', 'IT Network Services', '#00D9FF');
```

## Database Relationships

```
Profiles (Base User)
  ├── Students
  │   ├── Enrollments → Subjects
  │   ├── Grades → Exams
  │   ├── Attendance
  │   └── Payments
  ├── Teachers
  │   └── Subjects
  └── Departments

Subjects
  ├── Timetables
  ├── Exams → Grades
  └── Enrollments → Students

Announcements
  └── Profiles (created_by)
```

## Features Enabled

✅ Row Level Security (RLS) - Data access control
✅ Storage Policies - Image upload/download control
✅ Indexes - Performance optimization
✅ Triggers - Automatic timestamps

## Next Steps

1. Run `npm install` to install dependencies
2. Set up environment variables in `.env.local`
3. Run database migrations in Supabase
4. Run `npm run dev` to start development server
5. Visit `http://localhost:3000` to test the application
