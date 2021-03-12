import { useQuery,gql,useMutation } from '@apollo/client'
import colors from '@parkyourself-frontend/shared/config/colors'
import useCRUDFaq, { useGetAllFaqsByTopic } from '@parkyourself-frontend/shared/hooks/adminSettings'
import React, { useEffect,useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import LoadingSpinner from '../../common/LoadingSpinner'
import FaqListDetail from './FaqListDetail'


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

const DELETE_FAQ = gql`
  mutation deleteFaq($id: ID!) {
    deleteFaq(id: $id)
  }
`;



const FaqSubTopics = ({topic,handleFaqEdit}) => {
    const [deleteFaq] = useMutation(DELETE_FAQ)
    const data = useQuery(GET_FAQS_BY_TOPIC,{variables:{topic:topic},fetchPolicy:'network-only'})
    const {loading,error:erro2,data:data2} = data;

   

   

    const [subTopics,setSubTopics] = useState([])
    useEffect(() =>{
        if(data2 && data2.getFaqsByTopic){
            setSubTopics(data2.getFaqsByTopic)
        }
    },[data2])



    const deleteFaqHandler = (id) =>{
        const result = subTopics.filter(data => data["_id"] !== id)

        deleteFaq({variables:{id:id}})
        .then(data =>{
            console.log(data);
            setSubTopics(result)
        })
        .catch(err =>{
            console.log(err)
        })
    }


    return (
  
        <ScrollView contentContainerStyle={styles.outerView}>
        {
            loading ?

            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <LoadingSpinner />
            </View>
            :

            
                   ( 
                       
                        subTopics.length > 0 &&
                        
                        subTopics.map(data =>{
                            return(
                                <FaqListDetail 
                                key={data["_id"]}
                                id={data["_id"]}
                                label={data.question}
                                option={data.answer}
                                handleDelete={deleteFaqHandler}
                                handleFaqEdit={() => handleFaqEdit(data)}
                                />
                            )
                        })
                )
           
        }

        </ScrollView>
    )
}

export default FaqSubTopics

const styles = StyleSheet.create({
    outerView: { 
        backgroundColor:colors.white,
        paddingVertical:10,
        paddingHorizontal:10,
        height:"100%"
       },
})
