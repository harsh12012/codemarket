import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminDashboard from '../screens/admin/AdminDashboard';
import AdminBooking from '../screens/admin/AdminBooking';
import AdminParking from '../screens/admin/AdminParking';
import AdminPropertyType from '../screens/admin/AdminPropertyType';
import AdminListingType from '../screens/admin/AdminListingType';
import AdminAppFee from '../screens/admin/AdminAppFee';
import AdminPrivacyPolicy from '../screens/admin/AdminPrivacyPolicy';
import AdminFAQ from '../screens/admin/AdminFAQ';
import AdminUsers from '../screens/admin/AdminUsers';
import AdminUserProfile from '../screens/admin/AdminUserProfile';
import AdminRegStats from '../screens/admin/AdminRegStats';
// import DatePicker from '../screens/admin/DatePicker';
import AppDrawer from '../components/common/AppDrawer';
import HeaderLogo from '../components/HeaderLogo';
import MenuButton from '../components/MenuButton';

const drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
        headerTitle: () => <HeaderLogo />,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0
        }
      }}>
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={({ navigation }) => ({
          // headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitleAlign: 'center'
        })}
      />
      <Stack.Screen
        name="AdminBooking"
        component={AdminBooking}
        options={({ navigation }) => ({
          headerTitleAlign: 'center'
        })}
      />
      {/* <Stack.Screen
        name="DatePicker"
        component={DatePicker}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center'
        })}
      /> */}
      <Stack.Screen
        name="AdminParking"
        component={AdminParking}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center'
        })}
      />
      <Stack.Screen
        name="AdminUsers"
        component={AdminUsers}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center'
        })}
      />
      <Stack.Screen
        name="AdminUserProfile"
        component={AdminUserProfile}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center'
        })}
      />
      <Stack.Screen
        name="AdminPropertyType"
        component={AdminPropertyType}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center'
        })}
      />
      <Stack.Screen
        name="AdminListingType"
        component={AdminListingType}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center'
        })}
      />
      <Stack.Screen
        name="AdminAppFee"
        component={AdminAppFee}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center'
        })}
      />
      <Stack.Screen
        name="AdminRegStats"
        component={AdminRegStats}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center'
        })}
      />
      <Stack.Screen
        name="AdminPrivacyPolicy"
        component={AdminPrivacyPolicy}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center'
        })}
      />
       <Stack.Screen
        name="AdminFAQ"
        component={AdminFAQ}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center'
        })}
      />
    </Stack.Navigator>
  );
};

// export default function SpaceOwnerDrawer() {
//   return (
//     <drawer.Navigator drawerContent={() => <AppDrawer />}>
//       <drawer.Screen name="AdminStack" component={AdminStack} />
//     </drawer.Navigator>
//   );
// }

export default AdminStack;
