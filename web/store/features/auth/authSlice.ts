import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User,updateProfile } from "firebase/auth";
import { auth, googleProvider } from '@/lib/firebase';

interface AuthState {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

// Initialize state with localStorage user if available
if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    initialState.user = JSON.parse(storedUser);
  }
}

export const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async (_, thunkAPI) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const { displayName, email, uid, photoURL } = result.user;
    const userData = { displayName, email, uid, photoURL }; // Store essential data only
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loginWithEmail = createAsyncThunk('auth/loginWithEmail', async ({ email, password }: { email: string; password: string }, thunkAPI) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const { uid, email: userEmail, displayName, photoURL } = result.user;
    const user = { uid, email: userEmail, displayName, photoURL };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const registerWithEmail = createAsyncThunk(
  'auth/registerWithEmail',
  async (
    { email, password, name }: { email: string; password: string; name: string },
    thunkAPI
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      const { uid, email: userEmail, displayName, photoURL } = result.user;
      const user = {
        uid,
        email: userEmail,
        displayName: name || displayName, 
        photoURL,
      };

      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await signOut(auth);
    localStorage.removeItem('user');
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.fulfilled, (state, action: PayloadAction<AuthState['user']>) => {
        state.user = action.payload;
      })
      .addCase(loginWithEmail.fulfilled, (state, action: PayloadAction<AuthState['user']>) => {
        state.user = action.payload;
      })
      .addCase(registerWithEmail.fulfilled, (state, action: PayloadAction<AuthState['user']>) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.status = 'succeeded';
          state.error = null; 
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action: PayloadAction<string>) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      );
  },
});

export default authSlice.reducer;