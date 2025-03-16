import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { UserModel } from "@/types/firestoreModels";

const actionCodeSettings = {
  // URL you want to redirect back to
  url: "https://ratethatschool.com/auth/finishSignIn",
  handleCodeInApp: true,
};

const sendEmailLink = async (email: string) => {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
    console.log("Email link sent successfully.");
  } catch (error) {
    console.error("Error sending email link:", error);
    throw error;
  }
};

const signInWithEmail = async (email: string, emailLink: string) => {
  try {
    if (isSignInWithEmailLink(auth, emailLink)) {
      const result = await signInWithEmailLink(auth, email, emailLink);
      const user = result.user;
      const additionalUserInfo = getAdditionalUserInfo(result);

      // Add user to Firestore if it's a new user
      if (additionalUserInfo?.isNewUser && user?.uid) {
        const newUser: UserModel = {
          email: user.email ?? "",
          createdAt: new Date(),
        };

        await setDoc(doc(db, "users", user.uid), newUser);
      }

      console.log("Signed in successfully with email link.");
      return user;
    } else {
      throw new Error("Invalid email link.");
    }
  } catch (error) {
    console.error("Error singing in with email link:", error);
    throw error;
  }
};

const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const additionalUserInfo = getAdditionalUserInfo(result);

    // Add user to Firestore if it's a new user
    if (additionalUserInfo?.isNewUser && user?.uid) {
      const newUser: UserModel = {
        email: user.email ?? "",
        createdAt: new Date(),
      };
      await setDoc(doc(db, "users", user.uid), newUser);
    }

    console.log("Signed in successfully with Google.");
    return user;
  } catch (error) {
    console.error("Error singing in with Google:", error);
    throw error;
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Error signing out:", error);
  }
};

export { sendEmailLink, signInWithEmail, signInWithGoogle, logoutUser };
