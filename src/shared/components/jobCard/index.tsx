import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import OptionsMenu from 'react-native-option-menu';
import {moreIcon} from '@assets/icons';
import {RF} from '@theme/responsive';
import moment from 'moment';
import {useSelector} from 'react-redux';

interface Props {
  item: {
    companyName: string;
    date: string;
    description: string;
    email: string;
    employmentType: string;
    location: string;
    postedBy: string;
    title: string;
    _id: string;
  };
}

const JobCard = ({item}: Partial<Props>) => {
  const {user} = useSelector((state: any) => state.root.user);
  const editPost = () => {};
  const deletePost = () => {};
  return (
    <View style={[styles.container]}>
      <CustomText bold size={15} color={COLORS.PRIMARY} numberOfLines={1}>
        {item?.title}
      </CustomText>
      <CustomText
        size={14}
        numberOfLines={1}
        color={COLORS.PLACEHOLDER}
        style={[GST.mt1]}>
        {item?.companyName}
      </CustomText>
      <CustomText size={14} numberOfLines={1} color={COLORS.PLACEHOLDER}>
        {item?.location}
      </CustomText>
      <CustomText
        size={12}
        numberOfLines={1}
        color={COLORS.GREEN}
        style={[{alignSelf: 'flex-end'}]}>
        {moment(item?.date).fromNow()}
      </CustomText>
      {item?.postedBy == user?.id && (
        <View style={[{position: 'absolute', right: RF(5), top: RF(15)}]}>
          <OptionsMenu
            button={moreIcon}
            buttonStyle={{
              width: RF(20),
              height: RF(20),
              resizeMode: 'contain',
            }}
            destructiveIndex={1}
            options={['Edit', 'Delete', 'Cancel']}
            actions={[editPost, deletePost]}
          />
        </View>
      )}
    </View>
  );
};

export default JobCard;
