A sleek web application built on [Next.js](https://nextjs.org) featuring user regisration and user authentication, secure password handling, and on-the-fly validation.
This is a  project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- 🔐 User Authentication (Sign up, Login, Logout)
- 🚨 Form Validation
- 🔒 Secure Password Handling with bcrypt
- 📱 Responsive Design

## Technologies Used

- [Next.js 15](https://nextjs.org/) - Full-stack framework
- [React 19](https://react.dev/) - UI framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - MongoDB Modeling
- [TailwindCSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Password hashing


## Getting Started

### Prerequisites

- Node.js 18.x or later
- MongoDB Atlas account or MongoDB Compass

### Environment Setup

Open the terminal and clone this GitHub repository locally at a desired location.

```bash 
git clone https://github.com/RukshS/SpiritX_Eternal_Coders_01.git
```

Change into the cloned directory.

```bash
cd SpiritX_Eternal_Coders_01
git checkout frontend-change
```

Create a .env file in the root of the project directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string/database_name
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:your_port_number (default 3000)
```

### Installing dependencies

```bash
# Install necessary dependencies
npm install
```

 
### Running the application

```bash
# Development mode with Turbopack (Fast Refresh)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

<pre>
SpiritX_Eternal_Coders_01/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.js
│   │   ├── register/
│   │   │   └── route.js
│   │   └── userExists/
│   │       └── route.js
│   ├── dashboard/
│   │   └── page.jsx
│   ├── login/
│   │   └── page.jsx
│   ├── register/
│   │   └── page.jsx
│   ├── globals.css
│   ├── layout.js
│   ├── page.jsx
│   └── Providers.js
├── components/
│   ├── LandingPage.jsx
│   ├── LoginForm.jsx
│   ├── RegisterForm.jsx
│   └── UserInfo.jsx
├── lib/
│   └── mongodb.js
├── models/
│   └── user.js
├── README.md
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── tailwind.config.js
</pre>

## Implementation according to Guidelines

The application implements a comprehensive authentication system staisfying all the requirements as in the guidelines:

1. **Registration**:
   - Form validation with real-time feedback on [Signup](/app/register/page.tsx) page
   - Password strength requirements (length, special chars, case mixing)
   - User data stored in MongoDB with [bcrypt](https://www.npmjs.com/package/bcryptjs) password hashing
   - API endpoint at [/api/register](/app/api/regis/route.ts)

2. **Login**:
   - Credential validation on [Login](/app/login/page.tsx) page with NextAuth
   - Password verification using [bcrypt](https://www.npmjs.com/package/bcryptjs)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

