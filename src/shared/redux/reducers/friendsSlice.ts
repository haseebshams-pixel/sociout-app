import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  friends: [],
};

export const friendsReducer = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends: (state, action) => {
      let tempObj = {...state, ...action.payload};
      return tempObj;
    },
    resetFriends: state => initialState,
  },
});

export const {setFriends, resetFriends} = friendsReducer.actions;

export default friendsReducer.reducer;
