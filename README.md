<<<<<<< HEAD
<<<<<<< HEAD
# Getting Started with Create React App
=======
<div align="center">
>>>>>>> e075c98adf0d318134b73a33b1774db9d057f933

# 🔥 Firebase Realtime Notes App

**A full-stack notes application powered by React & Firebase — featuring real-time sync, secure authentication, and a stunning glassmorphism UI.**

![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=for-the-badge)

[Features](#-features) · [Tech Stack](#️-tech-stack) · [Quick Start](#-quick-start) · [Firebase Setup](#-firebase-setup) · [Folder Structure](#-folder-structure) · [Roadmap](#-roadmap)

</div>

---

## ✨ Features

### 🔐 Authentication
| Feature | Description |
|---|---|
| Register | Create a new user account with email & password |
| Login / Logout | Secure session management via Firebase Auth |
| Protected Routes | Dashboard is only accessible to authenticated users |
| Update Profile | Change display name at any time |
| Update Email | Securely update the account email |
| Update Password | Change password from within the app |

### 🗒️ Notes (Firestore CRUD)
| Operation | Firebase Method |
|---|---|
| Create | `addDoc()` |
| Read (Realtime) | `onSnapshot()` |
| Update | `updateDoc()` |
| Delete | `deleteDoc()` |

> **Realtime sync** — changes made in one tab/device appear instantly everywhere, with no page refresh needed.

### 🎨 UI / UX
- Glassmorphism card design with gradient backgrounds
- Responsive notes grid that adapts to any screen size
- Smooth hover & transition animations throughout
- Toast notifications for all user actions
- Floating label inputs on auth pages
- Dynamic search — filter notes by title in real time

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React.js |
| Routing | React Router DOM |
| Styling | CSS3 (custom, no UI library) |
| Notifications | React Toastify |
| Authentication | Firebase Authentication |
| Database | Firebase Firestore |

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 16
- npm or yarn
- A Firebase project (see [Firebase Setup](#-firebase-setup))

### 1. Clone the repository

```bash
git clone <repository-url>
cd firebase-auth-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

Create `src/firebase.js` and paste your Firebase config (see [Firebase Setup](#-firebase-setup)):

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
```

### 4. Start the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

<<<<<<< HEAD
This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
# Firebase-web-app
>>>>>>> b56f63d72e2891fd5724039dd2e963efaa3a5d09
=======
## 🔥 Firebase Setup

### Step 1 — Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add Project** and follow the prompts
3. Register a **Web App** inside the project to get your config keys

### Step 2 — Enable Email/Password Authentication

```
Firebase Console → Authentication → Sign-in method → Email/Password → Enable
```

### Step 3 — Create Firestore Database

```
Firebase Console → Firestore Database → Create database → Start in production mode
```

### Step 4 — Set Firestore Security Rules

Navigate to **Firestore Database → Rules**, replace the default rules with the following, then click **Publish**:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{noteId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

> ⚠️ These rules allow any authenticated user to read and write any note. For production, consider scoping rules to `request.auth.uid == resource.data.userId`.

---

## 📂 Folder Structure

```
src/
│
├── components/
│   └── ProtectedRoute.jsx      # Redirects unauthenticated users
│
├── context/
│   └── AuthContext.jsx         # Global auth state via React Context
│
├── pages/
│   ├── Login.jsx               # Login page
│   ├── Register.jsx            # Registration page
│   ├── Dashboard.jsx           # Main notes CRUD interface
│   ├── Dashboard.css           # Dashboard-specific styles
│   └── Auth.css                # Shared auth page styles
│
├── firebase.js                 # Firebase initialization & exports
├── App.js                      # Routes & app shell
├── index.js                    # React entry point
└── index.css                   # Global styles
```

---

## 📸 Screens

| Page | Description |
|---|---|
| **Login** | Animated sign-in form with floating labels |
| **Register** | Account creation with validation |
| **Dashboard** | Real-time notes grid with search, add, edit, delete |

---

## 🗺️ Roadmap

- [x] Email/Password Authentication
- [x] Firestore CRUD with real-time sync
- [x] Protected routes
- [x] Profile / email / password updates
- [x] Search notes by title
- [ ] Dark / Light theme toggle
- [ ] Note categories & tags
- [ ] Favourite / pin notes
- [ ] Firebase Storage — image attachments
- [ ] Pagination or infinite scroll
- [ ] Framer Motion animations
- [ ] Scoped Firestore rules per user

---

## 👨‍💻 Author

Built with React + Firebase.  
Contributions, issues, and feature requests are welcome — feel free to open a PR or issue.

---

<div align="center">

If this project helped you, consider giving it a ⭐ on GitHub!

</div>
>>>>>>> e075c98adf0d318134b73a33b1774db9d057f933
