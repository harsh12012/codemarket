import React from 'react';
import { connect, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppDrawer from '../components/common/AppDrawer';
import HeaderLogo from '../components/HeaderLogo';
// import HeaderIcon from '../components/HeaderIcon';
// import MenuButton from '../components/MenuButton';
import AddListing from '../screens/SpaceOwner/AddListing';
import UserTabs from './UserTabs';
import AddVehicle from '../screens/AddVehicle';
import Payments from '../screens/PaymentScreen';
// import Payments from '../components/payment/CardScreen';
import AddCreditDebitCard from '../screens/AddCreditDebitCard';
import InboxScreen from '../components/inbox/Inbox';
import ChatScreen from '../screens/ChatScreen';
import MyReviews from '../screens/MyReviews';
import ReviewDetails from '../screens/ReviewDetails';
import ReferFriend from '../screens/ReferFriend';
import FAQScreen from '../screens/FAQScreen';
import FAQDetails from '../screens/FAQDetails';
import Settings from '../screens/Settings';
import TermsAndConditions from '../screens/TermsAndConditions';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import MoreDetails from '../screens/MoreDetails';
import Reviews from '../screens/Reviews';
import SuccessfullyBooked from '../screens/SuccessfullyBooked';
import CodeScreen from '../screens/CodeScreen';
import PayNowScreen from '../screens/PayNowScreen';
import CreateSpaceOwnerProfile from '../screens/SpaceOwner/CreateSpaceOwnerProfile';
import WithdrawalSettings from '../screens/SpaceOwner/WithdrawalSettings';
import StaffParkingOrders from '../screens/staff/StaffParkingOrders';
import AddReviewModal from '../components/addReviewModal';
import FaqTabs from '../components/admin/faq/FaqTabs';
import MyListings from '../screens/SpaceOwner/MyListings';
import UserRoles from '../screens/UserRoles';
import PayoutAndDeposit from '../screens/SpaceOwner/PayoutAndDeposit';
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

const drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const UserStack = () => {
  const admin = useSelector(({ auth }) => auth.data.admin);
  return (
    <Stack.Navigator screenOptions={{ headerBackTitle: 'Back' }}>
      <Stack.Screen
        name="Tab"
        component={UserTabs}
        options={{
          headerShown: false
          // headerBackTitle: 'Back'
        }}
      />
      <Stack.Screen name="AddListing" component={AddListing} options={{ headerShown: false }} />

      <Stack.Screen
        name="AddVehicle"
        component={AddVehicle}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="Payments"
        component={Payments}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="AddCreditDebitCard"
        component={AddCreditDebitCard}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="InboxScreen"
        component={InboxScreen}
        options={({ navigation }) => ({
          title: '',
          headerTitle: () => <HeaderLogo />
        })}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="MyReviews"
        component={MyReviews}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="ReviewDetails"
        component={ReviewDetails}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="ReferFriend"
        component={ReferFriend}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQScreen}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="FAQDetails"
        component={FAQDetails}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="PayNow"
        component={PayNowScreen}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={MoreDetails}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="Reviews"
        component={Reviews}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="SuccessfullyBooked"
        component={SuccessfullyBooked}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="CodeScreen"
        component={CodeScreen}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="CreateSpaceOwnerProfile"
        component={CreateSpaceOwnerProfile}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="WithdrawalSettings"
        component={WithdrawalSettings}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="StaffParkingOrders"
        component={StaffParkingOrders}
        options={{
          headerTitle: () => <HeaderLogo />,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          }
        }}
      />
      <Stack.Screen
        name="AddReviewModal"
        component={AddReviewModal}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="Payout&DepositScreen"
        component={PayoutAndDeposit}
        options={{ headerTitle: () => <HeaderLogo /> }}
      />
      <Stack.Screen
        name="UserProfileStack"
        component={UserRoles}
        options={({ navigation }) => ({
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },
          headerTitle: () => <HeaderLogo />,
          // headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitleAlign: 'center'
        })}
      />
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={({ navigation }) => ({
          // headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitleAlign: 'center'
        })}
      />
      {admin && (
        <>
          <Stack.Screen
            name="AdminBooking"
            component={AdminBooking}
            options={({ navigation }) => ({
              headerTitleAlign: 'center'
            })}
          />
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
        </>
      )}
    </Stack.Navigator>
  );
};

const DrawerStack = () => {
  return (
    <drawer.Navigator drawerContent={() => <AppDrawer />}>
      <drawer.Screen name="DrawerStack" component={UserStack} />
    </drawer.Navigator>
  );
};

export default DrawerStack;
// export default function UserDrawer() {
//   return (
//     <drawer.Navigator drawerContent={() => <AppDrawer />}>
//       <drawer.Screen name="UserStack" component={UserStack} />
//     </drawer.Navigator>
//   );
// }
