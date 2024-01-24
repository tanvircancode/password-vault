import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:null,
  token:null,
  loading:false,
  orgData:"",
  folderData:"",
}

export const vaultSlice = createSlice({
  name: 'vault',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      
      state.user = null;
      state.token = null;
    },
  },
})

export const { setLogin, setLogout } = vaultSlice.actions;

export default vaultSlice.reducer