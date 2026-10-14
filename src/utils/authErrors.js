
export function getAuthErrorMessage(error) {
    const code = error?.code;

    const messages = {
        "auth/email-already-in-use":
            "এই email দিয়ে আগে থেকেই account তৈরি আছে।",
        "auth/invalid-email":
            "সঠিক email address লিখো।",
        "auth/weak-password":
            "আরও শক্তিশালী password দাও। কমপক্ষে ৬ অক্ষর ব্যবহার করো।",
        "auth/invalid-credential":
            "Email অথবা password সঠিক নয়।",
        "auth/user-not-found":
            "এই email দিয়ে কোনো account পাওয়া যায়নি।",
        "auth/wrong-password":
            "Password সঠিক নয়। আবার চেষ্টা করো।",
        "auth/too-many-requests":
            "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করো।",
        "auth/popup-closed-by-user":
            "Google login সম্পন্ন হওয়ার আগেই popup বন্ধ হয়েছে।",
        "auth/popup-blocked":
            "Browser popup block করেছে। Popup permission চালু করো।",
        "auth/cancelled-popup-request":
            "Login request বাতিল হয়েছে। আবার চেষ্টা করো।",
        "auth/network-request-failed":
            "Internet connection পরীক্ষা করে আবার চেষ্টা করো।",
        "auth/unauthorized-domain":
            "এই domain Firebase Authentication-এ অনুমোদিত নয়।",
        "auth/operation-not-allowed":
            "Firebase Console-এ এই login method চালু করতে হবে।",
        "auth/account-exists-with-different-credential":
            "এই email অন্য login method দিয়ে নিবন্ধিত।",
    };

    return (
        messages[code] ||
        "কাজটি সম্পন্ন হয়নি। আবার চেষ্টা করো। সমস্যা চলতে থাকলে Firebase settings পরীক্ষা করো।"
    );
}
