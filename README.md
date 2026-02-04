# 🎵 Synthesia — Full Stack Music Streaming App

Synthesia is a full-stack music streaming web application that allows users to explore songs, create playlists, mark favourites, and manage profiles with secure authentication.

The project is built using a modern MERN-style architecture with a React (Vite) frontend and a Node.js + Express + MongoDB backend.

---

## 🚀 Features

- User Authentication (Signup / Login with JWT)
- Browse music tracks using external API
- Create & manage playlists
- Add / remove favourite songs
- Protected routes for authenticated users
- Profile management
- Global audio player with controls
- Responsive UI with Tailwind CSS
- RESTful backend APIs
- Environment-based configuration
- Ready for deployment

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose

---

## 📁 Project Structure
Synthesia/
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── .env
│
└── README.md



---

## ⚙️ Environment Variables

This project uses **two `.env` files** (not pushed to GitHub):

Backend/.env : 
JAMENDO_CLIENT_ID=YOUR_CLIENT_ID,
MONGO_URI=YOUR_MONGODB_URL,
JWT_SECRET=YOUR_JWT_SECRET

Frontend/.env :
VITE_JAMENDO_CLIENT_ID=YOUR_CLIENT_ID


> Frontend variables must start with `VITE_`.

---

## ▶ Run Locally

### Backend

cd Backend |
npm install |
npm run dev 

### Frontend

cd Frontend |
npm install |
npm run dev 

## 📌 Author

Omkar Shelar

Full Stack Developer | MERN Stack 





