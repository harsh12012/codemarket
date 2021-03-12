import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '@parkyourself-frontend/shared/config/colors';

export default function MenuItemDropdown(props) {
  const [menu, setMenu] = React.useState(false);
  
  return (
    <View style={[styles.container,{...props.styles}]}>
        <View style={styles.item}  >
            <View >
                <Text style={styles.label}>{props.label}</Text>
            </View>



                <TouchableOpacity onPress={() => setMenu(!menu)}>
                    <MaterialCommunityIconsIcon
                    name={menu ? 'chevron-down' : 'chevron-right'}
                    style={styles.icon}
                    />
                </TouchableOpacity>
           
            
        </View>
        {menu && (
            <View style={styles.dropItem}>
            <Text style={styles.dropLabel}>{props.option}</Text>
            </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{

    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation:4,
    marginBottom:10,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.26,
    shadowRadius: 3,
    backgroundColor: '#fff',
    
},
item: {
    width: '100%',
    flexDirection: 'row',
    justifyContent:'space-between'

  },
  label: { fontSize: 17, marginLeft: 10 },
  dropLabel: { fontSize: 16, marginLeft: 40, paddingTop: 15 },
  icon: { fontSize: 34, color: colors.primary },
  materialCIcon: {
    fontSize: 30,
    color: colors.secondary
  },
  featherIcon: {
    fontSize: 25,
    color: colors.secondary,
    marginHorizontal: 15
  }
})
