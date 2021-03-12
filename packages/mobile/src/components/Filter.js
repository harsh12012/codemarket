import React, {Component, useState, Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCheckbox from '../components/MaterialCheckbox';

function Filter(props) {
  const [visible, setVisible] = useState(false);
  return (
    <Fragment>
      <TouchableOpacity
        onPress={() => {
          setVisible(!visible);
        }}>
        <Text style={styles.filterButtonText}>Filter</Text>
      </TouchableOpacity>
      {visible && (
        <View style={styles.container}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <ScrollView style={styles.rect}>
              <View style={styles.iconRow}>
                <View style={styles.header}>
                  <Icon name="filter-variant" style={styles.icon}></Icon>
                  <Text style={styles.filterBy}>FILTER BY</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setVisible(!visible);
                  }}>
                  <FontAwesome5Icon name="times" size={30} color="#999" />
                </TouchableOpacity>
              </View>
              <View style={styles.rect2}>
                <View style={styles.materialCheckboxRow}>
                  <MaterialCheckbox
                    style={styles.materialCheckbox}></MaterialCheckbox>
                  <Text style={styles.all}>All</Text>
                </View>
              </View>
              <View style={styles.rect6}>
                <View style={styles.materialCheckbox1Row}>
                  <MaterialCheckbox
                    style={styles.materialCheckbox}></MaterialCheckbox>
                  <Text style={styles.price}>Price</Text>
                </View>
              </View>
              <View style={styles.rect4}>
                <View style={styles.materialCheckbox3Row}>
                  <MaterialCheckbox
                    style={styles.materialCheckbox}></MaterialCheckbox>
                  <Text style={styles.compact}>Compact</Text>
                </View>
              </View>
              <View style={styles.rect5}>
                <View style={styles.materialCheckbox2Row}>
                  <MaterialCheckbox
                    style={styles.materialCheckbox}></MaterialCheckbox>
                  <Text style={styles.distance}>Distance</Text>
                </View>
              </View>
              <View style={styles.rect3}>
                <View style={styles.materialCheckbox4Row}>
                  <MaterialCheckbox
                    style={styles.materialCheckbox}></MaterialCheckbox>
                  <Text style={styles.midSized}>Mid Sized</Text>
                </View>
              </View>
              <View style={styles.rect8}>
                <View style={styles.materialCheckbox5Row}>
                  <MaterialCheckbox
                    style={styles.materialCheckbox}></MaterialCheckbox>
                  <Text style={styles.largeSized}>Large Sized</Text>
                </View>
              </View>
              <View style={styles.rect7}>
                <View style={styles.materialCheckbox6Row}>
                  <MaterialCheckbox
                    style={styles.materialCheckbox}></MaterialCheckbox>
                  <Text style={styles.overSized}>Over Sized</Text>
                </View>
              </View>
              <Text style={styles.features}>FEATURES</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.guarded}>Guarded</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rect9}>
                  <Text style={styles.gated}>Gated</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rect10}>
                  <Text style={styles.cctv}>CCTV</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rect10Row}>
                <TouchableOpacity style={styles.rect11}>
                  <Text style={styles.sheltered}>Sheltered</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rect12}>
                  <Text style={styles.disabledAccess}>Disabled Access</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Modal>
        </View>
      )}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  filterButtonText: {
    marginRight: 20,
    fontWeight: '700',
  },
  rect: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: 'rgba(76,75,75,1)',
    fontSize: 45,
    height: 49,
    width: 45,
  },
  filterBy: {
    // fontFamily: 'roboto-500',
    color: 'rgba(93,92,92,1)',
    fontSize: 22,
    marginLeft: 11,
  },
  iconRow: {
    height: 49,
    flexDirection: 'row',
    marginTop: 1,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rect2: {
    width: '100%',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(39,170,225,1)',
    flexDirection: 'row',
  },
  materialCheckbox: {
    height: 40,
    width: 40,
  },
  all: {
    // fontFamily: 'roboto-500',
    color: 'rgba(118,117,117,1)',
    fontSize: 22,
    marginLeft: 20,
  },
  materialCheckboxRow: {
    height: 40,
    flexDirection: 'row',
    flex: 1,
    marginRight: 141,
    marginLeft: 19,
    marginTop: 11,
    alignItems: 'center',
  },
  rect6: {
    width: '100%',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(39,170,225,1)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  materialCheckbox: {
    height: 40,
    width: 40,
  },
  price: {
    // fontFamily: 'roboto-500',
    color: 'rgba(118,117,117,1)',
    fontSize: 22,
    marginLeft: 20,
  },
  materialCheckbox1Row: {
    height: 40,
    flexDirection: 'row',
    flex: 1,
    marginRight: 120,
    marginLeft: 19,
    marginTop: 10,
    alignItems: 'center',
  },
  rect2Stack: {
    top: 0,
    left: 0,
    width: 237,
    height: 121,
    position: 'absolute',
  },
  rect4: {
    width: '100%',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(39,170,225,1)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  compact: {
    // fontFamily: 'roboto-500',
    color: 'rgba(118,117,117,1)',
    fontSize: 22,
    marginLeft: 20,
  },
  materialCheckbox3Row: {
    height: 40,
    flexDirection: 'row',
    flex: 1,
    marginRight: 77,
    marginLeft: 20,
    alignItems: 'center',
  },
  rect5: {
    width: '100%',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(39,170,225,1)',
    flexDirection: 'row',
  },
  distance: {
    // fontFamily: 'roboto-500',
    color: 'rgba(118,117,117,1)',
    fontSize: 22,
    marginLeft: 20,
  },
  materialCheckbox2Row: {
    height: 40,
    flexDirection: 'row',
    flex: 1,
    marginRight: 86,
    marginLeft: 19,
    marginTop: 10,
    alignItems: 'center',
  },
  rect4Stack: {
    top: 120,
    left: 0,
    width: 237,
    height: 118,
    position: 'absolute',
  },
  rect2StackStack: {
    width: 237,
    height: 238,
    marginTop: 2,
  },
  rect3: {
    width: '100%',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(39,170,225,1)',
    flexDirection: 'row',
  },
  midSized: {
    // fontFamily: 'roboto-500',
    color: 'rgba(118,117,117,1)',
    fontSize: 22,
    marginLeft: 20,
  },
  materialCheckbox4Row: {
    height: 40,
    flexDirection: 'row',
    flex: 1,
    marginRight: 74,
    marginLeft: 19,
    marginTop: 10,
    alignItems: 'center',
  },
  rect8: {
    width: '100%',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(39,170,225,1)',
    flexDirection: 'row',
  },
  largeSized: {
    // fontFamily: 'roboto-500',
    color: 'rgba(118,117,117,1)',
    fontSize: 22,
    marginLeft: 20,
  },
  materialCheckbox5Row: {
    height: 40,
    flexDirection: 'row',
    flex: 1,
    marginRight: 56,
    marginLeft: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  rect3Stack: {
    top: 0,
    left: 0,
    width: 237,
    height: 121,
    position: 'absolute',
  },
  rect7: {
    width: '100%',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(39,170,225,1)',
    flexDirection: 'row',
  },
  overSized: {
    // fontFamily: 'roboto-500',
    color: 'rgba(117,117,117,1)',
    fontSize: 22,
    marginLeft: 20,
  },
  materialCheckbox6Row: {
    height: 40,
    flexDirection: 'row',
    flex: 1,
    marginRight: 67,
    marginLeft: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  rect3StackStack: {
    width: 237,
    height: 180,
  },
  features: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 22,
    opacity: 0.79,
    marginTop: 20,
    marginLeft: 22,
  },
  button: {
    width: 130,
    height: 36,
    borderWidth: 1,
    borderColor: 'rgba(136,135,135,1)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guarded: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 18,
  },
  rect9: {
    width: 120,
    height: 36,
    borderWidth: 2,
    borderColor: 'rgba(11,64,148,1)',
    borderRadius: 34,
    marginLeft: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gated: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 18,
  },
  buttonRow: {
    // height: 40,
    flexDirection: 'row',
    marginTop: 11,
    marginLeft: 22,
    marginRight: 19,
  },
  rect10: {
    width: 100,
    height: 36,
    borderWidth: 2,
    borderColor: 'rgba(11,64,148,1)',
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  cctv: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 18,
  },
  rect11: {
    width: 140,
    height: 36,
    borderWidth: 1,
    borderColor: 'rgba(136,135,135,1)',
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheltered: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 18,
  },
  rect10Row: {
    height: 40,
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: 21,
    marginRight: 20,
  },
  rect12: {
    width: 180,
    height: 36,
    borderWidth: 1,
    borderColor: 'rgba(136,135,135,1)',
    borderRadius: 34,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledAccess: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 18,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Filter;
