import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  posts: [],
};

export const postsReducer = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsReducer: (state, action) => {
      let tempObj = {...state, ...action.payload};
      return tempObj;
    },
    resetPosts: () => {
      return initialState;
    },
  },
});

export const {setPostsReducer, resetPosts} = postsReducer.actions;

export default postsReducer.reducer;
