import DropDown from '@components/customDropdown';
import CustomLoading from '@components/customLoading';
import Header from '@components/header';
import Input from '@components/input';
import Wrapper from '@components/wrapper';
import {setJobsReducer} from '@redux/reducers/jobsSlice';
import {showToast} from '@services/helperService';
import {addJob, editJob} from '@services/jobsService';
import {COLORS} from '@theme/colors';
import {FONTS} from '@theme/fonts';
import {HP, RF, WP} from '@theme/responsive';
import {ANDROID} from '@utils/constants';
import {CreateJobVS} from '@utils/validations';
import {Formik} from 'formik';
import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useDispatch, useSelector} from 'react-redux';

const CreateJobModal = ({modalVisible, setModalVisible, item, isEdit}: any) => {
  const dispatch = useDispatch();
  const {jobs} = useSelector((state: any) => state.root.jobs);
  const initialValues = {
    jobTitle: isEdit ? item?.title : '',
    companyName: isEdit ? item?.companyName : '',
    employmentType: isEdit ? item?.employmentType : '',
    location: isEdit ? item?.location : '',
    contact: isEdit ? item?.email : '',
    description: isEdit ? item?.description : '',
  };
  const submitHandler = (
    {
      jobTitle,
      companyName,
      employmentType,
      location,
      contact,
      description,
    }: any,
    {setSubmitting}: any,
  ) => {
    const params = {
      title: jobTitle,
      companyName: companyName,
      employmentType: employmentType,
      location: location,
      email: contact,
      description: description,
    };

    !isEdit
      ? addJob(params)
          .then(({data}: any) => {
            showToast('Success', 'Job Posted!', true);
          })
          .catch(err => {
            console.log('err', err);
            showToast('Request Failed', err?.response.data, false);
          })
          .finally(() => {
            setSubmitting(false);
            setModalVisible(!modalVisible);
          })
      : editJob(params, item?._id)
          .then(({data}: any) => {
            let arr = [...jobs];
            arr.map((itm, ind) => {
              if (item?._id === itm?._id) {
                let temp = {...itm};
                arr[ind] = Object.assign(temp, params);
              }
            });
            dispatch(setJobsReducer({jobs: arr}));
            showToast('Success', 'Job Post Updated!', true);
          })
          .catch(err => {
            console.log('err', err);
            showToast('Request Failed', err?.response.data, false);
          })
          .finally(() => {
            setSubmitting(false);
            setModalVisible(!modalVisible);
          });
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={[styles.modalView]}>
          <Wrapper noPaddingBottom>
            <View>
              <Formik
                initialValues={initialValues}
                validationSchema={CreateJobVS}
                onSubmit={submitHandler}>
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  isSubmitting,
                }) => (
                  <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'never'}>
                    <Header
                      title={'Create Job'}
                      leftText={'Cancel'}
                      rightText={'Post'}
                      rightAction={handleSubmit}
                      backAction={() => {
                        setModalVisible(false);
                      }}
                    />
                    <View style={styles.mainContainer}>
                      <Input
                        title={'Job Title'}
                        textContentType={'name'}
                        value={values.jobTitle}
                        autoCapitalize={'none'}
                        placeholder={'Job Title'}
                        keyboardType="default"
                        onChangeText={handleChange('jobTitle')}
                        error={
                          touched.jobTitle && errors.jobTitle
                            ? errors.jobTitle
                            : ''
                        }
                        inputStyle={[styles.inputStyle]}
                        containerStyle={styles.inputContainer}
                        titleSize={12}
                        required
                      />
                      <Input
                        title={'Company Name'}
                        textContentType={'name'}
                        value={values.companyName}
                        autoCapitalize={'none'}
                        placeholder={'Company Name'}
                        keyboardType="default"
                        onChangeText={handleChange('companyName')}
                        error={
                          touched.companyName && errors.companyName
                            ? errors.companyName
                            : ''
                        }
                        inputStyle={[styles.inputStyle]}
                        containerStyle={styles.inputContainer}
                        titleSize={12}
                        required
                      />
                      <DropDown
                        title={'Employment Type'}
                        placeholder="Choose..."
                        value={values.employmentType}
                        setValue={(val: string) =>
                          setFieldValue('employmentType', val)
                        }
                        error={
                          touched.employmentType && errors.employmentType
                            ? errors.employmentType
                            : ''
                        }
                        inputStyle={[styles.inputStyle]}
                        containerStyle={styles.inputContainer}
                        titleSize={12}
                        required
                      />
                      <Input
                        title={'Location'}
                        textContentType={'location'}
                        value={values.location}
                        autoCapitalize={'none'}
                        placeholder={'Location'}
                        keyboardType="default"
                        onChangeText={handleChange('location')}
                        error={
                          touched.location && errors.location
                            ? errors.location
                            : ''
                        }
                        inputStyle={[styles.inputStyle]}
                        containerStyle={styles.inputContainer}
                        titleSize={12}
                        required
                      />
                      <Input
                        title={'Contact Email'}
                        textContentType={'emailAddress'}
                        value={values.contact}
                        autoCapitalize={'none'}
                        placeholder={'Contact Email'}
                        keyboardType="email-address"
                        onChangeText={handleChange('contact')}
                        error={
                          touched.contact && errors.contact
                            ? errors.contact
                            : ''
                        }
                        inputStyle={[styles.inputStyle]}
                        containerStyle={styles.inputContainer}
                        titleSize={12}
                        required
                      />
                      <Input
                        title={'Description'}
                        textContentType={'name'}
                        value={values.description}
                        autoCapitalize={'sentences'}
                        placeholder={'Description'}
                        keyboardType="default"
                        onChangeText={handleChange('description')}
                        multiline
                        error={
                          touched.description && errors.description
                            ? errors.description
                            : ''
                        }
                        inputStyle={[styles.inputStyle]}
                        containerStyle={styles.inputContainer}
                        titleSize={12}
                        required
                      />
                    </View>
                    <CustomLoading visible={isSubmitting} />
                  </KeyboardAwareScrollView>
                )}
              </Formik>
            </View>
          </Wrapper>
        </View>
      </Modal>
    </View>
  );
};
const {REGULAR} = FONTS;
const styles = StyleSheet.create({
  modalView: {
    height: HP(100),
    width: WP(100),
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    padding: RF(15),
  },
  mainContainer: {
    paddingLeft: RF(15),
    paddingRight: RF(15),
  },
  profilePhoto: {height: RF(70), width: RF(70), borderRadius: RF(100)},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ANDROID ? RF(8) : RF(9),
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: RF(5),
    // ...GST.mb4,
  },
  inputStyle: {
    flex: 1,
    paddingRight: RF(10),
    fontFamily: REGULAR,
    color: COLORS.BLACK,
    fontSize: RF(12),
    paddingVertical: RF(0),
  },
  customBtn: {
    height: RF(30),
    width: WP(50),
    borderRadius: RF(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateJobModal;
