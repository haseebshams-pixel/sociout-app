import {HP, RF, WP} from '@theme/responsive';
import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';

import {Overlay} from 'react-native-elements';
//
interface Props {
  images: [] | any;
  visible: boolean;
  toggleOverlay: any;
}

const CustomOverlayImageSlider = ({
  images,
  visible,
  toggleOverlay,
}: Partial<Props>) => {
  const listItem = (item: any) => {
    return <FastImage source={{uri: item?.item}} style={{width: WP(100)}} />;
  };
  const [active, setActive] = useState(0);

  const change = (nativeEvent: any) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== active) {
        setActive(slide);
      }
    }
  };

  return (
    <View>
      <Overlay
        isVisible={visible ? visible : false}
        onBackdropPress={toggleOverlay}
        overlayStyle={{height: HP(50), padding: RF(0)}}>
        <FlatList
          data={images}
          renderItem={listItem}
          horizontal
          onScroll={({nativeEvent}) => change(nativeEvent)}
        />
        <View style={styles.wrapDot}>
          {images.map((e: any, index: number) => (
            <View
              key={index}
              style={active === index ? styles.dotActive : styles.dot}
            />
          ))}
        </View>
      </Overlay>
    </View>
  );
};

export default CustomOverlayImageSlider;
