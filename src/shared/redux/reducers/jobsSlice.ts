import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  jobs: [],
};

export const jobsReducer = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobsReducer: (state, action) => {
      let tempObj = {...state, ...action.payload};
      return tempObj;
    },
    resetJobs: () => {
      return initialState;
    },
  },
});

export const {setJobsReducer, resetJobs} = jobsReducer.actions;

export default jobsReducer.reducer;
