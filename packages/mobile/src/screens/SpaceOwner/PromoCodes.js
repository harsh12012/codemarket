import colors from '@parkyourself-frontend/shared/config/colors';
import { useCRUDPromoCodes } from '@parkyourself-frontend/shared/hooks/promocode';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Text, View,Alert } from 'react-native';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ScreenTittle from '../../components/common/ScreenTittle';
import MaterialButtonPrimary from '../../components/MaterialButtonPrimary';
import AddPromoCodeModal from '../../components/SpaceOwner/AddPromoCodeModal';
import PromoCodeItem from '../../components/SpaceOwner/PromoCodeItem';


const PromoCodes = ({ route, navigation }) => {
  const { listingId } = route.params;

  const {
    getPromoCodesByListingId,
    addPromoCode,
    deletePromoCode,
    handleUpdatePromoCode
  } = useCRUDPromoCodes();

  const [modalOpen, setModalOpen] = useState(false);
  const [promoCodes, setPromoCodes] = useState([]);
  const [payload,setPayload] = useState({
      edit:false,
      data:null
  })
  const { data, loading } = getPromoCodesByListingId(listingId);

  useEffect(() => {
    if (data && data.getPromoCodesByListingId) {
      setPromoCodes(data.getPromoCodesByListingId);
      console.log(data)
    }
  }, [data]);


  const DeleteAlert = (id) =>
    Alert.alert(
      "Delete",
      "Are you sure ? you want to delete this one",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deletePromoCodeHandler(id) }
      ],
      { cancelable: false }
    );


    const deletePromoCodeHandler = async(id) =>{
        const {error:rerror} = await deletePromoCode(id);
        if(rerror){
            console.log(rerror)
        }else{
           setPromoCodes(promoCodes.filter(item => item["_id"] !== id))
        }
    }

    const promoCodeUpdateHandler = async(promoItem) =>{
            const {data,error} = await handleUpdatePromoCode(promoItem)
            if(error){
                console.log(error)
            }else{
                let resData = promoCodes.map(item => item["_id"] === promoItem["_id"] ?( item = promoItem ): item )
                setPromoCodes(resData)

            }       
    }

    const promoCodeAddHandler = async(promoData) =>{
      promoData["listingId"] = listingId;
      
      const {data,error} = await addPromoCode(promoData)

      if(error){
          console.log(error)
      }else{
          setPromoCodes([...promoCodes,data.createPromoCode])

      }       
}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ScreenTittle title="Promo Codes" />
      </View>
      <MaterialButtonPrimary
        caption="Add Promo Code"
        style={styles.materialBtn}
        onPress={() => setModalOpen(true)}
      />
      {
      loading 
      ? 
      (
        <LoadingSpinner />
      ) 
      : 
      (
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.tableHead}>
                    <View style={styles.titleViewName}>
                        <Text style={styles.titleText}>Promo Code</Text>
                    </View>
                    <View style={styles.titleViewName}>
                        <Text style={styles.titleText}>Discount</Text>
                    </View>
                    <View style={styles.titleViewName}>
                        <Text style={styles.titleText}>Start Date</Text>
                    </View>
                    <View style={styles.titleViewName}>
                        <Text style={styles.titleText}>End Date</Text>
                    </View>
                    <View style={styles.titleViewName}>
                        <Text style={styles.titleText}>Total Quantity</Text>
                    </View>
                    <View style={styles.titleViewName}>
                        <Text style={styles.titleText}>Remaining</Text>
                    </View>
                    <View style={styles.titleViewName}>
                        <Text style={styles.titleText}>Operations</Text>
                    </View>
            </View>
            {promoCodes.map((item, index) => {
              return (
                <PromoCodeItem 
                key={item["_id"]}
                {...item}
                onDelete={() =>{
                    DeleteAlert(item["_id"])
                }}
                onEdit={() =>{
                    setPayload({
                        edit:true,
                        data:item
                    })
                    setModalOpen(true)
                }}
                />
              );
            })}
          </View>
        </ScrollView>
      )}
      <AddPromoCodeModal 
      handleSave={promoCodeAddHandler}
      handleUpdate={promoCodeUpdateHandler}
      visible={modalOpen}
      payload={payload}
      onHide={() =>{
          setModalOpen(false)
          setPayload({
              ...payload,
              data:null,
              edit:false
          })
      }}
      />

    </View>
  );
};

export default PromoCodes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  materialBtn: {
    width:200,
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
  table: {
    flex: 1,
    marginTop: 15
  },
  tableHead: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5'
  },
  titleViewName: {
    minWidth: 130,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 1,
    borderColor: '#cecece',
    paddingTop: 10,
    paddingBottom: 10
  },

  titleViewOp: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#cecece',
    paddingTop: 10,
    paddingBottom: 10
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 5
  }
});
