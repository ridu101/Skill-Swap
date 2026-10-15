# SkillSwap — Skill Sharing Platform

**SkillSwap** is a skill-sharing platform where people can explore skills, discover learning opportunities, and connect with a community of learners.

The platform provides a user-friendly interface with authentication, protected routes, skill details, and profile management.

## ✨ Key Features

- **Skill Discovery:** Explore different skills and learning opportunities.
- **User Authentication:** Sign up and log in using Firebase Authentication.
- **Google Login:** Sign in using a Google account.
- **Facebook Login:** Sign in using a Facebook account.
- **Protected Routes:** Restrict access to selected pages for authenticated users.
- **Skill Details:** View detailed information about individual skills.
- **Profile Management:** View and update your profile name and photo URL.
- **Password Reset:** Reset forgotten passwords through email.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- **Toast Notifications:** Display success and error messages using React Hot Toast.
- **Hero Slider:** Create an interactive hero section using Swiper.js.
- **Scroll Animations:** Add scroll-based animations using AOS.
- **Entrance Animations:** Use Animate.css for subtle UI animations.
- **Modern UI:** Clean layouts with Tailwind CSS and DaisyUI.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Development server and build tool |
| React Router | Client-side routing |
| Firebase Authentication | User authentication |
| Tailwind CSS | Styling |
| DaisyUI | UI components |
| React Hot Toast | Notifications |
| Swiper.js | Hero slider |
| AOS | Scroll animations |
| Animate.css | Entrance animations |
| Lucide React | Icons |
| Vercel | Deployment |

> Note: Swiper.js, AOS, and Animate.css are planned features unless they have been installed and integrated into the current project.

## 📁 Project Structure

```text
Skill-Swap/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── firebase/
│   │   └── firebase.config.js
│   ├── hooks/
│   │   └── PrivateRoute.jsx
│   ├── layouts/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Profile.jsx
│   │   ├── SkillDetails.jsx
│   │   └── NotFound.jsx
│   ├── routes/
│   │   └── Router.jsx
│   ├── utils/
│   │   └── authErrors.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .gitignore
├── package.json
└── README.md
```

*The folder structure may vary slightly depending on the current implementation.*

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ridu101/Skill-Swap.git
```

### 2. Navigate to the Project

```bash
cd Skill-Swap
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Firebase

Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).

Enable the authentication providers you want to use, such as Email/Password and Google. Configure Facebook authentication if you intend to support it.

Create a `.env` file in the project root and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Update `src/firebase/firebase.config.js` to read these environment variables if it does not already do so.

**Important:** Never commit your `.env` file or private service-account credentials to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL shown in your terminal.

### 6. Build for Production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🔐 Authentication

SkillSwap uses Firebase Authentication for user account management.

Supported authentication functionality includes:

- Email and password registration
- Email and password login
- Google sign-in
- Facebook sign-in
- Password reset
- Profile name and photo updates
- Protected routes for authenticated users

## 🌐 Deployment

The project can be deployed to [Vercel](https://vercel.com/).

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the required Firebase environment variables in Vercel project settings.
4. Deploy the project.
5. Verify authentication and protected routes on the deployed website.

## 🎯 Project Goals

SkillSwap aims to make skill discovery and learning opportunities more accessible through a simple, responsive, and user-friendly web application.

## 👨‍💻 Developer

**Ridwan Ahmed**

- GitHub: [@ridu101](https://github.com/ridu101)

---

⭐ If you find this project interesting, consider giving the repository a star!