# H@ckollab

A full-stack collaboration platform that empowers students to effortlessly find and team up with ideal collaborators for hackathons and project-based learning. Built with React for the frontend and Node.js/Express with PostgreSQL for the backend.

---

## 🔧 Tech Stack

**Frontend**
- React.js
- React Router DOM
- Tailwind CSS
- Clerk (Authentication)
- React Context (Global State)

**Backend**
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Dotenv (Environment management)
- CORS & JSON Middleware

**Tools**
- Git + GitHub (Version Control)
- Vercel (Frontend Hosting)
- Render / Railway (Backend Hosting)
- PostgreSQL via Neon or Local DB
- Prisma Studio (DB Viewer)

---

## 📸 Features (MVP)

🔐 User Authentication (via Clerk)
Secure sign-up & login with Clerk (OAuth-ready)

🧑‍💻 Developer Profiles
Showcase skills, GitHub, portfolio & availability

🔍 Explore & Filter Profiles
Search users by tech stack, experience, or interest

📢 Post Projects
Share project idea, required tech, and roles open

🤝 One-Click Invites
Invite users to collaborate directly from profiles

📬 In-App Messaging (Planned)
Connect with teammates after joining a project

🧭 Project Dashboard (Planned)
Central space for updates, tasks, and files

---

## 🚀 Getting Started

### ⚙️ Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (local or hosted)
- Clerk account and API keys
- Git

### 🔄 Installation

1. **Clone the repository**
```bash
git clone https://github.com/nst-sdc/-H-ckollab.git
cd -H-ckollab
```

2. **Set up the Backend**
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following variables:
```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/hackollab"

# Clerk Authentication
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

3. **Set up the Frontend**
```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory with the following variables:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000
```

4. **Database Setup**
- Create a PostgreSQL database named `hackollab`
- Update the `DATABASE_URL` in your backend `.env` file with your database credentials
- Run Prisma migrations:
```bash
cd backend
npx prisma migrate dev
```

5. **Running the Application**

Start the backend server:
```bash
cd backend
npm run dev
```

In a new terminal, start the frontend:
```bash
cd frontend
npm run start
```

The application should now be running at:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

### 🔑 Getting Clerk API Keys

1. Sign up for a Clerk account at https://clerk.dev
2. Create a new application
3. Go to API Keys in your Clerk dashboard
4. Copy the `Publishable Key` and `Secret Key`
5. Add these keys to your respective `.env` files

### 🗄️ Database Setup

1. Install PostgreSQL locally or use a cloud service like Neon
2. Create a new database named `hackollab`
3. Update the `DATABASE_URL` in your backend `.env` file
4. Run Prisma migrations to set up the database schema

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/amazing-feature
```
3. Commit your changes:
```bash
git commit -m 'Add some amazing feature'
```
4. Push to the branch:
```bash
git push origin feature/amazing-feature
```
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.


