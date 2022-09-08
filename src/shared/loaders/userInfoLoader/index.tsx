import {RF} from '@theme/responsive';
import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const UserInfoLoader = (props: any) => (
  <ContentLoader
    speed={1}
    width={RF(350)}
    height={RF(37)}
    Duration={1000}
    viewBox="0 0 350 35"
    backgroundColor="#d9d9d9"
    foregroundColor="#f0f0f0"
    {...props}>
    <Rect x="0" y="8" rx="3" ry="3" width="100" height="7" />
    <Rect x="0" y="28" rx="3" ry="3" width="50" height="7" />
  </ContentLoader>
);

export default UserInfoLoader;
