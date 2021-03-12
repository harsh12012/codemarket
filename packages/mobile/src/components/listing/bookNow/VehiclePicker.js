import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, ScrollView } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import colors from '@parkyourself-frontend/shared/config/colors';
import { useCRUDVehicle } from '@parkyourself-frontend/shared/hooks/vehicle';
import RadioListItem from '../../RadioListItem';
import AddVehicleModal from '../../vehicle/AddVehicleModal';

export default function DatePickerComponent({
  vehicleSelected = '',
  onChange = () => {},
  onClose
}) {
  const {
    allData: { vehicles },
    payload,
    setPayload,
    disabled,
    addVehicleHandler
  } = useCRUDVehicle();
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  return (
    <View style={styles.container}>
      <AntDesignIcon name="minus" style={styles.minusIcon} />
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <FontAwesomeIcon name="close" style={styles.closeIcon} />
      </TouchableOpacity>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Select Vehicle</Text>
      </View>
      <AddVehicleModal
        visible={showAddVehicleModal}
        onHide={() => setShowAddVehicleModal(false)}
        payload={payload}
        setPayload={setPayload}
        addVehicleHandler={addVehicleHandler}
        disabled={disabled}
      />
      <View style={styles.row}>
        <ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.secondary,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 15,
                marginTop: 10
              }}
              onPress={() => setShowAddVehicleModal(true)}>
              <Text style={{ color: colors.white }}>Add Vehicle</Text>
            </TouchableOpacity>
          </View>
          {vehicles.map((item) => (
            <RadioListItem
              key={item._id}
              label={`${item.make} ${item.model}`}
              checked={vehicleSelected === item._id}
              onPress={() => {
                onChange(item);
                onClose();
              }}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    paddingTop: 2,
    height: 400,
    alignItems: 'center'
  },
  minusIcon: { fontSize: 30, color: colors.grey, marginTop: -8, marginBottom: -5 },
  closeButton: {
    position: 'absolute',
    width: '100%',
    top: Platform.OS === 'ios' ? 19 : 24,
    right: 20,
    zIndex: 1
  },
  closeIcon: { fontSize: 30, color: colors.secondary, textAlign: 'right' },
  titleRow: { width: '100%' },
  title: {
    textAlign: 'center',
    color: colors.secondary,
    fontSize: 23,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  row: { flex: 1, justifyContent: 'flex-start', width: '100%' }
});
