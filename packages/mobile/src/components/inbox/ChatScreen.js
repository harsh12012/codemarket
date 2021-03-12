// import React, { useEffect, useState, useRef } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   Dimensions,
//   ScrollView,
//   TouchableOpacity
// } from 'react-native';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import FeatherIcon from 'react-native-vector-icons/Feather';
// import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
// import { gql, useQuery, useMutation, useSubscription } from '@apollo/client';
// import { connect } from 'react-redux';
// import { client } from '../../app/graphql';
// import moment from 'moment';
// import { FlatList } from 'react-native-gesture-handler';

// const MESSAGE_SUBSCRIPTION = gql`
//   subscription mySubscription($receiverId: String, $senderId: String) {
//     newMessageSub(receiverId: $receiverId, senderId: $senderId) {
//       _id
//       createdAt
//       listingLocation
//       message
//       receiverId
//       receiverName
//       senderId
//       senderName
//     }
//   }
// `;

// const GET_ALL_MESSAGES = gql`
//   query MyQuery($user1Id: String!, $user2Id: String!, $limit: Int, $page: Int) {
//     getAllMessages(user1Id: $user1Id, user2Id: $user2Id, limit: $limit, page: $page) {
//       count
//       messages {
//         _id
//         createdAt
//         listingLocation
//         message
//         receiverId
//         receiverName
//         senderId
//         senderName
//       }
//     }
//   }
// `;

// const SEND_ONE_MESSAGE = gql`
//   mutation MyMutation(
//     $listingLocation: String!
//     $message: String!
//     $receiverId: String!
//     $receiverName: String!
//     $senderId: String!
//     $senderName: String!
//   ) {
//     sendOneMessage(
//       listingLocation: $listingLocation
//       message: $message
//       receiverId: $receiverId
//       receiverName: $receiverName
//       senderId: $senderId
//       senderName: $senderName
//     ) {
//       senderName
//       senderId
//       receiverName
//       receiverId
//       message
//       listingLocation
//       createdAt
//       _id
//     }
//   }
// `;

// const win = Dimensions.get('window');
// //FOR GETTING USER MESSAGE
// const GET_MESSAGES = gql`
//   query GetDriverOwnerMessagesByListingId(
//     $listingId: String!
//     $driverId: String!
//     $ownerId: String!
//   ) {
//     getDriverOwnerMessagesByListingId(
//       listingId: $listingId
//       driverId: $driverId
//       ownerId: $ownerId
//     ) {
//       _id
//       body
//       listingId
//       listingAddress
//       driverId
//       driverName
//       ownerId
//       ownerName
//       senderName
//       createdAt
//     }
//   }
// `;
// //FOR GETING LISTING
// const GET_LISTING = gql`
//   query GetListing($id: ID!) {
//     getListing(id: $id) {
//       _id
//       ownerId
//       ownerName
//       ownerEmail
//       locationDetails {
//         address
//       }
//       reviews
//     }
//   }
// `;
// const CREATE_MESSAGE = gql`
//   mutation CreateMessage(
//     $body: String!
//     $listingId: String!
//     $listingAddress: String!
//     $driverId: String!
//     $driverName: String!
//     $ownerId: String!
//     $ownerName: String!
//     $senderName: String!
//   ) {
//     createMessage(
//       body: $body
//       listingId: $listingId
//       listingAddress: $listingAddress
//       driverId: $driverId
//       driverName: $driverName
//       ownerId: $ownerId
//       ownerName: $ownerName
//       senderName: $senderName
//     ) {
//       _id
//       body
//       listingId
//       listingAddress
//       driverId
//       driverName
//       ownerId
//       ownerName
//       senderName
//       createdAt
//     }
//   }
// `;
// const MESSAGE_SUBSCRIPTION = gql`
//   subscription AddMessage($listingId: String!, $driverId: String!, $ownerId: String!) {
//     addMessage(listingId: $listingId, driverId: $driverId, ownerId: $ownerId) {
//       _id
//       body
//       listingId
//       listingAddress
//       driverId
//       driverName
//       ownerId
//       ownerName
//       senderName
//       createdAt
//     }
//   }
// `;

