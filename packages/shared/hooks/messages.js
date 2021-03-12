/* eslint-disable import/prefer-default-export */
import { useSelector } from 'react-redux';
import { useQuery, gql } from '@apollo/client';

const GET_DRIVER_MESSAGES = gql`
  query GetDriverMessages($driverId: String!) {
    getDriverMessages(driverId: $driverId) {
      _id
      listingId
      listingAddress
      body
      driverId
      driverName
      ownerId
      ownerName
      senderName
      createdAt
    }
  }
`;

export function useInbox() {
  const driverId = useSelector(({ auth }) =>
    auth.authenticated ? auth.data.attributes.sub : null
  );
  const { error, loading, data } = useQuery(GET_DRIVER_MESSAGES, { variables: { driverId } });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    client
      .query({ query: GET_DRIVER_MESSAGES, variables: { driverId: userData.sub } })
      .then(({ data }) => {
        if (data.getDriverMessages) {
          let result = data.getDriverMessages.reduce(function (r, a) {
            r[a.listingId] = r[a.listingId] || [];
            r[a.listingId].push(a);
            return r;
          }, Object.create(null));

          console.log(result);
          let msgArray = Object.values(result);
          console.log(msgArray);
          setMessages(msgArray);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return data;
}
