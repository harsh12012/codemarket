import { gql, useQuery } from '@apollo/client';
import colors from '@parkyourself-frontend/shared/config/colors';
import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MenuItem from '../components/common/MenuItem';
import ScreenTittle from '../components/common/ScreenTittle';

const faqRoles = ['Driver','Space Owner','Admin']

const GET_ALL_FAQS = gql`
  query getAllFaqs {
    getAllFaqs {
      _id
      answer
      createdAt
      question
      roles
      topic
    }
  }
`;



function FAQScreen({navigation}) {
  
  const [faqsData,setFaqsData] = useState([])
  const {data,loading,error} = useQuery(GET_ALL_FAQS)

  useEffect(() =>{

      if(data && data.getAllFaqs){
          setFaqsData(data.getAllFaqs)
      }

  },[data])


  return (
    <View style={styles.outerView}>
          <ScreenTittle title="Frequently Asked Questions"/>
          {
            loading ?

            <View style={{marginTop:25}}>  
                <LoadingSpinner />
            </View> 

            :

            <ScrollView contentContainerStyle={{paddingVertical:10}} showsVerticalScrollIndicator={false}>


               <Text style={styles.heading}>All Topics</Text>

            <View style={styles.topicView}>
              <Text style={styles.heading1}>Drivers</Text>
                {
                faqsData.length > 0 && 
  
                faqsData.filter(item => item.roles.includes(faqRoles[0])).map(item =>{
                  return(
                    <MenuItem
                    key={item["_id"]}
                    label={item.topic}
                    onPress={() => navigation.navigate('FAQDetails',{faqTopic:item.topic,role:faqRoles[0]})}
                    />
                  )
                })
              }
            </View>
  
            <View style={styles.topicView}>
              <Text style={styles.heading1}>Space Owner</Text>
              {
                faqsData.length > 0 && 
  
                faqsData.filter(item => item.roles.includes(faqRoles[1])).map(item =>{
                  return(
                    <MenuItem
                    key={item["_id"]}
                    label={item.topic}
                    onPress={() => navigation.navigate('FAQDetails',{faqTopic:item.topic,role:faqRoles[1]})}
                    />
                  )
                })
              }
            </View>
  
            <View style={styles.topicView}>
              <Text style={styles.heading1}>Admin</Text>
              {
                faqsData.length > 0 && 
  
                faqsData.filter(item => item.roles.includes(faqRoles[2])).map(item =>{
                  return(
                    <MenuItem
                    key={item["_id"]}
                    label={item.topic}
                    onPress={() => navigation.navigate('FAQDetails',{faqTopic:item.topic,role:faqRoles[2]})}
                    />
                  )
                })
              }
            </View>
  
            </ScrollView>
          }

    </View>
  );
}

const styles = StyleSheet.create({
      outerView: { 
        flex: 1,
         backgroundColor: colors.white, 
         paddingHorizontal: 20,
         paddingVertical:10 
      },
      heading:{
        fontSize:20,
        color:'black',
        marginBottom:5
      },
      heading1:{
        fontSize:19,
        fontWeight:'bold',
        color:colors.secondary,
        marginBottom:10
      },
      topicView:{
        marginTop:15,

      }
    
});

export default FAQScreen;
