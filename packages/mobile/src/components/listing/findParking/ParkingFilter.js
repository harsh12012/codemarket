import React, { useEffect, useState } from 'react';
import { Text, View, Modal, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@parkyourself-frontend/shared/config/colors';
import moment from 'moment';
import DatepickerRange from 'react-native-range-datepicker';
import RadioButton from '../../common/RadioButton';
import dateFilterConfig from '@parkyourself-frontend/shared/config/dateFilter';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { color } from 'react-native-reanimated';
import MaterialButtonPrimary from '../../MaterialButtonPrimary';

export default function BookingFilter({
  activeFilter,
  setActiveFilter,
  range,
  setRange,
  setModalVisible
}) {
  const [showModal, setShowModal] = useState(false);
  const [features,setFeatures] = useState([])

  let featureItems = [
    "Gated",
"CCTV",
    "Sheltered",
    "Disabled Access"
  ]

  let oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() - 1);

  useEffect(() => {
    setModalVisible(true);
  }, []);

  

  return (
    <>
      <Modal style={{}} animationType="slide" transparent={true} visible={showModal}>
        <SafeAreaView style={styles.safeView}>
          <DatepickerRange
            startDate={range.startDate || new Date()}
            untilDate={range.endDate || new Date()}
            buttonColor={colors.primary}
            placeHolderStart="Start Date"
            placeHolderUntil="End Date"
            selectedBackgroundColor={colors.primary}
            todayColor={colors.primary}
            onClose={() => {
              setModalVisible(false);
              setShowModal(false);
            }}
            onConfirm={(start, end) => {
              let newDate = {
                startDate: start,
                endDate: end,
                displayedDate: moment()
              };

              setRange({ ...range, ...newDate });

              setModalVisible(false);
              setShowModal(false);
            }}
          />
        </SafeAreaView>
      </Modal>
      <View style={styles.filterBox}>
        <View style={styles.header}>
          <MaterialCommunityIcon name="filter-variant" size={28} />
          <Text style={styles.headerText}>FILTER BY</Text>
        </View>

        <TouchableOpacity  style={styles.radioContainer}>
          <IoniconsIcon
            name={true ? 'checkmark-circle' : 'radio-button-off'}
            color={colors.primary}
            size={28}
          />
          <Text style={styles.radioLabel}>Price</Text>
          <TextInput
          style={{ width: 50, borderColor: 'gray', borderWidth: 1,marginLeft:10 }}
             // onChangeText={text => onChangeText(text)}
           value={"value"}
             />
              <TextInput
          style={{ width: 50, borderColor: 'gray', borderWidth: 1,marginLeft:10 }}
             // onChangeText={text => onChangeText(text)}
           value={"value"}
             />
        </TouchableOpacity>

        <TouchableOpacity  style={styles.radioContainer}>
          <IoniconsIcon
            name={true ? 'checkmark-circle' : 'radio-button-off'}
            color={colors.primary}
            size={28}
          />
          <Text style={styles.radioLabel}>Distance</Text>
          <TextInput
          style={{ width: 50, borderColor: 'gray', borderWidth: 1,marginLeft:10 }}
             // onChangeText={text => onChangeText(text)}
           value={"value"}
             />
             
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingLeft: 10,
            paddingTop: 10,
            borderBottomColor: colors.primary,
            borderBottomWidth: 1
          }}>
          <RadioButton
            checked={activeFilter === 'Day'}
            onPress={() => {
              setActiveFilter('Day');
              setModalVisible(false);
              let newDate = {
                startDate: dateFilterConfig.oneDayBack,
                endDate: new Date(),
                displayedDate: moment()
              };
              setRange({ ...range, ...newDate });
            }}
            label={'Compact'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingLeft: 10,
            paddingTop: 10,
            borderBottomColor: colors.primary,
            borderBottomWidth: 1
          }}>
          <RadioButton
            checked={activeFilter === 'Week'}
            onPress={() => {
              setActiveFilter('Week');
              setModalVisible(false);
              let newDate = {
                startDate: dateFilterConfig.oneWeekBack,
                endDate: new Date(),
                displayedDate: moment()
              };
              setRange({ ...range, ...newDate });
            }}
            label={'Mid Sized'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingLeft: 10,
            paddingTop: 10,
            borderBottomColor: colors.primary,
            borderBottomWidth: 1
          }}>
          <RadioButton
            checked={activeFilter === 'Month'}
            onPress={() => {
              setActiveFilter('Month');
              setModalVisible(false);
              let newDate = {
                startDate: dateFilterConfig.oneMonthBack,
                endDate: new Date(),
                displayedDate: moment()
              };
              setRange({ ...range, ...newDate });
            }}
            label={'Large Sized'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingLeft: 10,
            paddingTop: 10,
            borderBottomColor: colors.primary,
            borderBottomWidth: 1
          }}>
          <RadioButton
            checked={activeFilter === 'Year'}
            onPress={() => {
              setActiveFilter('Year');
              setModalVisible(false);
              let newDate = {
                startDate: oneYearFromNow,
                endDate: new Date(),
                displayedDate: moment()
              };
              setRange({ ...range, ...newDate });
            }}
            label={'Over Sized'}
          />
        </TouchableOpacity>

        <View style={{display:"flex"}}>
            <Text style={{fontSize:18}}>Features</Text>

            <View style={{display:"flex", flexDirection:'row', flexWrap:'wrap'}}>

              {featureItems.map(item => <TouchableOpacity onPress={() =>{
                let tempFeature = [...features]
                if(!features.includes(item)){
                  tempFeature.push(item)
                  setFeatures(tempFeature)
                }else{
                  let tempFeature = features.filter(val => val !== item)
                  setFeatures(tempFeature)
                }
              }}>
                <Text  style={[styles.features, features.includes(item) && styles.active]}>{item}</Text>{}
              </TouchableOpacity> )}
              
            
            
            </View>

        </View>

        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.dateRangeButton}>
          <MaterialCommunityIcon name="calendar-clock" size={25} />
          <Text style={styles.rangeText}>Date Range</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{display:"flex", justifyContent:'center',alignItems:'center',marginBottom:10}}>
        <MaterialButtonPrimary
                caption="SAVE"
                onPress={()=>setModalVisible(false)}
                style={styles.materialButtonPrimary}></MaterialButtonPrimary>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  safeView: { flex: 1 },
  filterBox: {
    backgroundColor: colors.white,
    borderRadius: 1,
    borderColor: colors.primary,
    borderWidth: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    width:300
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderBottomWidth: 1
  },
  headerText: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5
  },
  dateRangeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 1
  },
  rangeText: { marginLeft: 5 },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1
  },
  radioLabel: {
    fontSize: 18,
    marginLeft: 5
  },
  features:{
    borderWidth:1,
    borderColor:"gray",
    borderRadius:10,
    padding:2,
    marginRight:5,
    marginTop:5
  },
  active:{
    borderColor:colors.primary,
    borderWidth:2,
  },
  materialButtonPrimary: {
    width: 140,
    height: 36,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 60,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    marginTop: 29
    // marginLeft: 1
  },
});