// function ChatScreen({ route, userName, authenticated, userData }) {
//   const {
//     params: { listingId, ownerId, driverId, listingAddress, ownerName }
//   } = route;
//   const [messages, setMessages] = useState([]);
//   const [disabled, setDisabled] = useState(false);
//   const [message, setMessage] = useState('');
//   const [listing, setListing] = useState({});
//   const { loading, error, data } = useQuery(GET_MESSAGES, {
//     variables: { listingId: listingId, driverId: driverId, ownerId: ownerId }
//   });
//   const [createMessage] = useMutation(CREATE_MESSAGE);
//   const { data: addMessage } = useSubscription(MESSAGE_SUBSCRIPTION, {
//     variables: { listingId: listingId, driverId: driverId, ownerId: ownerId }
//   });
//   const scrollRef = useRef();
//   const onCreate = async (body) => {
//     // console.log(message);
//     try {
//       setDisabled(true);
//       let dId = '';
//       let dName = '';
//       if (messages.length === 0) {
//         dId = userData.sub;
//         dName = userData.name;
//       } else {
//         dId = messages[0].driverId;
//         dName = messages[0].driverName;
//       }
//       await createMessage({
//         variables: {
//           body: message,
//           listingId: listingId,
//           listingAddress: listingAddress,
//           driverId: dId,
//           driverName: dName,
//           ownerId: ownerId,
//           ownerName: ownerName,
//           senderName: userData.name
//         }
//       });
//       setDisabled(false);
//       // scrollRef.current.scrollToEnd({ animated: true });
//       setMessage('');
//     } catch (err) {
//       console.log('set message error', err);
//       setDisabled(false);
//     }
//   };
//   const addNewMessage = (message) => {
//     setMessages([...messages, addMessage.addMessage]);
//     //  window.scrollTo({ behavior: 'smooth', top: myRef.current.offsetTop });
//   };
//   //for scrolling to new message
//   useEffect(() => {
//     console.log(messages.length);
//     // scrollRef.current?.scrollTo({
//     //   y: messages.length * 200
//     // });
//   }, [messages.length]);
//   useEffect(() => {
//     if (addMessage) {
//       addNewMessage(addMessage.addMessage);
//     }
//   }, [addMessage]);
//   useEffect(() => {
//     client
//       .query({
//         query: GET_LISTING,
//         variables: { id: listingId }
//       })
//       .then(({ data }) => {
//         console.log('getlisting', data.getListing);
//         setListing(data.getListing);
//         return data.getListing;
//       })
//       .catch((err) => {
//         console.log('listing err');
//       });
//   }, []);
//   // console.log(messages);
//   useEffect(() => {
//     if (data) {
//       setMessages(data.getDriverOwnerMessagesByListingId);
//     }
//     // scrollRef.current.scrollToEnd({ animated: true });
//   }, [data]);
//   if (!authenticated)
//     return <Text style={styles.loremIpsum}>Please signin to access this page</Text>;
//   return (
//     <View style={styles.container}>
//       <Text style={styles.gabrielaPepe}>{messages[0]?.ownerName}</Text>
//       <Text style={styles.loremIpsum}>{messages[0]?.listingAddress}</Text>
//       <View style={{ marginBottom: 100 }}>
//         <FlatList
//           data={messages}
//           // inverted={-1}
//           // initialScrollIndex={1}
//           ref={scrollRef}
//           onContentSizeChange={() => scrollRef.current.scrollToEnd()}
//           renderItem={({ item, index }) =>
//             item.senderName === userName ? (
//               <View style={[styles.rect5, { marginBottom: 50 }]}>
//                 <View style={styles.rect4Row}>
//                   <View style={styles.rect4}>
//                     <Text style={styles.loremIpsum4}>{item.body}</Text>
//                     <Text style={styles.loremIpsum5}>
//                       {moment(item.createdAt).format('hh:mm a')}
//                     </Text>
//                   </View>
//                   <FontAwesomeIcon name="user-circle" style={styles.icon1} />
//                 </View>
//               </View>
//             ) : (
//               <View style={styles.rect2} key={index}>
//                 <View style={styles.iconRow}>
//                   <FontAwesomeIcon name="user-circle" style={styles.icon} />
//                   <View style={styles.rect3}>
//                     <Text style={styles.loremIpsum2}>{item.body}</Text>
//                     <Text style={styles.loremIpsum3}>
//                       {' '}
//                       {moment(item.createdAt).format('hh:mm a')}
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             )
//           }
//         />
//         {/* <ScrollView ref={scrollRef} contentContainerStyle={styles.rectStack}>
//           {messages &&
//             messages.map((message, index) =>
//               message.senderName === userName ? (
//                 <View style={[styles.rect5, { marginBottom: 50 }]}>
//                   <View style={styles.rect4Row}>
//                     <View style={styles.rect4}>
//                       <Text style={styles.loremIpsum4}>{message.body}</Text>
//                       <Text style={styles.loremIpsum5}>
//                         {moment(message.createdAt).format('hh:mm a')}
//                       </Text>
//                     </View>
//                     <FontAwesomeIcon name="user-circle" style={styles.icon1} />
//                   </View>
//                 </View>
//               ) : (
//                 <View style={styles.rect2} key={index}>
//                   <View style={styles.iconRow}>
//                     <FontAwesomeIcon name="user-circle" style={styles.icon} />
//                     <View style={styles.rect3}>
//                       <Text style={styles.loremIpsum2}>{message.body}</Text>
//                       <Text style={styles.loremIpsum3}>
//                         {' '}
//                         {moment(message.createdAt).format('hh:mm a')}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               )
//             )}
//         </ScrollView> */}
//       </View>
//       {/* CREATE MESSAGE SECTION */}
//       <View style={styles.rect10Stack}>
//         <View style={styles.rect11}>
//           <View style={styles.icon5Row}>
//             <FeatherIcon name="camera" style={styles.icon5} />
//             <TextInput
//               value={message}
//               placeholder="Type a Comment"
//               placeholderTextColor="rgba(11,64,148,1)"
//               style={styles.typeAComment}
//               returnKeyType="done"
//               onChangeText={(message) => setMessage(message)}
//             />
//             <SimpleLineIconsIcon name="paper-clip" style={styles.icon6} />
//           </View>
//           <TouchableOpacity onPress={onCreate} disabled={disabled} style={styles.rect12}>
//             <FeatherIcon name="arrow-right" style={styles.icon4} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const mapStateToProps = ({ auth, user }) => ({
//   userData: auth.data.attributes,
//   isSpaceOwner: user.isSpaceOwner,
//   authenticated: auth.authenticated,
//   userName: auth.authenticated ? auth.data.attributes.name : null
// });
// export default connect(mapStateToProps)(ChatScreen);
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20
//   },
//   gabrielaPepe: {
//     // fontFamily: 'roboto-500',
//     color: 'rgba(11,64,148,1)',
//     fontSize: 24
//   },
//   loremIpsum: {
//     // fontFamily: 'roboto-300',
//     color: 'rgba(11,64,148,1)',
//     fontSize: 18,
//     marginTop: 8
//   },
//   rect: {
//     // top: 86,
//     // left: 1,
//     // width: 375,
//     // height: 525,
//     // position: 'absolute',
//   },
//   rect5: {
//     width: 375,
//     // height: 127,
//     flexDirection: 'row'
//     // marginTop: 41,
//     // marginBottom: 20
//   },
//   rect4: {
//     width: 238,
//     // height: 105,
//     backgroundColor: 'rgba(39,170,225,1)'
//   },
//   loremIpsum4: {
//     // fontFamily: 'roboto-regular',
//     color: 'rgba(255,255,255,1)',
//     fontSize: 15,
//     lineHeight: 22,
//     marginTop: 11,
//     marginLeft: 13
//   },
//   loremIpsum5: {
//     // fontFamily: 'roboto-regular',
//     color: 'rgba(214,214,214,1)',
//     fontSize: 13,
//     marginTop: 4,
//     marginLeft: 174
//   },
//   icon1: {
//     color: 'rgba(128,128,128,1)',
//     fontSize: 50,
//     height: 50,
//     width: 50,
//     marginLeft: 9,
//     marginTop: 55
//   },
//   rect4Row: {
//     // height: 105,
//     flexDirection: 'row',
//     flex: 1,
//     marginRight: 17,
//     marginLeft: 61,
//     marginTop: 12
//   },
//   icon3: {
//     color: 'rgba(128,128,128,1)',
//     fontSize: 50,
//     height: 50,
//     width: 50,
//     marginTop: 43
//   },
//   loremIpsum8: {
//     top: 64,
//     left: 169,
//     position: 'absolute',
//     // fontFamily: 'roboto-regular',
//     color: 'rgba(11,64,148,1)',
//     fontSize: 13
//   },
//   loremIpsum8Stack: {
//     top: 0,
//     left: 0,
//     width: 233,
//     height: 93,
//     position: 'absolute'
//   },
//   loremIpsum9: {
//     top: 14,
//     left: 13,
//     position: 'absolute',
//     // fontFamily: 'roboto-regular',
//     color: '#121212',
//     lineHeight: 22,
//     fontSize: 15
//   },
//   loremIpsum8StackStack: {
//     width: 233,
//     height: 93,
//     marginLeft: 10
//   },
//   rect6: {
//     width: 238,
//     height: 105,
//     backgroundColor: 'rgba(39,170,225,1)'
//   },
//   loremIpsum7: {
//     // fontFamily: 'roboto-regular',
//     color: 'rgba(255,255,255,1)',
//     fontSize: 15,
//     lineHeight: 22,
//     marginTop: 11,
//     marginLeft: 14
//   },
//   loremIpsum6: {
//     // fontFamily: 'roboto-regular',
//     color: 'rgba(214,214,214,1)',
//     fontSize: 13,
//     marginTop: 3,
//     marginLeft: 174
//   },
//   icon2: {
//     color: 'rgba(128,128,128,1)',
//     fontSize: 50,
//     height: 50,
//     width: 50,
//     marginLeft: 10,
//     marginTop: 55
//   },
//   rect6Row: {
//     height: 105,
//     flexDirection: 'row',
//     marginTop: 36,
//     marginLeft: 60,
//     marginRight: 17
//   },
//   rect2: {
//     // top: 0,
//     // left: 1,
//     width: 375,
//     // height: 114,
//     marginBottom: 20,
//     marginTop: 20,
//     // position: 'absolute',
//     flexDirection: 'row'
//   },
//   icon: {
//     color: 'rgba(128,128,128,1)',
//     fontSize: 50,
//     height: 50,
//     width: 50,
//     marginTop: 42
//   },
//   rect3: {
//     width: 233,
//     height: 93,
//     borderWidth: 1,
//     borderColor: 'rgba(214,214,214,1)',
//     marginLeft: 9
//   },
//   loremIpsum2: {
//     // fontFamily: 'roboto-regular',
//     color: '#121212',
//     lineHeight: 22,
//     fontSize: 15,
//     marginTop: 13,
//     marginLeft: 14
//   },
//   loremIpsum3: {
//     // fontFamily: 'roboto-regular',
//     color: 'rgba(11,64,148,1)',
//     fontSize: 13,
//     marginTop: 6,
//     marginLeft: 170
//   },
//   iconRow: {
//     height: 93,
//     flexDirection: 'row',
//     flex: 1,
//     marginRight: 67,
//     marginLeft: 16,
//     marginTop: 11
//   },
//   rect7: {
//     top: 484,
//     left: 0,
//     width: 375,
//     height: 127,
//     position: 'absolute'
//   },
//   rect9: {
//     top: 271,
//     left: 0,
//     width: 375,
//     height: 114,
//     position: 'absolute'
//   },
//   rectStack: {
//     width: 376,
//     // height: 500,
//     marginTop: 32,
//     marginLeft: -1
//   },
//   rect10: {
//     // top: 0,
//     // left: 1,
//     width: '100%',
//     height: 57
//     // position: 'absolute',
//   },
//   rect12: {
//     width: '15%',
//     height: 57,
//     backgroundColor: 'rgba(39,170,225,1)'
//     // marginLeft: 315,
//   },
//   icon4: {
//     color: 'rgba(255,255,255,1)',
//     fontSize: 30,
//     height: 30,
//     width: 30,
//     marginTop: 14,
//     marginLeft: 17
//   },
//   rect11: {
//     // top: 0,
//     // left: 0,
//     width: '100%',
//     height: 58,
//     // position: 'absolute',
//     flexDirection: 'row'
//   },
//   icon5: {
//     color: 'rgba(11,64,148,1)',
//     fontSize: 25,
//     height: 25,
//     width: 25,
//     marginTop: 17
//   },
//   typeAComment: {
//     // fontFamily: 'roboto-regular',
//     color: '#121212',
//     height: 57,
//     width: 224,
//     marginLeft: 9
//   },
//   icon6: {
//     color: 'rgba(39,170,225,1)',
//     fontSize: 22,
//     height: 25,
//     width: 22,
//     marginLeft: 13,
//     marginTop: 17
//   },
//   icon5Row: {
//     width: '80%',
//     // height: 57,
//     flexDirection: 'row',
//     flex: 1,
//     marginRight: 9,
//     marginLeft: 14
//   },
//   rect10Stack: {
//     // width: '100%',
//     width: win.width,
//     height: 58,
//     position: 'absolute',
//     bottom: 0,
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around'
//   }
// });

