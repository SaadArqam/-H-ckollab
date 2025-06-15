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
Central space for updates, tasks, and filesr Team Collaboration (Planned)

---

## 🚀 Getting Started

### ⚙️ Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (local or hosted)
- Clerk project API keys (for authentication)

---

## 🔄 Installation

### 1. Clone the repository

```bash
git clone https://github.com/nst-sdc/-H-ckollab.git
cd  -H-ckollab 
```
2. Install Frontend Dependencies

```bash
cd frontend
npm install
```
3. Install Backend Dependencies
```bash
cd ../backend
npm install
```
4. Configure Environment Variables
Each contributor must create their own .env file inside the backend/ directory (do not commit this file).
```bash
```bash
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/hackollab"
PORT=4000
```
Replace <username> and <password> with your local PostgreSQL credentials.
```
➤ Create .env:
🏃‍♂️ Running the Application
Frontend
```bash
cd frontend
npm run start
```
Backend
```bash
cd backend
# For development with auto-restart:
npm run dev

# For production:
npm start

```

🤝 Contributing
Fork the repo

Create your feature branch
```bash
git checkout -b  yourbranchname
```
Commit your changes
```bash
git commit -m 'Add some amazing feature'
```
Push to the branch
```bash
git push origin yourbranchname
```
Open a Pull Request


