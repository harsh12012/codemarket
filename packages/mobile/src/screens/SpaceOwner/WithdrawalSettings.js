import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialButtonPrimary from '../../components/MaterialButtonPrimary';
import {loadUserListings, addListingLocal} from '../../app/redux/actions/user';
import {WebView} from 'react-native-webview';
import {gql, useQuery} from '@apollo/client';
import {client} from '../../app/graphql';

const redirectURL = 'https://d31ww6a0jzwr1h.cloudfront.net/';

const stripe_Retrieve_Account = gql`
  query StripeRetrieveAccount($userId: String!) {
    stripeRetrieveAccount(userId: $userId)
  }
`;

const stripe_Create_Login_Link_Account = gql`
  query stripeCreateLoginLinkAccount($userId: String!) {
    stripeCreateLoginLinkAccount(userId: $userId)
  }
`;

const stripe_Create_Account_Links = gql`
  query StripeCreateAccountLinks(
    $userId: String!
    $email: String!
    $type: String!
    $refresh_url: String!
    $return_url: String!
  ) {
    stripeCreateAccountLinks(
      userId: $userId
      email: $email
      type: $type
      refresh_url: $refresh_url
      return_url: $return_url
    )
  }
`;

function WithdrawalSettings({
  navigation,
  listings,
  loadUserListings,
  userId,
  userEmail,
}) {
  const {loading: queryLoading, error, data} = useQuery(
    stripe_Retrieve_Account,
    {
      variables: {userId: userId},
    },
  );

  const [disabled, setDisabled] = useState(false);
  const [URL, setURL] = useState(false);
  const [showWebView, setShowWebView] = useState(false);

  // const getListings = async () => {
  //   try {
  //     setLoading(true);
  //     await ListingService.getMyListingService(userId, loadUserListings);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getListings();
  // }, []);

  const onClickAccountLink = async () => {
    try {
      setDisabled(true);
      const link = await client.query({
        query: stripe_Create_Account_Links,
        variables: {
          userId: userId,
          email: userEmail,
          type: 'account_onboarding',
          refresh_url: redirectURL,
          return_url: redirectURL,
        },
      });
      setDisabled(false);
      // Linking.openURL(JSON.parse(link.data.stripeCreateAccountLinks).url);
      setURL(JSON.parse(link.data.stripeCreateAccountLinks).url);
      setShowWebView(true);
    } catch (error) {
      setDisabled(false);
      Alert.alert('Something went wrong!');
    }
  };

  const onClickLoginLink = async () => {
    try {
      setDisabled(true);
      const loginLink = await client.query({
        query: stripe_Create_Login_Link_Account,
        variables: {
          userId: userId,
        },
      });

      setURL(JSON.parse(loginLink.data.stripeCreateLoginLinkAccount).url);
      setShowWebView(true);
      setDisabled(false);
      // Linking.openURL(
      //   JSON.parse(loginLink.data.stripeCreateLoginLinkAccount).url,
      // );
    } catch (error) {
      console.log('loginLink == ', error);
      setDisabled(false);
      Alert.alert('Something went wrong!');
    }
  };

  const onLoadStart = ({nativeEvent}) => {
    if (nativeEvent.url === redirectURL) {
      setShowWebView(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.myListings4Row}>
        <Text style={styles.myListings4}>Withdrawal Settings</Text>
        {showWebView && (
          <View style={styles.rect}>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowWebView(false)}>
                <FontAwesomeIcon
                  name="remove"
                  style={styles.icon}></FontAwesomeIcon>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      {showWebView ? (
        <WebView
          originWhitelist={['*']}
          source={{uri: URL}}
          onLoadStart={onLoadStart}
        />
      ) : (
        <View style={styles.noItemsFound}>
          {queryLoading && <ActivityIndicator color="#27aae1" size="large" />}
          {data && (
            <>
              {JSON.parse(data.stripeRetrieveAccount) === null ||
              JSON.parse(data.stripeRetrieveAccount).details_submitted ===
                false ? (
                disabled ? (
                  <ActivityIndicator color="#27aae1" size="large" />
                ) : (
                  <MaterialButtonPrimary
                    onPress={onClickAccountLink}
                    caption="Add Withdrawal Settings"
                    style={styles.materialButtonPrimary}
                  />
                )
              ) : (
                <>
                  <View style={styles.heading}>
                    <Text style={styles.headingText}>
                      Stripe Account Connected
                    </Text>
                    <FeatherIcon
                      name="check-circle"
                      style={styles.headingIcon}
                    />
                  </View>
                  {disabled ? (
                    <ActivityIndicator color="#27aae1" size="large" />
                  ) : (
                    <MaterialButtonPrimary
                      onPress={onClickLoginLink}
                      caption="Update Withdrawal Settings"
                      style={styles.materialButtonPrimary}
                    />
                  )}
                </>
              )}
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    display: 'flex',
    // flex: 1,
    flexDirection: 'row',
  },
  headingText: {
    fontSize: 20,
  },
  headingIcon: {
    fontSize: 25,
    // color: 'rgba(11,64,148,1)',
    color: 'green',
    marginLeft: 5,
    marginTop: 1,
  },
  materialButtonPrimary: {
    width: 170,
    // height: 40,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    elevation: 20,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 15,
    alignSelf: 'center',
    backgroundColor: '#0b4094',
    paddingVertical: 15,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  myListings4: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24,
  },
  rect: {
    width: 63,
    height: 29,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    flexDirection: 'row',
    marginLeft: 98,
  },
  button: {
    // fontSize: 39,
    // width: 31,
    // height: 29,
    // borderWidth: 1,
    // borderColor: 'rgba(214,214,214,1)',
    // borderTopLeftRadius: 7,
    // borderBottomLeftRadius: 7,
  },
  icon: {
    color: 'rgba(11,64,148,1)',
    fontSize: 35,
    // height: 16,
    // width: 15,
    // marginTop: 6,
    // marginLeft: 9,
  },
  button2: {
    width: 31,
    height: 29,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginLeft: 1,
  },
  icon2: {
    color: 'rgba(39,170,225,1)',
    fontSize: 16,
    height: 16,
    width: 16,
    marginTop: 7,
    marginLeft: 7,
  },
  buttonRow: {
    height: 29,
    flexDirection: 'row',
    flex: 1,
  },
  myListings4Row: {
    height: 30,
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  rect8: {
    top: 1,
    left: 0,
    width: '100%',
    height: 154,
    // position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(197,196,196,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    elevation: 20,
    shadowOpacity: 0.17,
    shadowRadius: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  rect9: {
    width: 82,
    height: 36,
    borderWidth: 1,
    borderColor: 'rgba(39,170,225,1)',
    marginTop: 1,
  },
  login: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 13,
    marginTop: 11,
    marginLeft: 21,
  },
  materialButtonPrimary1: {
    height: 36,
    width: 120,
    marginLeft: 8,
  },
  rect2: {
    width: 95,
    height: 36,
    borderWidth: 1,
    borderColor: 'rgba(39,170,225,1)',
    marginLeft: 8,
    marginTop: 1,
  },
  modify: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 13,
    marginTop: 11,
    marginLeft: 24,
  },
  rect9Row: {
    height: 37,
    flexDirection: 'row',
    flex: 1,
    marginRight: 13,
    marginLeft: 14,
    marginTop: 100,
  },
  rect7: {
    top: 0,
    left: 1,
    width: 330,
    height: 85,
    position: 'absolute',
  },
  image1: {
    top: 12,
    left: 12,
    width: 60,
    height: 60,
    position: 'absolute',
    borderRadius: 100,
  },
  rect6: {
    top: 0,
    left: 0,
    width: 82,
    height: 85,
    position: 'absolute',
  },
  image1Stack: {
    width: 82,
    height: 85,
  },
  rect5: {
    top: 0,
    left: 186,
    width: 50,
    height: 20,
    position: 'absolute',
    backgroundColor: 'rgba(39,170,225,0.2)',
  },
  manager: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 9,
    marginTop: 5,
    marginLeft: 7,
  },
  loremIpsum3: {
    top: 1,
    left: 0,
    position: 'absolute',
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 15,
  },
  rect5Stack: {
    width: 236,
    height: 37,
    marginLeft: 1,
  },
  loremIpsum4: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 12,
    marginTop: 15,
  },
  rect5StackColumn: {
    width: 237,
    marginLeft: 5,
    marginTop: 14,
    marginBottom: 4,
  },
  image1StackRow: {
    height: 85,
    flexDirection: 'row',
    marginRight: 6,
  },
  rect8Stack: {
    width: 340,
    height: 155,
    marginTop: 29,
    marginLeft: 18,
  },
  modify1: {
    top: 112,
    left: 256,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 13,
  },
  rect14: {
    top: 101,
    left: 232,
    width: 95,
    height: 36,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(39,170,225,1)',
  },
  rect15: {
    top: 0,
    left: 0,
    width: '100%',
    height: 154,
    // position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(197,196,196,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    elevation: 20,
    shadowOpacity: 0.17,
    shadowRadius: 20,
    backgroundColor: '#fff',
  },
  modify1Stack: {
    top: 1,
    left: 0,
    width: 340,
    height: 154,
    position: 'absolute',
  },
  login1: {
    top: 11,
    left: 21,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 13,
  },
  rect10: {
    top: 0,
    left: 0,
    width: 82,
    height: 36,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(39,170,225,1)',
  },
  login1Stack: {
    top: 102,
    left: 14,
    width: 82,
    height: 36,
    position: 'absolute',
  },
  loremIpsum5: {
    top: 66,
    left: 87,
    position: 'absolute',
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 12,
  },
  rect13: {
    top: 0,
    left: 0,
    width: 330,
    height: 85,
    position: 'absolute',
  },
  loremIpsum5Stack: {
    top: 0,
    left: 1,
    width: 330,
    height: 85,
    position: 'absolute',
  },
  manager1: {
    top: 5,
    left: 7,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 9,
  },
  rect12: {
    top: 0,
    left: 0,
    width: 50,
    height: 20,
    position: 'absolute',
    backgroundColor: 'rgba(39,170,225,0.2)',
  },
  manager1Stack: {
    top: 14,
    left: 275,
    width: 50,
    height: 20,
    position: 'absolute',
  },
  rect11: {
    top: 0,
    left: 1,
    width: 82,
    height: 85,
    position: 'absolute',
  },
  image2: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginTop: 12,
    marginLeft: 12,
  },
  loremIpsum6: {
    top: 15,
    left: 89,
    position: 'absolute',
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 15,
  },
  materialButtonPrimary2: {
    height: 36,
    width: 120,
    position: 'absolute',
    left: 104,
    top: 101,
  },
  modify1StackStack: {
    width: 340,
    height: 155,
    marginTop: 17,
    marginLeft: 18,
  },
  modify2: {
    top: 112,
    left: 256,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 13,
  },
  rect20: {
    top: 101,
    left: 232,
    width: 95,
    height: 36,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(39,170,225,1)',
  },
  rect21: {
    // top: 0,
    // left: 0,
    width: '100%',
    height: 154,
    // position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(197,196,196,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    elevation: 20,
    shadowOpacity: 0.17,
    shadowRadius: 20,
    backgroundColor: '#fff',
  },
  modify2Stack: {
    top: 1,
    left: 0,
    width: 340,
    height: 154,
    // position: 'absolute',
  },
  login2: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 13,
  },
  rect16: {
    top: 0,
    left: 0,
    width: 82,
    height: 36,
    // position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(39,170,225,1)',
  },
  login2Stack: {
    width: 82,
    height: 36,
  },
  loremIpsum7: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 12,
  },
  rect19: {
    width: 330,
    height: 85,
  },
  loremIpsum7Stack: {
    width: 330,
    height: 85,
  },
  manager2: {
    top: 5,
    left: 7,
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 9,
  },
  rect18: {
    top: 0,
    left: 0,
    width: 50,
    height: 20,
    backgroundColor: 'rgba(39,170,225,0.2)',
  },
  manager2Stack: {
    top: 14,
    left: 275,
    width: 50,
    height: 20,
  },
  rect17: {
    top: 0,
    left: 1,
    width: 82,
    height: 85,
  },
  image3: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginTop: 12,
    marginLeft: 12,
  },
  loremIpsum8: {
    top: 15,
    left: 89,
    position: 'absolute',
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 15,
  },
  materialButtonPrimary3: {
    height: 36,
    width: 120,
    position: 'absolute',
    left: 104,
    top: 101,
  },
  modify2StackStack: {
    width: 340,
    height: 155,
    marginTop: 18,
    marginLeft: 18,
  },
  modify3: {
    top: 112,
    left: 256,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 13,
  },
  rect26: {
    top: 101,
    left: 232,
    width: 95,
    height: 36,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(39,170,225,1)',
  },
  rect27: {
    top: 0,
    left: 0,
    width: 340,
    height: 154,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(197,196,196,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    elevation: 20,
    shadowOpacity: 0.17,
    shadowRadius: 20,
    backgroundColor: '#fff',
  },
  modify3Stack: {
    top: 1,
    left: 0,
    width: 340,
    height: 154,
    position: 'absolute',
  },
  login3: {
    top: 11,
    left: 21,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 13,
  },
  rect22: {
    top: 0,
    left: 0,
    width: 82,
    height: 36,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(39,170,225,1)',
  },
  login3Stack: {
    top: 102,
    left: 14,
    width: 82,
    height: 36,
    position: 'absolute',
  },
  loremIpsum9: {
    top: 66,
    left: 87,
    position: 'absolute',
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 12,
  },
  rect25: {
    top: 0,
    left: 0,
    width: 330,
    height: 85,
    position: 'absolute',
  },
  loremIpsum9Stack: {
    top: 0,
    left: 1,
    width: 330,
    height: 85,
    position: 'absolute',
  },
  manager3: {
    top: 5,
    left: 7,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 9,
  },
  rect24: {
    top: 0,
    left: 0,
    width: 50,
    height: 20,
    position: 'absolute',
    backgroundColor: 'rgba(39,170,225,0.2)',
  },
  manager3Stack: {
    top: 14,
    left: 275,
    width: 50,
    height: 20,
    position: 'absolute',
  },
  rect23: {
    top: 0,
    left: 1,
    width: 82,
    height: 85,
    position: 'absolute',
  },
  image4: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginTop: 12,
    marginLeft: 12,
  },
  loremIpsum10: {
    top: 15,
    left: 89,
    position: 'absolute',
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 15,
  },
  materialButtonPrimary4: {
    height: 36,
    width: 120,
    position: 'absolute',
    left: 104,
    top: 101,
  },
  modify3StackStack: {
    width: 340,
    height: 155,
    marginTop: 19,
    marginLeft: 18,
  },
  noItemsFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 18,
    color: '#999',
  },
});

const mapStateToProps = ({user, auth}) => ({
  listings: user.listings,
  userId: auth.authenticated ? auth.data.attributes.sub : null,
  userEmail: auth.authenticated ? auth.data.attributes.email : null,
});

export default connect(mapStateToProps, {loadUserListings})(WithdrawalSettings);
