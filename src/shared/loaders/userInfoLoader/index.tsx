import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const UserInfoLoader = (props: any) => (
  <ContentLoader
    speed={1}
    width={400}
    height={40}
    Duration={1000}
    viewBox="0 0 400 40"
    backgroundColor="#d9d9d9"
    foregroundColor="#f0f0f0"
    {...props}>
    <Rect x="0" y="8" rx="3" ry="3" width="120" height="10" />
    <Rect x="0" y="28" rx="3" ry="3" width="70" height="10" />
  </ContentLoader>
);

export default UserInfoLoader;
