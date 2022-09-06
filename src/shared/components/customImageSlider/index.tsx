import {COLORS} from '@theme/colors';
import {RF, WP} from '@theme/responsive';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Image} from 'react-native-elements';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
interface Props {
  images: any;
  onPress: any;
}
const CustomImageSlider = ({images, onPress}: Partial<Props>) => {
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
          <TouchableWithoutFeedback key={index} onPress={onPress}>
            <Image
              style={styles.wrapImage}
              source={{uri: e}}
              key={index}
              height={undefined}
              width={undefined}
            />
          </TouchableWithoutFeedback>
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
    backgroundColor: COLORS.WHITE,
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
    backgroundColor: COLORS.PLACEHOLDER,
    borderWidth: 1,
    width: RF(8),
    height: RF(8),
  },
  dotActive: {
    margin: 3,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 100,
    width: RF(8),
    height: RF(8),
  },
});

export default CustomImageSlider;
