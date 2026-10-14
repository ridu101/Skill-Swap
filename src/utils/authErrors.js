
export function getAuthErrorMessage(error) {
    const code = error?.code;

    const messages = {
        "auth/account-exists-with-different-credential":
            "This email is already registered using a different sign-in method.",

        "auth/unauthorized-domain":
            "This domain is not authorized in Firebase Authentication.",

        "auth/operation-not-allowed":
            "Facebook login is not enabled in Firebase Console.",

        "auth/invalid-credential":
            "The Facebook credential is invalid. Please check your Firebase and Meta settings.",

        "auth/popup-blocked":
            "Your browser blocked the login popup. Please allow popups and try again.",

        "auth/popup-closed-by-user":
            "The Facebook login popup was closed before sign-in was completed.",
    };

    return (
        messages[code] ||
        "কাজটি সম্পন্ন হয়নি। আবার চেষ্টা করো। সমস্যা চলতে থাকলে Firebase settings পরীক্ষা করো।"
    );
}
