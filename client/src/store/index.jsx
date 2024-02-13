import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    selectMenu: { menuType: "", typeValue: "" },
    organizations: [],
    folders: [],
    reloadPage: false,
    makeBlur: false,
    orgAndFolderLoading: true,
    fetchSingleItem: null,
};

export const vaultSlice = createSlice({
    name: "vault",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.folders = [];
            state.organizations = [];
            state.fetchSingleItem = null;
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
        setReloadPage: (state, action) => {
            state.reloadPage = action.payload.reloadPage;
        },
        setMakeBlur: (state, action) => {
            state.makeBlur = action.payload.makeBlur;
        },
        setFetchSingleItem: (state, action) => {
            if (action.payload === null) {
                state.fetchSingleItem = null;
            } else if (action.payload.fetchSingleItem) {
                state.fetchSingleItem = action.payload.fetchSingleItem;
            } else {
                const { propertyName, value, type } = action.payload;

                if (type === null) {
                    state.fetchSingleItem[propertyName] = value;
                } else if (type === 1) {
                    state.fetchSingleItem.login[propertyName] = value;
                } else if (type === 2) {
                    state.fetchSingleItem.card[propertyName] = value;
                } else if (type === 3) {
                    state.fetchSingleItem.identity[propertyName] = value;
                }
            }
        },
    },
});

export const {
    setLogin,
    setLogout,
    setFolders,
    setOrganizations,
    setSelectMenu,
    setOrgAndFolderLoading,
    setReloadPage,
    setMakeBlur,
    setFetchSingleItem,
} = vaultSlice.actions;

export default vaultSlice.reducer;
