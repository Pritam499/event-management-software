### Description: 
A full-stack Event Management system for organizational use, built using Node.js, Express, PostgreSQL, and React.

### 🔧 Tech Stack
Frontend: React, Axios, React Router

Backend: Node.js, Express.js

Database: PostgreSQL

Deployment:

Backend: Railway

Frontend: Netlify

### 🚀 Live Demo
🌐 Frontend: https://event-manager-ceo.netlify.app

📦 Repository: GitHub - pritam499/event-management-software

🛠️ Setup Instructions
### 🔙 Backend
Navigate to /backend

Copy .env.example to .env and fill in environment variables.

Install dependencies:
npm install
Run locally:
npm run dev
🎨 Frontend
Navigate to /frontend

Copy .env.example to .env and add the backend API URL.

Install dependencies:
npm install

Start the app:
npm start
### ✅ Features Implemented
User Authentication (Login, Signup)

Event Submission and Listing(Create Event - (Employee, CMO), Update Event - (CMO -> CEO))

Approval Workflow (Employee → CMO → CEO)

Email Notifications on Approval

Feedback Collection Post Event

Scheduled Jobs for Feedback Reminders

Role-based dashboards and permissions

### 📌 Assumptions
Email notifications use a placeholder/mock service for development.

Admin roles (CMO/CEO) are predefined.

Scheduler for feedback uses node-cron running daily.

### 🧩 Pending / Future Improvements

Audit logs for approval history

File attachments for events

Enhanced email service with templates

