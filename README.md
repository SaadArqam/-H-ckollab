# H@ckollab

A modern full-stack platform for students to discover, connect, and collaborate on hackathons and project-based learning. H@ckollab streamlines team formation, project posting, and skill-based matchmaking, empowering real teams to build and launch together.

---

## 🚀 Overview

H@ckollab is a collaboration hub designed for hackathons and student projects. It enables users to:
- Create rich developer profiles
- Find and join projects or hackathons
- Build teams based on skills and interests
- Track collaboration status and manage invites

Built with React (frontend), Node.js/Express (backend), Prisma ORM, and PostgreSQL. Authentication is powered by **Firebase Auth** for secure, scalable sign-in.

---

## 🔥 Key Features

- **🔐 Secure Authentication:** Sign up and log in with Firebase Auth (Google, email, etc.)
- **🧑‍💻 Developer Profiles:** Showcase skills, experience, social links, and featured projects
- **🔍 Explore & Filter:** Search users by tech stack, experience, or availability
- **📢 Post & Join Projects:** Start new projects or join existing ones, specify tech and roles needed
- **🤝 Team Invites:** Invite users to collaborate, accept/decline invites, and track team status
- **📊 Dashboard:** View your projects, collaborations, and pending invites in one place
- **📝 Profile Editing:** Update your info, skills, and project highlights anytime
- **🌐 Hackathon Directory:** Browse and join real hackathons (if enabled)

---

## 🧭 User Flow

1. **Sign Up / Log In**
   - Authenticate securely with Firebase Auth
2. **Create Your Profile**
   - Fill out your skills, academic info, interests, and social links
   - Save to unlock full platform features
3. **Explore Users & Projects**
   - Use filters to find collaborators or projects matching your interests
4. **Post a Project or Hackathon**
   - Describe your idea, required tech, and open roles
5. **Build Your Team**
   - Invite users to join, or accept invites from others
   - Track team size and status on your dashboard
6. **Collaborate & Launch**
   - Work together, update project status, and showcase your work

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router DOM
- Tailwind CSS
- Firebase Auth
- React Context API

**Backend:**
- Node.js & Express.js
- Prisma ORM
- PostgreSQL
- Dotenv, CORS, JSON Middleware

**DevOps & Tools:**
- Git + GitHub
- Vercel (Frontend Hosting)
- Render/Railway (Backend Hosting)
- Neon/PostgreSQL Cloud or Local
- Prisma Studio (DB Viewer)

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- PostgreSQL database (local/cloud)
- Firebase project & API keys
- Git

### Installation

1. **Clone the repository**
   ```bash
git clone https://github.com/nst-sdc/-H-ckollab.git
cd -H-ckollab
```

2. **Backend Setup**
   ```bash
cd backend
npm install
```
   Create a `.env` file in `backend/`:
   ```env
PORT=4000
NODE_ENV=development
DATABASE_URL="postgresql://username:password@localhost:5432/hackollab"
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FRONTEND_URL=http://localhost:3000
```

3. **Frontend Setup**
   ```bash
cd ../frontend
npm install
```
   Create a `.env` file in `frontend/`:
   ```env
REACT_APP_API_URL=http://localhost:4000
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

4. **Database Setup**
   - Create a PostgreSQL database named `hackollab`
   - Update `DATABASE_URL` in your backend `.env`
   - Run migrations:
   ```bash
cd backend
npx prisma migrate dev
```

5. **Run the App**
   - Start backend:
   ```bash
cd backend
npm run dev
```
   - Start frontend (in a new terminal):
   ```bash
cd frontend
npm start
```
   - Visit:
     - Frontend: http://localhost:3000
     - Backend: http://localhost:4000

---

## 👩‍⚖️ Judging & User Experience

- **Fast Onboarding:** New users can sign up and create a profile in minutes
- **Intuitive Navigation:** Modern, responsive UI with clear calls to action
- **Real-Time Updates:** Project/team status updates instantly across dashboard and explore
- **Robust Error Handling:** Friendly error messages and loading states
- **Mobile-Ready:** Fully responsive for all devices

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit and push: `git commit -m 'Add feature' && git push origin feature/your-feature`
4. Open a Pull Request

---

## 📝 License

MIT License. See [LICENSE](LICENSE) for details.
