# 🎉 Event Management System

A full-stack event management system for organizational use, built with Node.js, Express, PostgreSQL, and React.

---

## 🔧 Tech Stack

- **Frontend:** React, Axios, React Router  
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **Deployment:**  
  - Backend: Railway  
  - Frontend: Netlify  

---

## 🚀 Live Demo & Repository

- **Frontend Live:** https://event-manager-ceo.netlify.app  
- **GitHub Repo:** https://github.com/pritam499/event-management-software  

---

## 🛠️ Setup Instructions

Open a terminal and run:

```bash
# Clone the repo
git clone https://github.com/pritam499/event-management-software.git
cd event-management-software

# Setup backend
cd backend
cp .env.example .env    # fill in your env vars
npm install
npm run dev             # runs at http://localhost:5000

# In a new terminal, setup frontend
cd ../frontend
npm install
npm run start           # runs at http://localhost:3000
