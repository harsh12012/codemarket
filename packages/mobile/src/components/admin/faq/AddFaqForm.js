import { gql } from '@apollo/client'
import colors from '@parkyourself-frontend/shared/config/colors'
import useCRUDFaq, { useGetAllFaqTopics } from '@parkyourself-frontend/shared/hooks/adminSettings'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import {Picker} from '@react-native-community/picker';
import MenuItemCheckbox from '../../common/MenuItemCheckbox'
import MaterialButtonPrimary from '../../MaterialButtonPrimary'



const faqRoles = ['Driver','Space Owner','Admin']


const AddFaqForm = ({onSubmit,errorValues,cancelAddFaq,formValues}) => {
    const {register,handleSubmit,setValue} = useForm();
    const [selectedRoles,setSelectedRoles] = useState(formValues.roles ? formValues.roles :[]);
    const [topicsList,setTopicsList] = useState([{
        "_id":'dsadas',
        "topic":'Select a topic'
    }])


    const [selectedTopic,setSelectedTopic] = useState(formValues.topic ? formValues.topic : "Select a topic")


    const { loading, error: error2, data: data2 } = useGetAllFaqTopics()

    
    useEffect(() =>{
            register('roles');
            register('topic');
            register('question');
            register('answer');
    },[register])


    useEffect(() => {
  
        if(data2 && data2["getAllFaqTopics"]){
            setTopicsList([...topicsList,...data2["getAllFaqTopics"]])
        }
        
      }, [data2]);

    const handleSelectRoles = (role) =>{
        if(selectedRoles.includes(role)){
            const res = selectedRoles.filter(data => data != role);
            setValue('roles',res)
            setSelectedRoles(res)
            
        }else{
            const res = [...selectedRoles,role]
            setValue('roles',res)
            setSelectedRoles(selectedRoles.length > 0 ? [...selectedRoles,role] : [role])
        
        }
        
    }

    console.log("form",formValues)

    useEffect(() =>{

       if(formValues !== ''){
        setValue('topic',formValues.topic);   
        setValue('roles',formValues.roles);   
        setValue('question',formValues.question);   
        setValue('answer',formValues.answer);   
       }

    },[])
    
    return (
        <View style={styles.outerView}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:10}}>

            <View style={styles.inputView}>
                <Text style={styles.label}>Which role is the FAQ for?</Text>
                {
                    faqRoles.map(role =>{

                        return(
                            <MenuItemCheckbox label={role} key={`${role}-key`}  checked={selectedRoles.includes(role)} onPress={() =>{
                                handleSelectRoles(role)
                            }} />    
                        )
                    })
                }
                 {
                        errorValues.roles && <Text style={styles.requiredText}>Select atleast one field</Text>
                 }
            </View>
            <View style={styles.inputView}>
                <Text style={styles.label}>What is the Topic of FAQ?</Text>
                <View>
                    <View style={errorValues.topic ? styles.requiredInput : styles.input}>
                    <Picker
                    mode="dropdown"
                    selectedValue={selectedTopic}
                    style={errorValues.topic ? styles.requiredInput : styles.input}
                    onValueChange={(itemValue, itemIndex) =>{
                        setValue('topic',itemValue);
                        setSelectedTopic(itemValue)
                    }
                       
                    }>
                    {
                        topicsList.map(data =>{
                            return(
                                <Picker.Item label={data['topic']} value={data['topic']} key={data["id"]}/>
                            )
                        })
                    }
                    </Picker>
                    </View>
         
                    {
                        errorValues.topic && <Text style={styles.requiredText}>This field is required</Text>
                    }
                    
                </View>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.label}>Enter the question/phrase for FAQ</Text>
                <View>
                    <TextInput 
                    defaultValue={formValues.question ? formValues.question : ''}
                    style={errorValues.question ? styles.requiredInput : styles.input} 
                    placeholder="Question/Phrase" 
                    onChangeText={text => {
                        setValue('question',text)
                    }}/>
                   {
                        errorValues.question && <Text style={styles.requiredText}>This field is required</Text>
                    }
                </View>
               
            </View>
            <View style={styles.inputView}>
                <Text style={styles.label}>Enter the Answer For FAQ</Text>
                <View>
                    <TextInput 
                    defaultValue={formValues.answer ? formValues.answer : ''}
                    style={errorValues.answer ? styles.requiredInput : styles.input} 
                    placeholder="Answer" 
                    onChangeText={text => {
                        setValue('answer',text)
                    }}/>
                   {
                        errorValues.answer && <Text style={styles.requiredText}>This field is required</Text>
                    }
                </View>
               
            </View>

            <View style={{
                flexDirection:'row',
                justifyContent:'flex-end',
                alignItems:'center'
                
            }}>
                <MaterialButtonPrimary 
                style={styles.cancelBtn}
                caption="Cancel"
                onPress={cancelAddFaq}
                />
                <MaterialButtonPrimary 
                style={styles.materialButtonPrimary}
                caption="Save"
                onPress={handleSubmit(onSubmit)}
                />
            </View>

            </ScrollView>
      
        </View>
    )
}

export default AddFaqForm

const styles = StyleSheet.create({
    outerView:{
        flex:1,
        backgroundColor:colors.white,
        paddingHorizontal: 10
    },
    inputView:{
        marginTop:15,
        marginBottom:15,
    },
    label:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:15,
    },
    input:{
        borderColor:"#CECECE",
        borderWidth:1,
        marginBottom:5,
        borderRadius:5,
        paddingLeft:10,
        fontSize:17
    },
    requiredInput:{
        borderColor:"red",
        borderWidth:1,
        marginBottom:5,
        borderRadius:5,
        paddingLeft:10,
        fontSize:17
    },
    requiredText:{
        fontSize:16,
        color:'red'
    },
    materialButtonPrimary: {
        width: 100,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOffset: {
          height: 10,
          width: 10
        },
        elevation: 20,
        shadowOpacity: 0.1,
        shadowRadius: 20,
        marginTop: 10,
        backgroundColor: colors.secondary,
        paddingVertical: 12,
        borderRadius: 30
      },
      cancelBtn: {
        color:'black',
        width: 100,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOffset: {
          height: 10,
          width: 10
        },
        elevation: 20,
        shadowOpacity: 0.1,
        shadowRadius: 20,
        marginTop: 10,
        backgroundColor: '#6c757D',
        paddingVertical: 12,
        borderRadius: 30,
        marginRight:10,
      },
})
