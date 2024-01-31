import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:null,
  token:null,
  loading:false,
  organizations:[],
  folders:[],
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
    setFolders: (state, action) => {
      state.folders = action.payload.folders;
    },
    setOrganizations: (state, action) => {
      state.organizations = action.payload.organizations;
    },
  },
})

export const { setLogin, setLogout,setFolders ,setOrganizations} = vaultSlice.actions;

export default vaultSlice.reducer