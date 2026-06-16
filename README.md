# SAVA Institute ERP System - Installation & Deployment Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available)
- Git for version control

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/aland6984-alt/SAVA-Institute-ERP.git
cd SAVA-Institute-ERP
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set up Supabase database

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions.

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Go to [Vercel](https://vercel.com) and import the repository
3. Add environment variables in Vercel project settings
4. Vercel will automatically deploy on push

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Key Features

✅ **Student Dashboard**
- View grades and GPA
- Check attendance percentage
- Track payments
- View timetable
- Camera photo capture for profile

✅ **Teacher Dashboard**
- Manage assigned subjects
- View enrolled students
- Mark attendance
- Enter grades
- Track student performance

✅ **Admin Control Panel**
- Manage all students and teachers
- View system statistics
- Process payments
- Generate reports
- System configuration

✅ **System Features**
- 🌓 Dark/Light mode toggle
- 📱 Responsive mobile-first design
- 🔐 Secure authentication with role-based access
- 🔒 Row-level security policies
- 📸 Profile photo uploads
- 🌍 Multi-language support (Ready)
- ⚡ Real-time database updates
- 📊 Analytics and reporting

## Project Structure

```
├── public/              # Static files
├── src/
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   │   ├── dashboards/
│   │   ├── layouts/
│   │   └── ui/
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities and services
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript types
│   └── utils/          # Helper functions
├── supabase/
│   └── migrations/     # Database migrations
├── .env.local.example  # Environment variables template
├── tsconfig.json       # TypeScript config
├── tailwind.config.ts  # Tailwind CSS config
└── package.json        # Dependencies
```

## Default Login Credentials

After running the migration scripts, you can create test accounts:

**Student:**
- Custom ID: STU00001
- Email: student@example.com
- Password: (set during creation)

**Teacher:**
- Custom ID: TCH00001
- Email: teacher@example.com
- Password: (set during creation)

**Admin:**
- Custom ID: ADM00001
- Email: admin@example.com
- Password: (set during creation)

## Database Schema

The system includes tables for:
- Profiles (Users)
- Students
- Teachers
- Departments
- Subjects
- Enrollments
- Exams & Grades
- Attendance
- Payments
- Timetables
- Announcements

## API Routes

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Student Routes
- `GET /api/student/profile` - Get student profile
- `GET /api/student/grades` - Get student grades
- `GET /api/student/attendance` - Get attendance
- `GET /api/student/payments` - Get payment status

### Teacher Routes
- `GET /api/teacher/subjects` - Get assigned subjects
- `GET /api/teacher/students` - Get enrolled students
- `POST /api/teacher/attendance` - Mark attendance
- `POST /api/teacher/grades` - Submit grades

### Admin Routes
- `GET /api/admin/students` - Get all students
- `GET /api/admin/teachers` - Get all teachers
- `POST /api/admin/user` - Create user
- `PUT /api/admin/user/:id` - Update user
- `DELETE /api/admin/user/:id` - Delete user

## Technologies Used

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Styling:** Tailwind CSS
- **UI Components:** Lucide React Icons
- **State Management:** Zustand
- **Notifications:** React Hot Toast
- **Date Handling:** date-fns

## Troubleshooting

### Database Connection Issues

Ensure your Supabase URL and keys are correct in `.env.local`

### Authentication Errors

Check that email/password authentication is enabled in Supabase

### Image Upload Issues

Verify the `profiles` storage bucket exists and policies are configured

## Security Considerations

✅ Environment variables never exposed
✅ Row-level security on all tables
✅ Password hashing via Supabase Auth
✅ HTTPS enforced in production
✅ CORS properly configured
✅ SQL injection prevention via parameterized queries

## Performance Optimization

✅ Database indexes on frequently queried columns
✅ Image optimization with next/image
✅ Code splitting and lazy loading
✅ Caching strategies
✅ CDN for static assets

## Support

For issues or questions:
1. Check the GitHub Issues
2. Review the documentation
3. Contact the development team

## License

All rights reserved © 2026 SAVA Technical Institute
