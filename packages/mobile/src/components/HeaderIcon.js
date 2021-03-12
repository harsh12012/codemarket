/* eslint-disable react/jsx-indent */
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '@parkyourself-frontend/shared/config/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { color } from 'react-native-reanimated';

function HeaderIcon({navigation}) {
    return(
      <View>
          <TouchableOpacity 
            style={styles.iconWrapper}
            onPress={() => navigation.openDrawer()}
          >
            <MaterialIcons name="menu" style={styles.headerIcon} />
          </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    iconWrapper: {
        paddingLeft: 15,
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerIcon: {
        fontSize: 32,
        width: 24,
        color: colors.secondary
    }
});

export default HeaderIcon;