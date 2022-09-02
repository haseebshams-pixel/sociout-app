import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  user: null,
  isLoggedIn: false,
  token: null,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      let tempObj = {...state, ...action.payload};
      return tempObj;
    },
    resetUser: () => initialState,
  },
});

export const {setUser, resetUser} = userReducer.actions;

export default userReducer.reducer;
