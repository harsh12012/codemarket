import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';

function FindParkingForm({setShowMarkers}) {
  const [activeIndex, setActiveIndex] = useState(0);
  //Dummy locations
  const [locations, setLocations] = useState([
    '906 Peg Shop St. Franklyn, NY',
    '906 Amsterdam Avenue, NY',
    '906 2nd Avenue, New York, NY',
    '711-2880 Nulla St. Mankato Mississippi',
    '8562 Fusce Rd. Frederick Nebraska',
    '191-103 Integer Rd. Corona New Mexico',
    '5587 Nunc. Avenue Erie Rhode Island',
    '3279 Viverra. Avenue Latrobe DE',
  ]);
  // const [locations,setLocations] = useState(listings);
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [gps, setGps] = useState(false);

  // date picker
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [mode, setMode] = useState('date');
  const [showStart, setStartShow] = useState(false);
  const [showEnd, setEndShow] = useState(false);

  //date picker functions
  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setEndShow(false);
    setStartShow(false);
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setStartShow(false);
    setEndShow(false);
    setEndDate(currentDate);
  };

  const showMode = (currentMode, item) => {
    setMode(currentMode);
    if (item == 'start') {
      setEndShow(false);
      setStartShow(true);
    } else if (item == 'end') {
      setStartShow(false);
      setEndShow(true);
    }
  };

  const showDatepicker = (item) => {
    showMode('date', item);
  };

  // const showTimepicker = () => {
  //   showMode('time');
  // };

  const showSearchResults = () => {
    if (search.trim().length > 0) {
      setSearchResults(locations.filter((loc) => loc.includes(search)));
      setShowResults(true);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <View style={styles.rect}>
      <View style={styles.rect2Stack}>
        <View
          style={
            activeIndex == 0
              ? {...styles.rect2, ...styles.active}
              : styles.rect2
          }>
          <TouchableOpacity
            style={styles.iconRow}
            onPress={() => setActiveIndex(0)}>
            <FontAwesomeIcon
              name="calendar-o"
              style={styles.icon}></FontAwesomeIcon>
            <Text style={styles.daily}>DAILY</Text>
          </TouchableOpacity>
        </View>
        <View
          style={
            activeIndex == 1
              ? {...styles.rect3, ...styles.active}
              : styles.rect3
          }>
          <TouchableOpacity
            style={styles.icon2Row}
            onPress={() => setActiveIndex(1)}>
            <FontAwesomeIcon
              name="calendar"
              style={styles.icon2}></FontAwesomeIcon>
            <Text style={styles.monthly}>MONTHLY</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rect4}>
        <View style={styles.icon3Row}>
          <SimpleLineIconsIcon
            name="magnifier"
            style={styles.icon3}></SimpleLineIconsIcon>
          <TextInput
            placeholder="Location, Address, Event Name"
            placeholderTextColor="rgba(158,158,158,1)"
            style={styles.placeholder}
            value={search}
            onChangeText={(input) => {
              setSearch(input);
              showSearchResults();
            }}></TextInput>

          <MaterialIconsIcon
            name="gps-fixed"
            style={{
              ...styles.icon4,
              color: gps ? 'rgba(39,170,225,1)' : '#ccc',
            }}
            onPress={() => {
              setGps(!gps);
            }}></MaterialIconsIcon>
        </View>
      </View>
      <View style={styles.searchListContainer}>
        <ScrollView contentContainerStyle={styles.searchList}>
          {search.trim().length > 0 &&
            (showResults ? (
              searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.searchListItem}
                    onPress={() => {
                      setShowMarkers(true);
                      setSearch(item);
                      setShowResults(false);
                    }}>
                    <EntypoIcon
                      name="location-pin"
                      size={30}
                      color="#27aae1"></EntypoIcon>
                    <Text style={styles.listText}>{item}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.searchListItem}>
                  <Text>No results found</Text>
                </View>
              )
            ) : null)}
        </ScrollView>
      </View>
      <View style={styles.rect5Row}>
        <TouchableOpacity
          style={styles.rect5}
          onPress={() => {
            showDatepicker('start');
          }}>
          <Text style={styles.startDateTime}>Start Date/Time</Text>
          <Text style={styles.dateText} numberOfLines={1}>
            {startDate ? startDate.toString() : 'SELECT'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rect6}
          onPress={() => {
            showDatepicker('end');
          }}>
          <Text style={styles.endDateTime}>End Date/Time</Text>
          <Text style={styles.dateText} numberOfLines={1}>
            {endDate ? endDate.toString() : 'SELECT'}
          </Text>
        </TouchableOpacity>
      </View>
      {showStart && (
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate ? startDate : new Date()}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onStartDateChange}
        />
      )}
      {showEnd && (
        <DateTimePicker
          testID="dateTimePicker"
          value={endDate ? endDate : new Date()}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onEndDateChange}
        />
      )}
      {/* <TextInput placeholder='hello' /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 0,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    paddingVertical: 5,
    zIndex: 1000,
  },
  rect2: {
    top: 2,
    left: 0,
    width: 100,
    // height: 37,
    position: 'absolute',
    flexDirection: 'row',
    paddingBottom: 6,
    opacity: 0.6,
  },
  active: {
    borderBottomColor: '#27aae1',
    borderBottomWidth: 3,
    opacity: 1,
  },
  icon: {
    color: 'rgba(11,64,148,1)',
    fontSize: 25,
    height: 25,
    width: 23,
  },
  daily: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 18,
    marginLeft: 9,
    marginTop: 2,
  },
  iconRow: {
    height: 25,
    flexDirection: 'row',
    flex: 1,
    marginRight: 11,
    marginLeft: 10,
    marginTop: 6,
    // borderBottomColor: '#27aae1',
    // borderBottomWidth: 2,
  },
  rect3: {
    top: 0,
    left: 99,
    width: 132,
    // height: 37,
    position: 'absolute',
    flexDirection: 'row',
    paddingBottom: 6,
    opacity: 0.6,
  },
  icon2: {
    color: 'rgba(11,64,148,1)',
    fontSize: 25,
    height: 25,
    width: 23,
  },
  monthly: {
    // fontFamily: 'roboto-300',
    color: 'rgba(11,64,148,1)',
    fontSize: 18,
    opacity: 0.84,
    marginLeft: 8,
    marginTop: 2,
  },
  icon2Row: {
    height: 25,
    flexDirection: 'row',
    flex: 1,
    marginRight: 9,
    marginLeft: 11,
    marginTop: 8,
  },
  rect2Stack: {
    width: 231,
    height: 39,
    marginTop: 2,
    marginLeft: 20,
  },
  rect4: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(215,212,212,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 6,
    shadowOpacity: 0.13,
    shadowRadius: 8,
    flexDirection: 'row',
    marginTop: 9,
    marginLeft: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
  icon3: {
    color: 'rgba(128,128,128,1)',
    fontSize: 19,
    height: 21,
    width: 19,
    // marginTop: 2,
    width: '6%',
  },
  placeholder: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 28,
    width: '83%',
    marginLeft: 14,
    // marginTop: 10,
  },
  icon4: {
    fontSize: 21,
    height: 21,
    width: 21,
    marginLeft: 5,
    // marginTop: 2,
    width: '6%',
  },
  icon3Row: {
    height: 28,
    flexDirection: 'row',
    flex: 1,
    marginRight: 13,
    marginLeft: 10,
    marginTop: 7,
    alignItems: 'center',
  },
  rect5: {
    width: '47%',
    height: 59,
    borderWidth: 1,
    borderColor: 'rgba(232,232,232,1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'flex-start',
    // marginTop: 10,
  },
  startDateTime: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(158,158,158,1)',
    // marginTop: 7,
    // marginLeft: 14,
  },
  rect6: {
    width: '47%',
    height: 59,
    borderWidth: 1,
    borderColor: 'rgba(232,232,232,1)',
    marginLeft: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'flex-start',
    // marginTop: -10,
  },
  endDateTime: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(158,158,158,1)',
    // marginTop: 9,
    // marginLeft: 14,
  },
  rect5Row: {
    height: 59,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 15,
  },
  mapViewStack: {
    width: 375,
    height: 748,
    marginTop: 56,
  },
  searchListContainer: {
    position: 'absolute',
    top: 95,
    zIndex: 1000,
    width: '100%',
  },
  searchList: {
    // position: 'absolute',
    // top: 50,
    width: '100%',
    zIndex: 1000,
    // height: 200,
    // zIndex: 100,
    // alignItems: 'center',
  },
  searchListItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#777',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listText: {
    marginLeft: 10,
  },
  notFound: {
    alignSelf: 'center',
  },
  dateText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default FindParkingForm;
