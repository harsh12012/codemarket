import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ScreenTittle from '../common/ScreenTittle';
import { gql } from '@apollo/client';
import { connect } from 'react-redux';
import moment from 'moment';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import colors from '@parkyourself-frontend/shared/config/colors';
import LoadingSpinner from '../common/LoadingSpinner';

const GET_INBOX = gql`
  query MyQuery($userId: String!) {
    getInbox(userId: $userId) {
      _id
      lastMessage {
        _id
        createdAt
        listingLocation
        message
        receiverId
        receiverName
        senderId
        senderName
      }
    }
  }
`;
export function useGetInbox({ userId }) {
  const { loading, data, error } = useQuery(GET_INBOX, {
    variables: {
      userId
    },
    fetchPolicy: 'cache-and-network' // 'cache-and-network' //'network-only'
  });
  return { loading, data, error };
}
function Inbox({ navigation, userData, route, userId, isSpaceOwner }) {
  const { loading, data, error } = useGetInbox({
    userId: isSpaceOwner ? route?.params?.id : userId
  });

  if (error) {
    return (
      <View style={styles.centerView}>
        <Text>Something went wrong</Text>
      </View>
    );
  }
  return (
    // <Text>Loading</Text>
    <ScrollView contentContainerStyle={styles.container}>
      <ScreenTittle title="Inbox" />
      {loading ? (
        <View style={styles.centerView}>
          <LoadingSpinner />
        </View>
      ) : data?.getInbox?.length > 0 ? (
        data?.getInbox?.map((message, index) => {
          // console.log(message[message?.length - 1].body.length);
          return (
            <TouchableOpacity
              key={index}
              style={styles.rect}
              onPress={() => {
                navigation.navigate('ChatScreen', {
                  user1Id: message?.lastMessage?.senderId,
                  user2Id: message?.lastMessage?.receiverId,
                  listingLocation: message?.lastMessage?.listingLocation
                });
              }}>
              <View style={styles.iconRow}>
                <FontAwesomeIcon name="user-circle" style={styles.icon} />
                <View style={styles.rect2}>
                  <View style={styles.gabrielaPepeRow}>
                    <Text style={styles.gabrielaPepe}>{message?.lastMessage?.senderName}</Text>
                    {/* <Text style={styles.loremIpsum}>
                    {moment(new Date(message[message.length - 1].createdAt)).fromNow()}
                  </Text> */}
                  </View>
                  <Text style={styles.loremIpsum2}>{message?.lastMessage?.listingLocation}</Text>
                  <Text style={styles.loremIpsum3}>
                    {message?.lastMessage?.message.length > 15
                      ? message?.lastMessage?.message.substring(0, 30) + '...'
                      : message?.lastMessage?.message}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <View style={styles.centerView}>
          <Text>No messages found</Text>
        </View>
      )}
    </ScrollView>
  );
}
const mapStateToProps = ({ auth, user }) => ({
  userData: auth.data.attributes,
  isSpaceOwner: user.isSpaceOwner
});
export default connect(mapStateToProps)(Inbox);
const styles = StyleSheet.create({
  centerView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10
  },
  inbox: {
    color: 'rgba(11,64,148,1)',
    fontSize: 24
  },
  rect: {
    width: '100%',
    // height: 124,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 15,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    flexDirection: 'row',
    marginTop: 21,
    backgroundColor: '#fff'
    // marginLeft: 21,
  },
  icon: {
    color: 'rgba(128,128,128,1)',
    fontSize: 58,
    height: 58,
    width: 58,
    marginTop: 15
  },
  rect2: {
    width: 264,
    height: 124,
    marginLeft: 2
  },
  gabrielaPepe: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 13,
    marginLeft: 55,
    marginTop: 4
  },
  gabrielaPepeRow: {
    height: 22,
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 11,
    marginRight: 13
  },
  loremIpsum2: {
    // fontFamily: 'roboto-300',
    color: 'rgba(39,170,225,1)',
    fontSize: 13,
    marginTop: 11,
    marginLeft: 12
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    marginTop: 8,
    marginLeft: 14
  },
  iconRow: {
    // height: 124,
    flexDirection: 'row',
    flex: 1,
    marginLeft: 14
  },
  loremIpsum4: {
    top: 72,
    left: 88,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212'
  },
  rect3: {
    top: 0,
    left: 74,
    width: 264,
    height: 124,
    position: 'absolute'
  },
  rect4: {
    top: 0,
    left: 0,
    width: 338,
    height: 124,
    position: 'absolute',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 60,
    shadowOpacity: 0.1,
    shadowRadius: 20
  },
  loremIpsum4Stack: {
    top: 0,
    left: 0,
    width: 338,
    height: 124,
    position: 'absolute'
  },
  loremIpsum5: {
    top: 48,
    left: 86,
    position: 'absolute',
    // fontFamily: 'roboto-300',
    color: 'rgba(39,170,225,1)',
    fontSize: 13
  },
  loremIpsum6: {
    top: 19,
    left: 268,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 13
  },
  gabrielaPepe1: {
    top: 15,
    left: 85,
    position: 'absolute',
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18
  },
  icon1: {
    top: 15,
    left: 14,
    position: 'absolute',
    color: 'rgba(128,128,128,1)',
    fontSize: 58
  },
  loremIpsum4StackStack: {
    width: 338,
    height: 124,
    marginTop: 17,
    marginLeft: 21
  }
});
