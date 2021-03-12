import colors from '@parkyourself-frontend/shared/config/colors';
import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Modal
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

export const FilterContext = React.createContext({});

const FilterProvider = FilterContext.Provider;

export default function FilterButton({ children, modalVisible = false }) {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    // if (modalVisible) {
    setModal(modalVisible);
    // }
  }, [modalVisible]);
  return (
    <>
      <TouchableOpacity style={styles.filterRow} onPress={() => (children ? setModal(true) : null)}>
        <Text style={styles.filterText}>FILTER</Text>
        <AntDesignIcon name="downcircleo" style={styles.icon} />
      </TouchableOpacity>
      <Modal animationType="none" transparent={true} visible={modal}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flex: 1,
            // justifyContent: 'center',
            alignItems: 'flex-end',
            backgroundColor: 'rgba(52, 52, 52, 0.3)',
            paddingTop: Platform.OS === 'ios' ? 125 : 90,
            paddingRight: 20
          }}
          onPress={() => setModal(false)}>
          <TouchableWithoutFeedback>
            <FilterProvider value={{ setModal, modal }}>{children}</FilterProvider>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row'
  },
  icon: {
    color: 'black',
    fontSize: 15,
    marginLeft: 3,
    marginTop: Platform.OS === 'ios' ? 1 : 2
  },
  filterText: {
    fontWeight: '500'
  }
});
