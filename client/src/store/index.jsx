import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:null,
  token:null,
  selectMenu:{menuType:'', typeValue:''},
  organizations:[],
  folders:[],
  reloadPage:false,
  makeBlur: false,
  orgAndFolderLoading: true,
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
    setOrgAndFolderLoading: (state, action) => {
      state.orgAndFolderLoading = action.payload.orgAndFolderLoading;
    },
    
    setOrganizations: (state, action) => {
      state.organizations = action.payload.organizations;
    },
    setSelectMenu: (state, action) => {
      state.selectMenu.menuType = action.payload.menuType;
      state.selectMenu.typeValue = action.payload.typeValue;
    },
    setReloadPage:(state, action) => {
      state.reloadPage = action.payload.reloadPage;
    },
    setMakeBlur: (state, action) => {
      state.makeBlur = action.payload.makeBlur;
    },
  },
})

export const { setLogin, setLogout,setFolders ,setOrganizations,setSelectMenu, setOrgAndFolderLoading, setReloadPage,setMakeBlur} = vaultSlice.actions;

export default vaultSlice.reducer