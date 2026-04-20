import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  company: null,
  profile: null,
  isLoading: false,
}

const companySlice = createSlice({
  name: 'CompanySetting',
  initialState,
  reducers: {
    getCompany: (state, action) => {
      state.isLoading = true
    },
    getProfile: (state, action) => {
      state.isLoading = true
    },
    saveCompany: (state, action) => {
      state.isLoading = true
    },
    saveProfile: (state, action) => {
      state.isLoading = true
    },

    setCompany: (state, action) => {
      state.company = action.payload || null
      state.isLoading = false
    },
    setProfile: (state, action) => {
      state.profile = action.payload || null
      state.isLoading = false
    },
    saveProfileCompleted: (state, action) => {
      state.profile = action.payload
      state.isLoading = false
    },
    saveCompanyCompleted: (state, action) => {
      state.company = action.payload
      state.isLoading = false
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const {
  getCompany,
  saveCompany,
  setCompany,
  saveCompanyCompleted,
  getProfile,
  saveProfile,
  setProfile,
  saveProfileCompleted,
  setIsLoading,
} = companySlice.actions

export default companySlice.reducer
