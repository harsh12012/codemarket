import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { gql, useMutation } from "@apollo/client";
import colors from '@parkyourself-frontend/shared/config/colors';
import MenuItem from '../../common/MenuItem';
import { client } from "../../../app/graphql/index";
import LoadingSpinner from "../../common/LoadingSpinner";





const GET_FAQS_BY_ROLE = gql`
  query GetFaqsByRole($role: String!) {
    getFaqsByRole(role: $role) {
      _id
      roles
      topic
      question
      answer
      createdAt
    }
  }
`;


const FaqList = ({faqRole,handleShowSubTopics}) => {

    const [driverTopics, setDriverTopics] = useState([]);
    const [spaceOwnerTopics, setSpaceOwnerTopics] = useState([]);
    const [adminTopics, setAdminTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    
    
    const getFaqsData = (faqRole) => {
        if (
          (faqRole == "Driver" && driverTopics.length > 0) ||
          (faqRole == "Space Owner" && spaceOwnerTopics.length > 0) ||
          (faqRole == "Admin" && adminTopics.length > 0)
        ) {
          return;
        }
        setLoading(true);
       client
          .query({ query: GET_FAQS_BY_ROLE, variables: { role: faqRole },fetchPolicy:'network-only' })
          .then(({ data }) => {
            if (data.getFaqsByRole) {
              console.log(data.getFaqsByRole);
              let result = data.getFaqsByRole.reduce(function (r, a) {
                r[a.topic] = r[a.topic] || [];
                r[a.topic].push(a);
                return r;
              }, Object.create(null));
    
              console.log("res",result);
              let array = Object.values(result);
              console.log(array);
              if (faqRole === "Driver") {
                setDriverTopics(array);
              } else if (faqRole === "Space Owner") {
                setSpaceOwnerTopics(array);
              } else {
                setAdminTopics(array);
              }
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      };
    
      useEffect(() => {
        console.log("getting data for : ", faqRole);
        getFaqsData(faqRole);
      }, []);


    return (
        <View style={styles.outerView}>
            {/* <Text style={styles.subTopic}>Sub Topics</Text> */}
            <ScrollView contentContainerStyle={{paddingVertical:10}} showsHorizontalScrollIndicator={false}>
                   {
                       loading ?
                       (<LoadingSpinner style={{ marginTop: 40 }} />)
                        :
                        <View>
                           {
                               faqRole === 'Driver' && (
                                driverTopics.map((item) =>{
                                    console.log(item)
                                    return(
                                        <MenuItem 
                                        key={item[0]["_id"]}
                                       label={item[0].topic}
                                       style={styles.menuItem}
                                       onPress={() => handleShowSubTopics(item[0].topic)}
                                       />
                                    )
                                })
                               )

                               ||

                               faqRole === 'Space Owner' && (
                                spaceOwnerTopics.map(item =>{
                                    return(
                                        <MenuItem 
                                        key={item[0]["_id"]}
                                       label={item[0].topic}
                                       style={styles.menuItem}
                                       onPress={() => handleShowSubTopics(item[0].topic)}
                                       />
                                    )
                                })
                               )

                               ||

                               faqRole === 'Admin' && (
                                adminTopics.map(item =>{
                                    return(
                                        <MenuItem 
                                         key={item[0]["_id"]}
                                          label={item[0].topic}
                                          style={styles.menuItem}
                                          onPress={() => handleShowSubTopics(item[0].topic)}
                                       />
                                    )
                                })
                               )
                           }
                        </View>
                    }
            </ScrollView>
        </View>
    )
}

export default FaqList

const styles = StyleSheet.create({
    outerView: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 10 },
    subTopic:{
        fontSize:20,
        fontWeight:'800'
    },
    menuItem: {
        marginTop: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        elevation:4,
        marginBottom:10,
    },
})
