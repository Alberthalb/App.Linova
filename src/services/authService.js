import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  verifyPasswordResetCode as firebaseVerifyPasswordResetCode,
  confirmPasswordReset as firebaseConfirmPasswordReset,
} from "firebase/auth";
import { auth } from "./firebase";
import { createOrUpdateUserProfile } from "./userService";

export const registerUser = async (name, email, password) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const user = credential.user;
  if (name) {
    await updateProfile(user, { displayName: name });
  }
  await createOrUpdateUserProfile(user.uid, {
    name,
    email,
    createdAt: credential.user.metadata?.creationTime ? new Date(credential.user.metadata.creationTime) : new Date(),
  });
  return user;
};

export const loginUser = async (email, password) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
};

export const logoutUser = () => signOut(auth);

export const sendPasswordRecovery = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const verifyResetCode = (code) => firebaseVerifyPasswordResetCode(auth, code);

export const applyPasswordReset = (code, newPassword) => firebaseConfirmPasswordReset(auth, code, newPassword);
