import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  isDisplay: true,
};

export const bottomTabReducer = createSlice({
  name: 'bottomTab',
  initialState,
  reducers: {
    setBottomTab: (state, action) => {
      let tempObj = {...state, ...action.payload};
      return tempObj;
    },
    resetBottomTab: state => initialState,
  },
});

export const {setBottomTab, resetBottomTab} = bottomTabReducer.actions;

export default bottomTabReducer.reducer;
