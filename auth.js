import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";

// Authentication Process

// Register user
 const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(email, password);
    console.log('User registered:', userCredential.user);
    await addData('users', {
      email,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error registering user:', error.message);
  }
};

// Signin user
const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(email, password);
    console.log('User signed in:', userCredential.user);
  } catch (error) {
    console.error('Error signing in user:', error.message);
  }
};

// Signout user
const signOutUser = async () => {
  try {
    await signOut();
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out user:', error.message);
  }
};

 export { registerUser, signInUser, signOutUser };