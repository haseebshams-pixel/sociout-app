import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {styles} from './styles';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {deleteJob} from '@services/jobsService';
import {showToast} from '@services/helperService';
import {setJobsReducer} from '@redux/reducers/jobsSlice';
import CreateJobModal from '@components/createJobModal';
import JobModal from '@components/jobModal';
import CustomOptions from '@components/customOption';

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
  const {user, jobs} = useSelector((state: any) => state.root);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [openJobModal, setOpenJobModal] = useState(false);
  const editJobHandler = () => {
    setModalVisible(true);
  };
  const deleteJobHandler = () => {
    let backupjobs = [...jobs?.jobs];
    var filterArr = jobs?.jobs.filter((itm: any) => {
      return itm?._id != item?._id;
    });
    dispatch(setJobsReducer({jobs: filterArr}));
    deleteJob(item?._id)
      .then(() => {
        showToast('Succes', 'Deleted Successfuly', true);
      })
      .catch(e => {
        console.log('ERROR', e);
        showToast('Request Failed', e?.response.data, false);
        dispatch(setJobsReducer({jobs: backupjobs}));
      })
      .finally(() => {});
  };
  return (
    <View style={[styles.container]}>
      <Pressable onPress={() => setOpenJobModal(true)}>
        <CustomText bold size={13} color={COLORS.PRIMARY} numberOfLines={1}>
          {item?.title}
        </CustomText>
      </Pressable>
      <CustomText
        size={12}
        numberOfLines={1}
        color={COLORS.PLACEHOLDER}
        style={[GST.mt1]}>
        {item?.companyName}
      </CustomText>
      <CustomText size={12} numberOfLines={1} color={COLORS.PLACEHOLDER}>
        {item?.location}
      </CustomText>
      <CustomText
        size={11}
        numberOfLines={1}
        color={COLORS.GREEN}
        style={[{alignSelf: 'flex-end'}]}>
        {moment(item?.date).fromNow()}
      </CustomText>
      {item?.postedBy == user?.user?.id && (
        <CustomOptions
          options={['Edit', 'Delete', 'Cancel']}
          actions={[editJobHandler, deleteJobHandler]}
          redIndex={1}
        />
      )}
      <CreateJobModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}
        isEdit
      />
      <JobModal
        modalVisible={openJobModal}
        setModalVisible={setOpenJobModal}
        item={item}
      />
    </View>
  );
};

export default JobCard;
