import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  requests: [],
};

export const requestsReducer = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequests: (state, action) => {
      let tempObj = {...state, ...action.payload};
      return tempObj;
    },
    resetRequests: state => initialState,
  },
});

export const {setRequests, resetRequests} = requestsReducer.actions;

export default requestsReducer.reducer;
