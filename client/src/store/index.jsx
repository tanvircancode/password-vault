import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:null,
  token:null,
  loading:false,
  selectMenu:{menuType:'', typeValue:''},
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
    setSelectMenu: (state, action) => {
      state.selectMenu.menuType = action.payload.menuType;
      state.selectMenu.typeValue = action.payload.typeValue;
    },
  },
})

export const { setLogin, setLogout,setFolders ,setOrganizations, setSelectMenu} = vaultSlice.actions;

export default vaultSlice.reducer