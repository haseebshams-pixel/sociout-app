import RenderImage from '@components/renderImage';
import {COLORS} from '@theme/colors';
import {RF, WP} from '@theme/responsive';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
interface Props {
  files: any;
  onPress: any;
  isShare: boolean;
  isLocal: boolean;
  focus: boolean;
}
const CustomImageSlider = ({
  files,
  onPress,
  isShare,
  isLocal,
  focus,
}: Partial<Props>) => {
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
    <View style={[styles.wrapScroll, {width: isShare ? WP(80) : WP(100)}]}>
      <ScrollView
        onMomentumScrollEnd={({nativeEvent}) => change(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal>
        {files.map((e: any, index: number) => (
          <TouchableWithoutFeedback onPress={onPress} key={index}>
            <RenderImage
              focus={focus}
              activeIndex={active}
              isLocal={isLocal}
              item={isLocal ? e?.uri : e?.link}
              index={index}
              isShare={isShare}
              isVideo={isLocal ? e?.type === 'video/mp4' : e?.type === 'video'}
              imageStyles={styles.wrapImage}
              videoStyles={styles.wrapVideo}
            />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>

      <View style={styles.wrapDot}>
        {files.map((e: any, index: number) => (
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
    height: RF(200),
    backgroundColor: COLORS.WHITE,
  },
  wrapImage: {
    height: RF(200),
    resizeMode: 'cover',
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  wrapVideo: {
    height: RF(200),
    width: WP(100),
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  wrapDot: {
    position: 'absolute',
    bottom: -RF(18),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    // margin: 3,
    color: 'transparent',
    borderRadius: 100,
    borderColor: COLORS.LIGHT_GRAY,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
    width: RF(8),
    height: RF(8),
    marginRight: RF(1),
  },
  dotActive: {
    // margin: 3,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 100,
    width: RF(8),
    height: RF(8),
    marginRight: RF(1),
  },
});

export default CustomImageSlider;
