import { create } from "zustand";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword, signOut, User, createUserWithEmailAndPassword } from "firebase/auth";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUpWithEmailAndPassword: (email: string, password: string) => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  
  login: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user });
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login error:", errorCode, errorMessage);
      throw error;
    }
  },
  
  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null });
    } catch (error: any) {
      console.error("Logout error:", error.code, error.message);
      throw error;
    }
  },

  signUpWithEmailAndPassword: async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user });
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("SignUp error:", errorCode, errorMessage);
      throw error;
    }
  }
}));

export default useUserStore;