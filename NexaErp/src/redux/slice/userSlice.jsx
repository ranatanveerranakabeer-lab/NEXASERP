import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  result: [],
  currentUser: null,
  tenants: [],
  isLoading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoading = true
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      state.currentUser = action.payload
    },
    setTenantsForLogin: (state, action) => {
      state.tenants = action.payload
    },
    getAllUsers: (state) => {
      state.isLoading = true
    },
    createUser: (state) => {
      state.isLoading = true
    },
    updateUser: (state) => {
      state.isLoading = true
    },
    deleteUser: (state) => {
      state.isLoading = true
    },
    setUser: (state) => {
      state.isLoading = true
    },

    setAllUsers: (state, action) => {
      state.result = action.payload || []
      state.isLoading = false
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    },
    createUserCompleted: (state, action) => {
      state.result.unshift(action.payload)
      state.isLoading = false
    },
    updateUserCompleted: (state, action) => {
      const index = state.result.findIndex((x) => x.id === action.payload.id)
      if (index !== -1) state.result[index] = action.payload
      state.isLoading = false
    },
    deleteUserCompleted: (state, action) => {
      state.result = state.result.filter((x) => x.id !== action.payload)
      state.isLoading = false
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const {
  getAllUsers,
  setAllUsers,
  setSelectedUser,
  createUser,
  updateUser,
  setUser,
  deleteUser,
  createUserCompleted,
  updateUserCompleted,
  deleteUserCompleted,
  setIsLoading,
  loginUser,
  loginSuccess,
  setTenantsForLogin,
} = userSlice.actions

export default userSlice.reducer
