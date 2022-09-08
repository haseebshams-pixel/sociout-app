import {RF} from '@theme/responsive';
import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

const ProfileLoader = (props: any) => {
  return (
    <ContentLoader
      speed={1}
      width={RF(70)}
      height={RF(70)}
      Duration={2000}
      viewBox="0 0 50 50"
      backgroundColor="#d9d9d9"
      foregroundColor="#f0f0f0"
      {...props}>
      <Circle cx="24" cy="24" r="24" />
    </ContentLoader>
  );
};

export default ProfileLoader;
