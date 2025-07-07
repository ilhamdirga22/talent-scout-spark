import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/axios";

interface User {
  id: number;
  fullname: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface RegisterPayload {
  fullname: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface APIError {
  message: string;
}

export const registerUser = createAsyncThunk<
  { message: string },
  RegisterPayload,
  { rejectValue: APIError }
>("auth/registerUser", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post<{ message: string }>(
      `/api/auth/register`,
      payload
    );
    return response.data;
  } catch (err) {
    const error = err as { response?: { data?: APIError } };
    return rejectWithValue(
      error.response?.data || { message: "Registration failed" }
    );
  }
});

export const loginUser = createAsyncThunk<
  { token: string; user: User },
  LoginPayload,
  { rejectValue: APIError }
>("auth/loginUser", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post<{ token: string; user: User }>(
      `/api/auth/login`,
      payload
    );
    return response.data;
  } catch (err) {
    const error = err as { response?: { data?: APIError } };
    return rejectWithValue(error.response?.data || { message: "Login failed" });
  }
});

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