import { useChatBox } from '@parkyourself-frontend/shared/hooks/inbox';
import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import { gql, useQuery, useMutation, useSubscription } from '@apollo/client';
import { connect } from 'react-redux';
import { client } from '../../app/graphql';
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';

const win = Dimensions.get('window');

function ChatScreen({ route, userName, authenticated, userData }) {
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);
  const {
    params: { user1Id, user2Id, listingLocation }
  } = route;
  const { loading, allData, onSend, error, loadMore } = useChatBox({
    user1Id,
    user2Id,
    listingLocation
  });

  const onSubmit = async () => {
    try {
      setDisabled(true);
      await onSend(message);
      setMessage('');
    } catch (err) {
      setDisabled(false);
    }
  };

  const scrollRef = useRef();

  if (!authenticated)
    return <Text style={styles.loremIpsum}>Please signin to access this page</Text>;
  return (
    <View style={styles.container}>
      {/* <Text style={styles.gabrielaPepe}>{messages[0]?.ownerName}</Text>
      <Text style={styles.loremIpsum}>{messages[0]?.listingAddress}</Text> */}
      <View style={{ marginBottom: 100 }}>
        <FlatList
          data={allData?.messages?.slice(0).reverse()}
          ref={scrollRef}
          keyExtractor={(item, index) => 'key' + index}
          onContentSizeChange={() => scrollRef.current.scrollToEnd()}
          renderItem={({ item, index }) =>
            item.senderName === userName ? (
              <View style={[styles.rect5, { marginBottom: 50 }]}>
                <View style={styles.rect4Row}>
                  <View style={styles.rect4}>
                    <Text style={styles.loremIpsum4}>{item.message}</Text>
                    <Text style={styles.loremIpsum5}>
                      {moment(item.createdAt).format('hh:mm a')}
                    </Text>
                  </View>
                  <FontAwesomeIcon name="user-circle" style={styles.icon1} />
                </View>
              </View>
            ) : (
              <View style={styles.rect2} key={index}>
                <View style={styles.iconRow}>
                  <FontAwesomeIcon name="user-circle" style={styles.icon} />
                  <View style={styles.rect3}>
                    <Text style={styles.loremIpsum2}>{item.message}</Text>
                    <Text style={styles.loremIpsum3}>
                      {' '}
                      {moment(item.createdAt).format('hh:mm a')}
                    </Text>
                  </View>
                </View>
              </View>
            )
          }
        />
      </View>
      {/* CREATE MESSAGE SECTION */}
      <View style={styles.rect10Stack}>
        <View style={styles.rect11}>
          <View style={styles.icon5Row}>
            <FeatherIcon name="camera" style={styles.icon5} />
            <TextInput
              value={message}
              placeholder="Type a Comment"
              placeholderTextColor="rgba(11,64,148,1)"
              style={styles.typeAComment}
              returnKeyType="done"
              onChangeText={(message) => setMessage(message)}
            />
            <SimpleLineIconsIcon name="paper-clip" style={styles.icon6} />
          </View>
          <TouchableOpacity onPress={onSubmit} disabled={disabled} style={styles.rect12}>
            <FeatherIcon name="arrow-right" style={styles.icon4} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = ({ auth, user }) => ({
  userData: auth.data.attributes,
  isSpaceOwner: user.isSpaceOwner,
  authenticated: auth.authenticated,
  userName: auth.authenticated ? auth.data.attributes.name : null
});
export default connect(mapStateToProps)(ChatScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  gabrielaPepe: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24
  },
  loremIpsum: {
    // fontFamily: 'roboto-300',
    color: 'rgba(11,64,148,1)',
    fontSize: 18,
    marginTop: 8
  },
  rect: {
    // top: 86,
    // left: 1,
    // width: 375,
    // height: 525,
    // position: 'absolute',
  },
  rect5: {
    width: 375,
    // height: 127,
    flexDirection: 'row'
    // marginTop: 41,
    // marginBottom: 20
  },
  rect4: {
    width: 238,
    // height: 105,
    backgroundColor: 'rgba(39,170,225,1)'
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 11,
    marginLeft: 13
  },
  loremIpsum5: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(214,214,214,1)',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 174
  },
  icon1: {
    color: 'rgba(128,128,128,1)',
    fontSize: 50,
    height: 50,
    width: 50,
    marginLeft: 9,
    marginTop: 55
  },
  rect4Row: {
    // height: 105,
    flexDirection: 'row',
    flex: 1,
    marginRight: 17,
    marginLeft: 61,
    marginTop: 12
  },
  icon3: {
    color: 'rgba(128,128,128,1)',
    fontSize: 50,
    height: 50,
    width: 50,
    marginTop: 43
  },
  loremIpsum8: {
    top: 64,
    left: 169,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    fontSize: 13
  },
  loremIpsum8Stack: {
    top: 0,
    left: 0,
    width: 233,
    height: 93,
    position: 'absolute'
  },
  loremIpsum9: {
    top: 14,
    left: 13,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 22,
    fontSize: 15
  },
  loremIpsum8StackStack: {
    width: 233,
    height: 93,
    marginLeft: 10
  },
  rect6: {
    width: 238,
    height: 105,
    backgroundColor: 'rgba(39,170,225,1)'
  },
  loremIpsum7: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 11,
    marginLeft: 14
  },
  loremIpsum6: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(214,214,214,1)',
    fontSize: 13,
    marginTop: 3,
    marginLeft: 174
  },
  icon2: {
    color: 'rgba(128,128,128,1)',
    fontSize: 50,
    height: 50,
    width: 50,
    marginLeft: 10,
    marginTop: 55
  },
  rect6Row: {
    height: 105,
    flexDirection: 'row',
    marginTop: 36,
    marginLeft: 60,
    marginRight: 17
  },
  rect2: {
    // top: 0,
    // left: 1,
    width: 375,
    // height: 114,
    marginBottom: 20,
    marginTop: 20,
    // position: 'absolute',
    flexDirection: 'row'
  },
  icon: {
    color: 'rgba(128,128,128,1)',
    fontSize: 50,
    height: 50,
    width: 50,
    marginTop: 42
  },
  rect3: {
    width: 233,
    height: 93,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginLeft: 9
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    lineHeight: 22,
    fontSize: 15,
    marginTop: 13,
    marginLeft: 14
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    fontSize: 13,
    marginTop: 6,
    marginLeft: 170
  },
  iconRow: {
    height: 93,
    flexDirection: 'row',
    flex: 1,
    marginRight: 67,
    marginLeft: 16,
    marginTop: 11
  },
  rect7: {
    top: 484,
    left: 0,
    width: 375,
    height: 127,
    position: 'absolute'
  },
  rect9: {
    top: 271,
    left: 0,
    width: 375,
    height: 114,
    position: 'absolute'
  },
  rectStack: {
    width: 376,
    // height: 500,
    marginTop: 32,
    marginLeft: -1
  },
  rect10: {
    // top: 0,
    // left: 1,
    width: '100%',
    height: 57
    // position: 'absolute',
  },
  rect12: {
    width: '15%',
    height: 57,
    backgroundColor: 'rgba(39,170,225,1)'
    // marginLeft: 315,
  },
  icon4: {
    color: 'rgba(255,255,255,1)',
    fontSize: 30,
    height: 30,
    width: 30,
    marginTop: 14,
    marginLeft: 17
  },
  rect11: {
    // top: 0,
    // left: 0,
    width: '100%',
    height: 58,
    // position: 'absolute',
    flexDirection: 'row'
  },
  icon5: {
    color: 'rgba(11,64,148,1)',
    fontSize: 25,
    height: 25,
    width: 25,
    marginTop: 17
  },
  typeAComment: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 57,
    width: 224,
    marginLeft: 9
  },
  icon6: {
    color: 'rgba(39,170,225,1)',
    fontSize: 22,
    height: 25,
    width: 22,
    marginLeft: 13,
    marginTop: 17
  },
  icon5Row: {
    width: '80%',
    // height: 57,
    flexDirection: 'row',
    flex: 1,
    marginRight: 9,
    marginLeft: 14
  },
  rect10Stack: {
    // width: '100%',
    width: win.width,
    height: 58,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
