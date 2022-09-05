import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

const PostUserLoader = (props: any) => (
  <ContentLoader
    speed={1}
    width={200}
    height={50}
    viewBox="0 0 200 50"
    backgroundColor="#d9d9d9"
    foregroundColor="#f0f0f0"
    {...props}>
    <Rect x="58" y="8" rx="3" ry="3" width="88" height="10" />
    <Rect x="58" y="26" rx="3" ry="3" width="52" height="10" />
    <Circle cx="24" cy="24" r="24" />
  </ContentLoader>
);

export default PostUserLoader;
