import {RF} from '@theme/responsive';
import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const PostContentLoader = (props: any) => (
  <ContentLoader
    speed={1}
    width={RF(400)}
    height={RF(50)}
    Duration={1000}
    viewBox="0 0 400 50"
    backgroundColor="#d9d9d9"
    foregroundColor="#f0f0f0"
    {...props}>
    <Rect x="0" y="8" rx="3" ry="3" width="300" height="10" />
    <Rect x="0" y="28" rx="3" ry="3" width="200" height="10" />
  </ContentLoader>
);

export default PostContentLoader;
