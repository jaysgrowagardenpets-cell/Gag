# Firebase Authentication Setup

This guide will help you set up Firebase Authentication for your Elder Strawberry Garden website.

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "elder-strawberry-garden")
4. Follow the setup wizard

## 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Optionally enable other providers like Google, Facebook, etc.

## 3. Get Your Firebase Configuration

1. In your Firebase project, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click "Add app" and select the web icon (</>)
5. Register your app with a nickname
6. Copy the Firebase configuration object

## 4. Configure Your App

### ✅ Already Configured!

Your Firebase configuration is already set up in `app/lib/firebase.ts` with your project credentials:

- **Project ID**: growagarden-24b76
- **Auth Domain**: growagarden-24b76.firebaseapp.com
- **Storage Bucket**: growagarden-24b76.firebasestorage.app

### Optional: Environment Variables

If you want to use environment variables instead of hardcoded values:

1. Create a `.env` file in your project root:

```bash
VITE_FIREBASE_API_KEY=AIzaSyBuB-rAJZk5PBV7JBxITv_L08i6ISmdk-I
VITE_FIREBASE_AUTH_DOMAIN=growagarden-24b76.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=growagarden-24b76
VITE_FIREBASE_STORAGE_BUCKET=growagarden-24b76.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=507703388914
VITE_FIREBASE_APP_ID=1:507703388914:web:f34c904134a027b7d5fe6b
VITE_FIREBASE_MEASUREMENT_ID=G-ZEHZYGQS3C
```

2. The app will automatically use these environment variables if they exist

## 5. Test the Authentication

1. Start your development server: `npm run dev`
2. Navigate to your website
3. Click "Sign Up" to create a new account
4. Try signing in with your credentials
5. Check the Firebase Console to see registered users

## 6. Security Rules (Optional)

For production, consider setting up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Features Included

✅ Email/Password Authentication
✅ User Registration
✅ User Login
✅ User Logout
✅ Password Reset
✅ Protected Routes
✅ User Profile Management
✅ Dashboard for Authenticated Users
✅ Responsive Design
✅ Elder Strawberry Theme Integration

## Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/invalid-api-key)"**
   - Check that your API key is correct in the configuration

2. **"Firebase: Error (auth/domain-not-authorized)"**
   - Add your domain to the authorized domains in Firebase Console > Authentication > Settings

3. **"Firebase: Error (auth/operation-not-allowed)"**
   - Enable Email/Password authentication in Firebase Console

4. **Environment variables not loading**
   - Make sure your `.env` file is in the project root
   - Restart your development server after adding environment variables

## Next Steps

- Set up Firestore for user data storage
- Add user profile management
- Implement order history
- Add social authentication (Google, Facebook, etc.)
- Set up email verification
- Add password strength requirements

## Support

If you encounter any issues, check the [Firebase Documentation](https://firebase.google.com/docs) or the [React Router Documentation](https://reactrouter.com/).
