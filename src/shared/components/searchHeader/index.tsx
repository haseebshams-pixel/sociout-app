import {COLORS} from '@theme/colors';
import {FONTS} from '@theme/fonts';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Icon} from 'react-native-elements';
const {PRIMARY, WHITE, LIGHT_GRAY} = COLORS;
const {REGULAR} = FONTS;
const HeaderComponent = ({searchHandler, title}: any) => {
  const [value, setvalue] = useState('');
  const dataHandler = (e: any) => {
    setvalue(e);
    searchHandler(e);
  };
  return (
    <>
      <View style={styles.inputContainer}>
        <Icon
          containerStyle={{paddingRight: RF(10)}}
          name={'search-outline'}
          color={WHITE}
          tvParallaxProperties={undefined}
          type={'ionicon'}
        />
        <TextInput
          value={value}
          style={styles.input}
          placeholder={title ? title : 'Search'}
          onChangeText={e => dataHandler(e)}
          placeholderTextColor={LIGHT_GRAY}
          selectionColor={WHITE}
        />
        {value?.length > 0 && (
          <Icon
            containerStyle={{paddingRight: RF(10)}}
            name={'close'}
            tvParallaxProperties={undefined}
            type={'ionicon'}
            color={WHITE}
            onPress={() => dataHandler('')}
          />
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PRIMARY,
    padding: RF(10),
    ...GST.mx3,
    borderRadius: RF(8),
  },
  headerstyle: {
    height: RF(45),
    backgroundColor: PRIMARY,
    paddingHorizontal: RF(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: RF(8),
    borderTopRightRadius: RF(8),
  },
  input: {
    fontFamily: REGULAR,
    fontSize: RF(14),
    color: WHITE,
    flex: 1,
  },
  divider: {
    height: 0.5,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: COLORS.LIGHT_GRAY,
  },
});

export {HeaderComponent};
