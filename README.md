# 🎵 Spring Music 

A modern music streaming web app built with **Next.js**, **Firebase**, and **JioSaavn API**.  
It allows users to explore songs, stream music, and manage playlists in a seamless experience.

🚀 **Live Demo:** [Click here to try it](https://spring-music-player-n27p.vercel.app)

---

## ✨ Features

- 🎧 Stream music from the **JioSaavn API**  
- 🔍 Search songs, albums, and artists in real-time  
- 🔐 User authentication (Google/Email login) via Firebase  
- 📂 Save user data & playlists with Firestore  (future implementation)
- ⚡ Super-fast rendering with Next.js   

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) + React  
- **Music API:** [JioSaavn API (Unofficial)](https://github.com/sumitkolhe/jiosaavn-api)  
- **Backend & Auth:** [Firebase](https://firebase.google.com/)  
- **Database:** Firebase Firestore  
- **Storage:** Firebase Storage  
- **Deployment:** Vercel  

---

## 📂 Project Structure

```
spring-music-web/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # Reusable UI components
│   ├── pages/           # Next.js pages (routes)
│   ├── styles/          # Global & module CSS
│   └── utils/           # Firebase & JioSaavn API helpers
├── .env.local           # Environment variables
├── package.json
└── README.md
```

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/spring-music-web.git
cd spring-music-web
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Setup Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)  
2. Create a new project  
3. Enable Authentication (Google/Email)  
4. Setup Firestore Database  
5. Setup Firebase Storage  
6. Copy your Firebase config  

### 4. Add environment variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
JIO_SAAVAN_API_BASE_URL=your-api
NEXT_PUBLIC_API_URL=your_api_url
```

### 5. Run the project locally
```bash
npm run dev
# or
yarn dev
```
Now open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📦 Deployment

### Deploy on Vercel
```bash
vercel
```

---

## ​ Contributors

A big shout-out to all the amazing people who’ve contributed to this project:

<a href="https://github.com/Satyam1923/Spring-Music-Player/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Satyam1923/Spring-Music-Player" />
</a>


## 📜 License

This project is licensed under the **MIT License**.

---
