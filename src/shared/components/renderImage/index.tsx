import LoadingView from '@components/loadingView';
import {WP} from '@theme/responsive';
import {PHOTO_URL} from '@utils/endpoints';
import React, {useState} from 'react';
import {Image} from 'react-native';

const RenderImage = ({item, isShare, imageStyles}: any) => {
  const [loader, setLoader] = useState(false);
  return (
    <>
      <Image
        style={[imageStyles, {width: isShare ? WP(80) : WP(100)}]}
        source={{uri: PHOTO_URL + item}}
        onLoadStart={() => {
          setLoader(true);
        }}
        onLoadEnd={() => {
          setLoader(false);
        }}
      />
      {loader && <LoadingView />}
    </>
  );
};

export default React.memo(RenderImage);
