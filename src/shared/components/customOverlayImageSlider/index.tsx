import {HP, RF, WP} from '@theme/responsive';
import React, {useState} from 'react';
import {FlatList, Image, Modal, Text, View} from 'react-native';
import {styles} from './styles';

import {Overlay} from 'react-native-elements';
import {GST} from '@theme/globalStyles';
import Wrapper from '@components/wrapper';
import Header from '@components/header';
import {COLORS} from '@theme/colors';
import {PHOTO_URL} from '@utils/endpoints';
import RenderImage from '@components/renderImage';
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
    return <RenderImage item={item?.item} imageStyles={styles.image} />;
  };
  const [active, setActive] = useState(0);
  const [total, setTotal] = useState(images?.length);

  const change = (nativeEvent: any) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== active && slide <= total - 1) {
        setActive(slide);
      }
    }
  };

  return (
    <View style={[GST.FLEX, styles.container]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={toggleOverlay}>
        <Wrapper>
          <Header
            title={`${active + 1} of ${total}`}
            leftIcon
            backAction={toggleOverlay}
            mainContainerStyle={(GST.mt3, {marginBottom: 0})}
          />
          <View style={[GST.FLEX, styles.listContainer]}>
            <FlatList
              data={images}
              renderItem={listItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onScroll={({nativeEvent}) => change(nativeEvent)}
            />
          </View>
        </Wrapper>
      </Modal>
    </View>
  );
};

export default CustomOverlayImageSlider;
