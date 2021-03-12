import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
// import AddPromoCodeBottomsheet from '../components/AddPromoCodeBottomsheet';

function Payments({ navigation }) {
  const [visible, setVisible] = useState(false);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.payments}>Payments</Text>
      <View style={styles.rect}>
        <View style={styles.rect2}>
          <View style={styles.wrapper}>
            <FontAwesomeIcon name="cc-visa" style={styles.icon} />
            <Text style={styles.loremIpsum}>VISA xxxx-xxxx-xxxx-6594</Text>
          </View>
          <FontAwesomeIcon name="trash-o" style={styles.icon2} />
        </View>
        <View style={styles.rect2}>
          <View style={styles.wrapper}>
            <FontAwesomeIcon name="cc-visa" style={styles.icon} />
            <Text style={styles.loremIpsum}>VISA xxxx-xxxx-xxxx-2981</Text>
          </View>
          <FontAwesomeIcon name="trash-o" style={styles.icon2} />
        </View>
        <TouchableOpacity
          style={styles.rect2}
          onPress={() => {
            navigation.navigate('AddCreditDebitCard');
          }}>
          <View style={styles.wrapper}>
            <EntypoIcon name="circle-with-plus" style={styles.icon5} />
            <Text style={styles.addPaymentMethod}>Add Payment Method</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rect5}>
        <Text style={styles.riderProfile}>Rider Profile</Text>
        <View style={styles.rect2}>
          <View style={styles.wrapper}>
            <MaterialCommunityIconsIcon
              name="google"
              style={styles.icon}></MaterialCommunityIconsIcon>
            <View style={styles.profileColumn}>
              <Text style={styles.profile}>PERSONAL PROFILE</Text>
              <Text style={styles.email}>robert308@gmail.com</Text>
            </View>
          </View>
        </View>
        <View style={styles.rect2}>
          <View style={styles.wrapper}>
            <SimpleLineIconsIcon name="briefcase" style={styles.icon} />
            <View style={styles.profileColumn}>
              <Text style={styles.profile}>BUSINESS PROFILE</Text>
              <Text style={styles.email}>Set Up Business Profile</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.rect8}>
        <Text style={styles.promotions}>Promotions</Text>
        <TouchableOpacity style={styles.rect2}>
          <View style={styles.wrapper}>
            <EntypoIcon name="circle-with-plus" style={styles.icon5}></EntypoIcon>
            <Text style={styles.addPromoCode}>Add Promo Code</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  payments: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24
  },
  rect: {
    width: '100%',
    height: 208,
    marginTop: 17
  },
  rect2: {
    width: '100%',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 30,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    fontSize: 28,
    color: 'rgba(11,64,148,1)',
    height: 28,
    width: 36,
    marginTop: 1
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    marginLeft: 19,
    marginTop: 6
  },
  icon2: {
    fontSize: 28,
    height: 28,
    // width: 22,
    marginLeft: 19
  },
  icon5: {
    color: 'rgba(39,170,225,1)',
    fontSize: 30,
    height: 33
    // width: 30,
  },
  addPaymentMethod: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 18,
    marginLeft: 23,
    marginTop: 6
  },
  rect5: {
    width: '100%',
    marginTop: 33
  },
  riderProfile: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginLeft: 1,
    marginBottom: 10
  },
  profile: {
    // fontFamily: 'roboto-300',
    color: 'rgba(179,179,179,1)'
  },
  email: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 6,
    marginLeft: 1
  },
  profileColumn: {
    marginLeft: 18
  },
  promotions: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18,
    marginBottom: 10
  },
  addPromoCode: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 18,
    marginLeft: 18,
    marginTop: 5
  },
  rect8: {
    width: '100%',
    height: 104,
    marginTop: 30
  }
});

export default Payments;
