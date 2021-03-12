import colors from '@parkyourself-frontend/shared/config/colors';
import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import InputField from '../common/InputField';
import ScreenTittle from '../common/ScreenTittle';
import DatePicker from '../../components/common/DatePicker';
import BottomSheet from 'reanimated-bottom-sheet';
import { timeTo12HrFormat } from '@parkyourself-frontend/shared/utils/time';
import MaterialButtonPrimary from '../MaterialButtonPrimary';
import moment from 'moment';

const AddPromoCodeModal = ({ 
    payload, 
    visible,  
    handleSave,
    handleUpdate, 
    onHide 
}) => {
  const sheetRef = useRef();
  const [addForm, setAddForm] = useState({
    quantity: 0,
    remaining: 0,
    discount: 0,
    code: '',
    startDate: new Date(),
    endDate: new Date(),
   
  });

  const [picker, setPicker] = useState({
    type: 'start',
    mode: 'date'
  });

  const [errState, setErrState] = useState({
    quantity: false,
    code: false,
    discount: false
  });

  const handleDateTimeClick = (type, mode) => {
    setPicker({
      ...picker,
      type,
      mode
    });
    sheetRef.current.snapTo(0);
  };

  const handleInputChange = (fieldName, value) => {
    setAddForm({
      ...addForm,
      [fieldName]: value
    });
  };

  const handleAddClick = () => {
    let errFields = {};
    Object.keys(addForm).map((key) => {
      if (addForm[key] === 0 || addForm[key] === '') {
        errFields[key] = true;
      }
    });

    errFields.remaining = false;

    if (Object.values(errFields).includes(true)) {
      setErrState({
        ...errState,
        ...errFields
      });
    } else {
        let promoCodeData = addForm;
        promoCodeData.discount = Number(promoCodeData.discount)/100;
        promoCodeData.quantity = Number(promoCodeData.quantity);
        promoCodeData.remaining = promoCodeData.remaining > 0 ? (promoCodeData.quantity - promoCodeData.remaining) : promoCodeData.quantity
        handleSave(promoCodeData)
        onHide()
        handleResetValues()
    }

  };

  const handleUpdateClick = () => {

    let errFields = {};
    Object.keys(addForm).map((key) => {
      if (addForm[key] === 0 || addForm[key] === '') {
        errFields[key] = true;
      }
    });

    errFields.remaining = false;

    if (Object.values(errFields).includes(true)) {
        setErrState({
          ...errState,
          ...errFields
        });
      } else {
          let promoCodeData = addForm;
          promoCodeData.discount = Number(promoCodeData.discount)/100;
          promoCodeData.quantity = Number(promoCodeData.quantity);
          promoCodeData.remaining = (promoCodeData.quantity + payload.data.remaining) - payload.data.remaining
          promoCodeData.id = payload.data["_id"]
          handleUpdate(promoCodeData)
          onHide()
          handleResetValues()

       
      }
  };

  const handleResetValues = () => {
    setPicker({
      type: 'start',
      mode: 'date'
    });
    setAddForm({
      quantity: 0,
      remaining: 0,
      discount: 0,
      code: '',
      startDate: new Date(),
      endDate: new Date()
    });
    setErrState({
      quantity: false,
      code: false,
      discount: false
    });
  };


  useEffect(() =>{
        if(payload.data){
   
            setAddForm({
                quantity: payload.data.quantity,
                remaining: payload.data.remaining,
                discount: payload.data.discount*100,
                code: payload.data.code,
                startDate: new Date(payload.data.startDate),
                endDate: new Date(payload.data.endDate)
            })
        }

  },[payload.data])


  console.log(addForm)

  

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.header}>
              <ScreenTittle title={`${payload.edit ? 'Update' : 'Add'} Promo Code`} />
              <TouchableOpacity
                onPress={() => {
                  onHide();
                  handleResetValues();
                }}
                style={styles.closeButton}>
                <AntDesignIcon name="close" size={28} color={colors.secondary} />
              </TouchableOpacity>
            </View>
            <View>
              <InputField
                label="Promo Code"
                value={addForm.code}
                onChangeText={(text) => handleInputChange('code', text)}
                error={errState.code}
              />
              {errState.code && <Text style={styles.errText}>Please enter a promo code</Text>}

              <InputField
                number={true}
                label="Discount"
                value={addForm.discount.toString()}
                onChangeText={(text) => handleInputChange('discount', text)}
                error={errState.discount}
              />
              {errState.discount && (
                <Text style={styles.errText}>Please enter a discount percent</Text>
              )}

              <InputField
                number={true}
                label="Quantity"
                value={addForm.quantity.toString()}
                onChangeText={(text) => handleInputChange('quantity', text)}
                error={errState.quantity}
              />
              {errState.quantity && <Text style={styles.errText}>Please enter a quantity</Text>}

              <View style={styles.flexRow}>
                <View style={[styles.row, { marginRight: 10 }]}>
                  <Text style={styles.labelText}>Start Date</Text>
                  <TouchableOpacity
                    style={styles.inputStyle}
                    onPress={() => handleDateTimeClick('start', 'date')}>
                    <Text>{moment(addForm.startDate).format('DD/MM/YYYY')}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <Text style={styles.labelText}>Start Time</Text>
                  <TouchableOpacity
                    style={styles.inputStyle}
                    onPress={() => handleDateTimeClick('start', 'time')}>
                    <Text>
                      {timeTo12HrFormat(
                       moment(addForm.startDate).format('HH'),
                       moment(addForm.startDate).format('mm')
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.flexRow}>
                <View style={[styles.row, { marginRight: 10 }]}>
                  <Text style={styles.labelText}>End Date</Text>
                  <TouchableOpacity
                    style={styles.inputStyle}
                    onPress={() => handleDateTimeClick('end', 'date')}>
                    <Text>{moment(addForm.endDate).format('DD/MM/YYYY')}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <Text style={styles.labelText}>End Time</Text>
                  <TouchableOpacity
                    style={styles.inputStyle}
                    onPress={() => handleDateTimeClick('end', 'time')}>
                    <Text>
                      {timeTo12HrFormat(
                        moment(addForm.endDate).format('HH'),
                        moment(addForm.endDate).format('mm')
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.actionView}>
                <MaterialButtonPrimary
                  style={styles.cancelBtn}
                  caption="Cancel"
                  onPress={() => {
                    onHide();
                    handleResetValues();
                  }}
                />
                <MaterialButtonPrimary
                  caption={payload.edit ? 'Update': 'Add'}
                  style={styles.materialButtonPrimary}
                  onPress={payload.edit ? handleUpdateClick : handleAddClick}
                />
              </View>
            </View>
          </View>

          <BottomSheet
            ref={sheetRef}
            initialSnap={1}
            snapPoints={[300, 0]}
            borderRadius={20}
            renderContent={(props) => (
              <DatePicker
                {...props}
                date={picker.type === 'start' ? addForm.startDate : addForm.endDate}
                mode={picker.mode}
                type={picker.type}
                onClose={() => sheetRef.current.snapTo(1)}
                minuteInterval={15}
                onChange={(resDate) => {
                  if (picker.type === 'start') {
                    setAddForm({
                      ...addForm,
                      startDate: resDate
                    });
                  } else {
                    setAddForm({
                      ...addForm,
                      endDate: resDate
                    });
                  }
                }}
              />
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default AddPromoCodeModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  flexRow: {
    flexDirection: 'row',
    marginVertical: 8
  },
  row: {
    flex: 1
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#cecece',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5
  },
  errText: {
    fontSize: 16,
    color: colors.error
  },
  errorStyle: {
    borderWidth: 1,
    borderColor: colors.error,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5
  },
  actionView: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  materialButtonPrimary: {
    width: 100,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10
    },
    elevation: 20,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 10,
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 30
  },
  cancelBtn: {
    color: 'black',
    width: 100,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10
    },
    elevation: 20,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 10,
    backgroundColor: '#6c757D',
    paddingVertical: 12,
    borderRadius: 30,
    marginRight: 10
  }
});
