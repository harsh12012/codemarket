import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '@parkyourself-frontend/shared/config/colors';
import { View, StyleSheet, TouchableOpacity,Text, ScrollView } from 'react-native';
import ScreenTittle from '../../common/ScreenTittle';
import MaterialButtonPrimary from '../../MaterialButtonPrimary';
import FaqList from './FaqList';
import AddFaqForm from './AddFaqForm';
import FaqSubTopics from "./FaqSubTopics";
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import useCRUDFaq from "@parkyourself-frontend/shared/hooks/adminSettings";



const Tab = createMaterialTopTabNavigator();






export default function FaqTabs({ username = null, showHeader = true }) {

  const {handleAddFaq,handleUpdateFaq} = useCRUDFaq() //For Creating FAQ

  const [addFaq,setAddFaq] = useState(false); //Add Faq Screen Check
  const [editFaq,setEditFaq] = useState({
    flag:false,
    data:{}
  })

  const [faqState,setFaqState] = useState({
    add:false,
    edit:false,
    data:{}
  })

  const [errorValues,setErrorValues] = useState({
    topic:false,
    answer:false,
    question:false,
    roles:false,
  }) //Error Values for FAQ Form

  //State for FAQ List Detail
  
  const [showSubTopics,setShowSubTopics] = useState({
    flag:false,
    topic:''
  })

  //State to Show Add FAQ Section
 
  const handleAddCancel = () =>{
      setAddFaq(!addFaq);

      if(!addFaq){
        setErrorValues({
          topic:false,
          answer:false,
          question:false,
          roles:false,
        })
      }

      setShowSubTopics({
        flag:false,
        topic:''
      })
  }

  const handleEditCancel = () =>{
    setEditFaq({
      flag:false,
      data:{}
    })

    setShowSubTopics({
      flag:false,
      topic:''
    })
  }


  //handle set list detail
  const handleShowSubTopics = (topic) =>{
    setShowSubTopics({
      ...showSubTopics,
      flag:true,
      topic:topic
    })
  }





  //OnSubmit FAQ Add validating and Add FAQ Handle
  const onSubmit = (data) =>{
    let errVal = {}
    Object.keys(data).map(key =>{
        
        if(data[key] === '' || data[key] === undefined){
          errVal[key] = true
          
        }else{
          errVal[key] = false
          console.log(data[key])
        }
    })
    if(Object.values(errVal).includes(true)){
      setErrorValues({
        ...errVal
      })
    }else{
        if(editFaq.flag){
          data["id"] = editFaq.data["_id"]
          handleUpdateFaq(data)
          .then((data) =>{
            if(data){
                console.log(data)
                handleEditCancel()
            }
          })
        }else{
          handleAddFaq(data)
          .then((data) =>{
            if(data){
                console.log(data)
                handleAddCancel()
            }
          })
        }
        
    }

    console.log(data)
  }

  //For Changing FaQ Detail to Default
  const handleRemoveFaqDetail = () =>{
    setShowSubTopics({
      flag:false,
      topic:''
    })
  }

  const handleFaqEdit = (data) =>{
      setEditFaq({
        flag:true,
        data:data
      })
  }


  return (
    <>
      {showHeader && (
        <View style={styles.headerView}>
          <ScreenTittle title="Frequently Asked Questions" />
          {
            !addFaq && !showSubTopics.flag &&  !editFaq.flag &&
            <MaterialButtonPrimary 
            onPress={editFaq.flag ? handleEditCancel : handleAddCancel}
            caption="Add FAQ"
            style={styles.materialButtonPrimary}
            />
          }
          {
            showSubTopics.flag && !editFaq.flag &&

            <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:"100%"}}>

                <Text style={{fontSize:19,fontWeight:"bold"}}>Topic : <Text style={{fontSize:19,fontWeight:'800',color:colors.primary}}>{showSubTopics.topic}</Text></Text>

                <TouchableOpacity onPress={() => handleRemoveFaqDetail()} style={{position:'absolute',right:0}}>
                  <MaterialCommunityIconsIcon name="close" style={styles.materialCIcon} />
               </TouchableOpacity>
            </View>
          }
        </View>
      )}

      {
        addFaq || editFaq.flag ?

        (
          <AddFaqForm  
          onSubmit={onSubmit} 
          errorValues={errorValues} 
          cancelAddFaq={editFaq.flag ? handleEditCancel : handleAddCancel}
          formValues={editFaq.data ? editFaq.data : ''}
          />
        )

        :

        (
          showSubTopics.flag ?
          
          <FaqSubTopics 
          topic={showSubTopics.topic}
          handleFaqEdit={handleFaqEdit}
          />
          

          :

          <Tab.Navigator
          tabBarOptions={{
            scrollEnabled: true,
            activeTintColor: colors.secondary,
            indicatorStyle: {
              backgroundColor: colors.primary
            },
            labelStyle: { fontWeight: 'bold' }
          }}
          initialRouteName="DRIVER"
          lazy={true}
          >
          <Tab.Screen name="DRIVER">
            {(props) => <FaqList {...props} faqRole="Driver"  handleShowSubTopics={handleShowSubTopics}/>}
          </Tab.Screen>
          <Tab.Screen name="SPACE OWNER">
            {(props) => <FaqList {...props} faqRole="Space Owner" handleShowSubTopics={handleShowSubTopics}/>}
          </Tab.Screen>
          <Tab.Screen name="ADMIN">
            {(props) => <FaqList {...props} faqRole="Admin" handleShowSubTopics={handleShowSubTopics}/>}
          </Tab.Screen>

        </Tab.Navigator>
        )
        
      }
      
    </>
  );
}

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
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
  menuItem: {
    marginTop: 25,
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  outerView: { 
    flex: 1,
    backgroundColor:colors.white,
    paddingVertical:5,
    paddingHorizontal:10,
   },
   materialCIcon: {
    fontSize: 30,
    color: colors.secondary
  },

});
