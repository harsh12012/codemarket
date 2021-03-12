import React, { Component, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  CheckBox,
  ScrollView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialButtonPrimary from '../components/MaterialButtonPrimary';

function AddCreditDebitCard({ navigation }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [name, setName] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const onSubmitHandler = () => {
    try {
      if (cardNumber && expiry && name && defaultValue) {
        let card = {
          cardNumber,
          expiry,
          name,
          isDefault
        };
        navigation.goBack({ card: card });
      } else {
        Alert.alert('Missing Inputs', 'Please fill all inputs');
      }
    } catch (error) {
      Alert.alert('Something went wrong!', 'Please try again');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.loremIpsum}>Add Credit/Debit card</Text>
      <ImageBackground style={styles.rect} source={require('../assets/images/gradient.jpg')}>
        {/* <Icon name="cc-visa" style={styles.icon} /> */}
        {/* <Text style={styles.platinum}>Platinum</Text> */}
        <Text style={styles.loremIpsum2}>{cardNumber ? `${cardNumber}` : '************'}</Text>
      </ImageBackground>
      <TextInput
        placeholder="xxxx-xxxx-xxxx-xxxx"
        placeholderTextColor="rgba(214,214,214,1)"
        style={styles.placeholder}
        keyboardType="number-pad"
        value={cardNumber}
        onChangeText={(input) => {
          setCardNumber(input);
        }}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.mmYy}>MM/YY</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Name on Card"
          placeholderTextColor="rgba(214,214,214,1)"
          style={styles.nameOnCard}
          value={name}
          onChangeText={(input) => {
            setName(input);
          }}
        />
      </View>
      <View style={styles.rect2Stack}>
        <CheckBox
          onValueChange={() => setIsDefault(!isDefault)}
          style={styles.materialCheckbox1}
          value={isDefault}
        />
        <View style={styles.rect2}>
          <Text style={styles.setAsDefault}>Set as Default</Text>
        </View>
      </View>
      <TextInput
        placeholder="Profile Category"
        placeholderTextColor="rgba(214,214,214,1)"
        style={styles.profileCategory}
      />
      <MaterialButtonPrimary
        onPress={onSubmitHandler}
        caption="ADD CARD"
        style={styles.materialButtonPrimary}></MaterialButtonPrimary>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20
  },
  loremIpsum: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24
  },
  rect: {
    width: '100%',
    height: 217,
    borderRadius: 23,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 20,
    shadowOpacity: 0.3,
    shadowRadius: 30,
    marginTop: 28,
    overflow: 'hidden'
  },
  icon: {
    fontSize: 58,
    color: 'rgba(255,255,255,1)',
    height: 58,
    width: 75,
    marginTop: 18,
    marginLeft: 26
  },
  platinum: {
    // fontFamily: 'roboto-300',
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
    letterSpacing: 2,
    marginTop: 8,
    marginLeft: 25
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
    marginTop: 64,
    marginLeft: 26
  },
  placeholder: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 51,
    width: '100%',
    fontSize: 20,
    marginTop: 35,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1
  },
  button: {
    width: '25%',
    height: 45,
    borderBottomWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    backgroundColor: '#fff'
  },
  mmYy: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(214,214,214,1)',
    fontSize: 18,
    marginTop: 12,
    marginLeft: 19
  },
  nameOnCard: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 45,
    width: '70%',
    lineHeight: 14,
    fontSize: 20,
    marginLeft: 14,
    borderBottomWidth: 1,
    borderColor: 'rgba(214,214,214,1)'
  },
  buttonRow: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  rect2: {
    width: 211,
    height: 51
  },
  setAsDefault: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 20,
    marginTop: 14
  },
  materialCheckbox1: {
    height: 40,
    width: 40
  },
  rect2Stack: {
    width: '100%',
    height: 51,
    marginTop: 28,
    alignItems: 'center',
    flexDirection: 'row'
  },
  profileCategory: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 48,
    width: 341,
    fontSize: 20,
    marginTop: 9,
    borderBottomWidth: 1,
    borderColor: 'rgba(214,214,214,1)'
  },
  materialButtonPrimary: {
    width: 120,
    height: 40,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 20,
    shadowOpacity: 0.3,
    shadowRadius: 30,
    marginVertical: 52,
    alignSelf: 'center',
    backgroundColor: '#27aae1'
  }
});

export default AddCreditDebitCard;
