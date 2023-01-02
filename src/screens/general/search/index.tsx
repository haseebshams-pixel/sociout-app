//import liraries
import {chatIcon} from '@assets/icons';
import CustomText from '@components/customText';
import Header from '@components/header';
import {HeaderComponent} from '@components/searchHeader';
import Wrapper from '@components/wrapper';
import {navigate} from '@services/navService';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF, WP} from '@theme/responsive';
import {ROUTES} from '@utils/routes';
import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {styles} from './styles';
const {DARK_GRAY} = COLORS;

const Search = ({route}: any) => {
  const {user} = useSelector((state: any) => state.root.user);
  const [value, setvalue] = useState<any>('');
  const ItemCard = (item: any) => {
    const image: any = item?.pictureUrl;
    return (
      <View
        style={{
          paddingHorizontal: WP(6),
          ...GST.mb4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={GST.FLEX_ROW}>
          {image ? (
            <Avatar
              containerStyle={{marginRight: RF(10)}}
              size={RF(40)}
              source={{uri: image}}
              rounded
            />
          ) : (
            <View style={styles.imageStyle}>
              <CustomText
                color={DARK_GRAY}
                style={{textAlign: 'center'}}
                size={15}>
                {'#'}
              </CustomText>
            </View>
          )}
          <View style={{width: WP(50)}}>
            <CustomText>{item?.name}</CustomText>
            {item?.memberCounts > 0 && (
              <CustomText color={DARK_GRAY}>
                {item?.memberCounts || 0} members{' '}
              </CustomText>
            )}
          </View>
        </View>
      </View>
    );
  };
  return (
    <Wrapper>
      <StatusBar translucent barStyle={'dark-content'} />
      {/* <Header
        title={'Network'}
        rightIcon={chatIcon}
        userIcon
        backAction={() => navigate('ProfileStack')}
        onPress={() => navigate(ROUTES.CHAT)}
      /> */}
      <HeaderComponent searchHandler={setvalue} />
      <View style={{height: HP(2)}} />
    </Wrapper>
  );
};

export default Search;
