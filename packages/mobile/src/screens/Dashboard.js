/* eslint-disable react/jsx-indent-props */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import UserProfiles from './UserProfiles';

function Dashboard({navigation, profileType}) {
  return (
    <View style={styles.container}>
      <UserProfiles profileType={profileType} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 0,
    flex: 1,
    minHeight: '100%'
  }
});

const mapStateToProps = ({ user }) => ({
  profileType: user.profileType
});

export default connect(mapStateToProps, null)(Dashboard);