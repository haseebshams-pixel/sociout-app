import {COLORS} from '@theme/colors';
import {RF, WP} from '@theme/responsive';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Image} from 'react-native-elements';
interface Props {
  images: any;
}
const CustomImageSlider = ({images}: Props) => {
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
    <View style={styles.wrapScroll}>
      <ScrollView
        onScroll={({nativeEvent}) => change(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal>
        {images.map((e: any, index: number) => (
          <View key={index}>
            <Image
              style={styles.wrapImage}
              source={{uri: e}}
              key={index}
              height={undefined}
              width={undefined}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.wrapDot}>
        {images.map((e: any, index: number) => (
          <View
            key={index}
            style={active === index ? styles.dotActive : styles.dot}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapScroll: {
    width: WP(80),
    height: RF(200),
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  wrapImage: {
    width: WP(80),
    height: RF(200),
    resizeMode: 'contain',
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    margin: 3,
    color: 'transparent',
    borderRadius: 100,
    borderColor: COLORS.PLACEHOLDER,
    borderWidth: 1,
    width: RF(8),
    height: RF(8),
  },
  dotActive: {
    margin: 3,
    backgroundColor: COLORS.WHITE,
    borderRadius: 100,
    width: RF(8),
    height: RF(8),
  },
});

export default CustomImageSlider;
