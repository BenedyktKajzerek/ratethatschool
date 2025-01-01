import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { UserModel } from "@/types/firestoreModels";

const registerUser = async (email: string, password: string) => {
  try {
    // Register user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    // Get user information
    const user = userCredential.user;

    if (!user.email) {
      throw new Error("Email is missing for the registered user.");
    }

    // Set user information
    const newUser: UserModel = {
      email: user.email,
      createdAt: new Date(),
      role: "user",
    };

    // Save user data in Firestore
    await setDoc(doc(db, "users", user.uid), newUser);

    return user;
  } catch (error) {
    console.log("Error registering user:", error);
    throw error;
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.log("Error logging in user:", error);
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

export { registerUser, loginUser, logoutUser };
