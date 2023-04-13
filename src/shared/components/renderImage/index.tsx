import LoadingView from '@components/loadingView';
import {WP} from '@theme/responsive';
import {PHOTO_URL} from '@utils/endpoints';
import React, {useState} from 'react';
import {Image} from 'react-native';
import Video from 'react-native-video';

const RenderImage = ({
  item,
  isShare,
  imageStyles,
  videoStyles,
  isVideo,
  isLocal,
  activeIndex,
  index,
  focus,
}: Partial<any>) => {
  const [loader, setLoader] = useState(true);

  return (
    <>
      {isVideo ? (
        <Video
          bufferConfig={{minBufferMs: 1000}}
          repeat={true}
          paused={activeIndex === index && focus ? false : true}
          source={{
            uri: isLocal ? item : PHOTO_URL + item,
          }}
          controls
          onError={() => {
            console.log('ERROR');
          }}
          onLoad={() => {
            setLoader(false);
          }}
          resizeMode="cover"
          style={[videoStyles, {width: isShare ? WP(80) : WP(100)}]}
          hideShutterView
        />
      ) : (
        <Image
          style={[imageStyles, {width: isShare ? WP(80) : WP(100)}]}
          source={{uri: isLocal ? item : PHOTO_URL + item}}
          onLoad={() => {
            setLoader(false);
          }}
        />
      )}

      {loader && <LoadingView />}
    </>
  );
};

export default React.memo(RenderImage);
