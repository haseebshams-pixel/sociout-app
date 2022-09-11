import {RF} from '@theme/responsive';
import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

const PostUserLoader = (props: any) => (
  <ContentLoader
    speed={1}
    width={RF(200)}
    height={RF(40)}
    Duration={2000}
    viewBox="0 0 200 40"
    backgroundColor="#d9d9d9"
    foregroundColor="#f0f0f0"
    {...props}>
    <Rect x="50" y="8" rx="3" ry="3" width="88" height="8" />
    <Rect x="50" y="22" rx="3" ry="3" width="52" height="8" />
    <Circle cx="20" cy="20" r="20" />
  </ContentLoader>
);

export default PostUserLoader;
