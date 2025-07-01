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
exit               # leaves the bash shell
code README.md     # or vim README.md, nano README.md, etc.

## ✅ Features Implemented
🔐 User Authentication (Login, Signup)

📋 Event Submission & Listing

- Create Event (Employee, CMO)
- Update Event (CMO → CEO)

## ✅ Approval Workflow
Employee → CMO → CEO

📧 Email Notifications on approval

🗣️ Feedback Collection post event

⏰ Scheduled Jobs for feedback reminders (using node-cron)

👥 Role-Based Dashboards & permissions

## 📌 Assumptions
- Email notifications use a placeholder/mock service in development
- Admin roles (CMO/CEO) are predefined
- Feedback reminders run daily via node-cron

## 🧩 Pending / Future Improvements
- 📝 Add audit logs for approval history
- 📎 Support file attachments for events
- ✉️ Enhance email service with templates & HTML formatting
