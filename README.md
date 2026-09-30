# FoodBridge – Surplus Food Donation Platform

FoodBridge is a full-stack MERN application that connects restaurants having surplus food with NGOs that can distribute it to people in need. The platform helps reduce food wastage while creating measurable social and environmental impact.

## Live Demo

- Frontend: https://foodbridge-q7qv.onrender.com
- Backend API: https://foodbridge-backend-99ok.onrender.com


---

## Problem Statement

A huge amount of edible food from restaurants and hotels gets wasted every day while many people struggle with food insecurity.

FoodBridge bridges this gap by providing a digital platform where:

- Restaurants can donate surplus food
- NGOs can discover nearby donations
- Food redistribution becomes faster and more efficient

---

## Features

### Authentication

- Secure user registration and login
- JWT based authentication
- Role based access control:
  - Restaurant
  - NGO

---

## Restaurant Features

- Create food donation posts
- Add:
  - Food type
  - Quantity
  - Pickup expiry time
  - Location

- View donation history
- Track donation status:
  - Posted
  - Accepted
  - Delivered

- Personal impact dashboard showing:
  - Total donations
  - Meals donated
  - CO₂ saved

---

## NGO Features

- View nearby available donations
- Smart donation recommendations
- Accept donations
- Mark donations as delivered
- Track accepted donation history

Dashboard showing:
- Total accepted donations
- Meals distributed
- Completed deliveries

---

## Location Based Matching

FoodBridge uses geospatial matching to connect NGOs with nearby restaurants.

Features:

- Browser geolocation API
- MongoDB 2dsphere indexing
- Distance calculation using coordinates
- Nearby donation filtering
- Google Maps navigation link


---

## Smart Donation Matching Algorithm

Donations are ranked based on:

- Distance between NGO and restaurant
- Food expiry urgency

Scoring:

```
score =
(distance × 0.7) +
(expiry priority × 0.3)
```

Lower score = Higher priority donation

---

## Impact Tracking

FoodBridge calculates:

- Total meals donated
- Number of successful deliveries
- CO₂ reduction estimation
- Community impact statistics

---

# Tech Stack

## Frontend

- React.js
- React Router
- Context API
- Axios
- CSS-in-JS styling
- Render deployment


## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt password hashing
- REST APIs


## Database

MongoDB Atlas

Features:
- GeoJSON location storage
- 2dsphere indexing
- Relationship mapping using references

---

# Project Structure

```
FoodBridge

├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── server.js
│
└── frontend
    └──src
        ├── components
        ├── context
        ├── layout
        ├── pages
        ├── services
        ├── App.css
        └── App.js
```

---

# Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/atishay219/FoodBridge-Zaya-nahi-Zariya-bano

cd FoodBridge
```

---

# Backend Setup

Move into backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start backend:

```bash
npm start
```

Server runs on:

```
http://localhost:5000
```

---

# Frontend Setup

Move into frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env`


Start frontend:

```bash
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# API Routes

## Authentication

Register

```
POST /api/auth/register
```

Login

```
POST /api/auth/login
```

---

## Donations

Create Donation

```
POST /api/donations
```

Get Nearby Donations

```
GET /api/donations
```

Accept Donation

```
PUT /api/donations/accept/:id
```

Mark Delivered

```
PUT /api/donations/deliver/:id
```

---

## Statistics

Restaurant Stats

```
GET /api/stats/restaurant
```

NGO Stats

```
GET /api/stats/ngo
```

Global Stats

```
GET /api/stats/global
```

---

# Deployment

Application deployed using:

- Render Static Site (Frontend)
- Render Web Service (Backend)
- MongoDB Atlas Database

Environment variables are configured securely on Render.

---

# Future Improvements

- Live delivery tracking
- Volunteer module
- Email notifications
- AI based food demand prediction
- Real-time chat between NGOs and restaurants

---

# Developer

Developed by  
- **Atishay Jain**
---
