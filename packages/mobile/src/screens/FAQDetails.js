import { gql,useQuery } from '@apollo/client';
import colors from '@parkyourself-frontend/shared/config/colors';
import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MenuItem from '../components/common/MenuItemDropdown';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';


const GET_FAQS_BY_TOPIC = gql`
  query GetFaqsByTopic($topic: String!) {
    getFaqsByTopic(topic: $topic) {
      _id
      roles
      topic
      question
      answer
      createdAt
    }
  }
`;



function FAQDetails({route,navigation}) {
  const {faqTopic,role} = route.params;

  const {loading,error,data} = useQuery(GET_FAQS_BY_TOPIC,{variables:{topic:faqTopic},fetchPolicy:'network-only'})

  const [subTopics,setSubTopics] = useState([])
  const [menuOpen,setMenuOpen] = useState({
    flag:true,
    index:0
  })


  React.useEffect(() =>{
    if(data && data.getFaqsByTopic){
        setSubTopics(data.getFaqsByTopic)
    }
  },[data])


  const handleMenuOpen = (index) =>{
      if(menuOpen.index === index){

          setMenuOpen({
            flag:menuOpen.flag ? false:true,
            index:index
          })

      }else{
          setMenuOpen({
            flag:true,
            index:index
          })
      }
  }


  return (
    <View style={styles.outerView}>
      <View style={styles.wrapper}>
      <Text style={styles.role}>{role}</Text>
        <Text style={styles.topic}>{faqTopic}</Text>

      {
          subTopics.length > 0 && 
          subTopics.map((item,index) =>{
            return(
              <TouchableOpacity onPress={() => handleMenuOpen(index)} style={styles.menuWrap} key={item["_id"]}>
                <View style={styles.row}>
                    <Text style={styles.question}>{item.question}</Text>
                    <MaterialCommunityIconsIcon
                    name={menuOpen.flag ? 'chevron-down' : 'chevron-right'}
                    style={styles.icon}
                    />
                </View>
                {
                  menuOpen.index === index && menuOpen.flag === true &&
                  <View style={styles.innerView}>
                      <Text style={styles.answer}>{item.answer}</Text>
                  </View>
                }
              </TouchableOpacity>
            )
          })
        }

      </View>
       

    </View>
  );
}

const styles = StyleSheet.create({
    outerView:{
      flex:1,
      backgroundColor:colors.white,
      paddingHorizontal:20,
      paddingVertical:10
    },
    wrapper:{
        backgroundColor:'#fff',
        marginHorizontal:0,
        marginVertical:10,
        elevation:10,
    },
    topic:{
      fontSize:18,
      paddingVertical:10,
      paddingHorizontal:10,
    },
    role:{
      fontSize:18,
      color:colors.secondary,
      fontWeight:'bold',
      paddingVertical:8,
      paddingHorizontal:10,
      marginTop:5,
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:15,
        paddingHorizontal:10,

    },
    menuWrap:{
      borderTopWidth:1,
      borderBottomWidth:1,
      borderColor:'#cecece',
    },
    icon:{
      fontSize:30,
      color:colors.primary
    },
    innerView:{
      paddingHorizontal:10,
      marginBottom:20,

    },
    question:{
      fontSize:17,
      fontWeight:'bold',
      width:'70%'
    },
    answer:{
      fontSize:17,
      fontWeight:'800'
      
    }

});

export default FAQDetails;
