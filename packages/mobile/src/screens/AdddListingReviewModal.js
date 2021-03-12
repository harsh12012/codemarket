import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Alert, Modal, Text, TouchableHighlight, View } from 'react-native';

const CustomModal = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure want to block this user ?</Text>
            <View style={styles.buttonStyle}>
              <TouchableHighlight
                style={{ ...styles.confirmButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>CONFIRM</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.cancelButton }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>CANCEL</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight>
    </View>
  );
};

export default CustomModal;

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: '#282D31',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  confirmButton: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginRight: 20,
    paddingRight: 40,
    paddingLeft: 40
  },
  cancelButton: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#007AEB',
    paddingRight: 40,
    paddingLeft: 40,
    backgroundColor: '#282D31'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#F8FDFF',
    fontSize: 18
  },
  buttonStyle: {
    display: 'flex',
    flexDirection: 'row'
  }
});
