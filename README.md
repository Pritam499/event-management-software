# 🎉 Event Management System

A full-stack Event Management system for organizational use, built using **Node.js**, **Express**, **PostgreSQL**, and **React**.

---

## 🚀 Live Demo

- **Frontend:** https://event-manager-ceo.netlify.app  
- **Repository:** [GitHub - pritam499/event-management-software](https://github.com/pritam499/event-management-software)

---

## 🔧 Tech Stack

- **Frontend:** React, Axios, React Router  
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **Deployment:**  
  - Backend: Railway  
  - Frontend: Netlify

---

## 🛠️ Setup Instructions

### Backend Setup

1. Open terminal and navigate to the backend folder:  
   `cd backend`

2. Copy the environment file:  
   `cp .env.example .env`  
   _Then fill in your environment variables._

3. Install dependencies:  
   `npm install`

4. Start the backend server:  
   `npm run dev`  
   The backend will run on `http://localhost:5000`

---

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:  
   `cd frontend`

2. Install frontend dependencies:  
   `npm install`

3. Start the frontend app:  
   `npm run start`  
   The frontend will run on `http://localhost:3000`

---

## ✅ Features Implemented

- 🔐 **User Authentication** (Login, Signup)
- 📋 **Event Submission & Listing**
  - Create Event (Employee, CMO)
  - Update Event (CMO → CEO)
- ✅ **Approval Workflow**: Employee → CMO → CEO
- 📧 **Email Notifications** on approval
- 🗣️ **Feedback Collection** post-event
- ⏰ **Scheduled Jobs** for feedback reminders using `node-cron`
- 👥 **Role-Based Dashboards** and permission handling

---

## 📌 Assumptions

- Email notifications use a placeholder/mock service during development
- Admin roles (CMO, CEO) are predefined in the system
- Feedback reminders run daily via scheduled jobs (`node-cron`)

---

## 🧩 Pending / Future Improvements

- 📝 Add audit logs to track approval history
- 📎 Allow file attachments with events
- ✉️ Improve email service with rich templates and formatting
