import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import colors from '@parkyourself-frontend/shared/config/colors';
import countries from '@parkyourself-frontend/shared/config/countries';
import RadioListItem from '../../RadioListItem';
import ScreenTittle from '../../common/ScreenTittle';

export default function CountryModal({ visible = false, onHide, onSelect, unit = 'Hours' }) {
  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onHide} style={styles.backBtn}>
              <AntDesignIcon name="close" size={28} color="#666" />
            </TouchableOpacity>
          </View>
          <ScreenTittle title="Select Unit" />
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <RadioListItem
              label="Minutes"
              checked={unit === 'Minutes'}
              onPress={() => onSelect(3600000, 'Minutes')}
            />
            <RadioListItem
              label="Hours"
              checked={unit === 'Hours'}
              onPress={() => onSelect(3600000, 'Hours')}
            />
            <RadioListItem
              label="Days"
              checked={unit === 'Days'}
              onPress={() => onSelect(86400000, 'Days')}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  scrollView: {
    marginTop: 5
  }
});
