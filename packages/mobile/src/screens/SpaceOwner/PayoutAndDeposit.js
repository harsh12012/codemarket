import colors from '@parkyourself-frontend/shared/config/colors'
import { useGetStripePaymentReport } from '@parkyourself-frontend/shared/hooks/spaceOwner'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import ScreenTittle from '../../components/common/ScreenTittle'
import LoadingSpinner from '../../components/common/LoadingSpinner'
const PayoutAndDeposit = () => {

    const userId = useSelector(({auth}) => auth.data.admin ? auth.data.attributes.sub : null)
    const [depositdata,setDepositData] = useState({
        totalEarnings:0,
        lastMonthEarnings:0,
        data:null
    })

    console.log("auth",userId)

    const {loading,data,error} = useGetStripePaymentReport(userId)

    useEffect(() =>{
        if(data && data.stripeGetPaymentReport){
            setDepositData({
                totalEarnings:data.stripeGetPaymentReport.totalEarnings,
                lastMonthEarnings:data.stripeGetPaymentReport.lastMonthEarnings,
                data:JSON.parse(data.stripeGetPaymentReport.availableForWithdrawal)
            })
        }

    },[data])
    return (
        <View style={styles.container}> 
            <ScreenTittle title='Payout & Deposits Reports' />
            {
                loading ?

                <View>
                    <LoadingSpinner />
                </View>

                :

                (
                    depositdata.data && (
                        <View style={{marginTop:15}}>
                            <View style={styles.reports}>
                                <Text style={styles.label}>Current Balance</Text>  
                                <Text style={styles.amount}>${depositdata.data.instant_available[0].amount / 100}</Text>   
                            </View>
                            <View style={styles.reports}>
                                <Text style={styles.label}>Pending Funds</Text>  
                                <Text style={styles.amount}>${depositdata.data.pending[0].amount / 100}</Text>   
                            </View>
                            <View style={styles.reports}>
                                <Text style={styles.label}>Last Withdrawal</Text>  
                                <Text style={styles.amount}>$1</Text>   
                            </View>
                            <View style={styles.reports}>
                                <Text style={styles.label}>Total Earnings</Text>  
                                <Text style={styles.amount}>${depositdata.totalEarnings}</Text>   
                            </View>
                            <View style={styles.reports}>
                                <Text style={styles.label}>Earning in March</Text>  
                                <Text style={styles.amount}>${depositdata.lastMonthEarnings}</Text>   
                            </View>
                            <View style={styles.reports}>
                                <Text style={styles.label}>Available for Withdrawal</Text>  
                                <Text style={styles.amount}>${depositdata.data.available[0].amount / 100}</Text>   
                            </View>
                       </View>
                    )
                )
            }
        </View>
    )
}

export default PayoutAndDeposit

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        paddingHorizontal:10,
    },
    reports:{
        backgroundColor:'#fff',
        marginVertical:10,
        elevation:10,
        shadowColor:'grey',
        paddingHorizontal:18,
        paddingVertical:16,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'

    },
    label:{
        fontSize:18,
        color:'black'
    },
    amount:{
        fontSize:18,
        color:colors.secondary
    }
})
