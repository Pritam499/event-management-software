# 🎉 Event Management System

A full-stack Event Management system for organizational use, built using **Node.js**, **Express**, **PostgreSQL**, and **React**.

---

## 🔧 Tech Stack

**Frontend**  
- React  
- Axios  
- React Router

**Backend**  
- Node.js  
- Express.js

**Database**  
- PostgreSQL

**Deployment**  
- 🚀 Backend: [Railway](https://railway.app)  
- 🌐 Frontend: [Netlify](https://netlify.com)

---

## 🚀 Live Demo

- 🌐 **Frontend**: [event-manager-ceo.netlify.app](https://event-manager-ceo.netlify.app)  
- 📦 **Repository**: [GitHub - pritam499/event-management-software](https://github.com/pritam499/event-management-software)

---

## 🛠️ Setup Instructions

### 🔙 Backend

```bash
cd backend
cp .env.example .env    # Fill in the environment variables
npm install             # Install dependencies
npm run dev             # Start the development server

### 🎨 Frontend
cd frontend
cp .env.example .env    # Add your backend API URL
npm install             # Install dependencies
npm start               # Start the React app

## ✅ Features Implemented
🔐 User Authentication (Login, Signup)

📋 Event Submission and Listing

Create Event (Employee, CMO)

Update Event (CMO → CEO)

## ✅ Approval Workflow (Employee → CMO → CEO)

📧 Email Notifications on Approval

🗣️ Feedback Collection Post Event

⏰ Scheduled Jobs for Feedback Reminders

👥 Role-Based Dashboards and Permissions

## 📌 Assumptions
Email notifications use a placeholder/mock service for development

Admin roles (CMO/CEO) are predefined in the system

Scheduler for feedback reminders uses node-cron running daily

🧩 Pending / Future Improvements
📝 Audit logs for approval history

📎 File attachments for events

✉️ Enhanced email service with templates and formatting
