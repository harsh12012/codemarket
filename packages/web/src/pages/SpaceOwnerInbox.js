import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux';
import { gql } from '@apollo/client';
import { client } from '../app/graphql';
import SpaceOwnerContainer from "../app/components/SpaceOwnerContainer";
import SpaceOwnerInboxListItem from '../app/components/SpaceOwnerInboxListItem';

const GET_OWNER_MESSAGES=gql`
query GetOwnerMessages($ownerId:String!){
    getOwnerMessages(ownerId:$ownerId){
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


const SpaceOwnerInbox = ({userData}) => {

    const [messages,setMessages] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
   
        client.query({query:GET_OWNER_MESSAGES,variables:{ownerId:userData.sub}}).then(({data})=>{
            if(data.getOwnerMessages){
                let result = data.getOwnerMessages.reduce(function (r, a) {
                    r[a.driverId] = r[a.driverId] || [];
                    r[a.driverId].push(a);
                    return r;
                }, Object.create(null));
            
            console.log(result);
            let msgArray = Object.values(result);
            for(let i=0;i<msgArray.length;i++){
                let arr = msgArray[i].reduce(function (r, a) {
                    r[a.listingId] = r[a.listingId] || [];
                    r[a.listingId].push(a);
                    return r;
                }, Object.create(null));
                // msgArray[i]=arr;
                msgArray[i] = Object.values(arr);
                console.log("msg array[i] listing id : ",arr);
            }
            console.log("message array full ",msgArray);
            setMessages(msgArray);
            setLoading(false);
            }
        
        }).catch(error=>{
            console.log(error);
            setLoading(false);
        })

        
        
    },[]);


    return (
        <SpaceOwnerContainer>
        <div className="dg__account">
            <h1 className="heading">Inbox</h1>
            { loading?<div className="loading">Loading...</div>:
            <div className="inbox-list">
                {messages.length>0? messages.map((item)=>item.map(msgs=><SpaceOwnerInboxListItem key={msgs[0].listingId} listingId={msgs[0].listingId} lastMessage={msgs[msgs.length-1]} listingAddress={msgs[0].listingAddress}  />)):<div className="loading">No messages found</div>}            
            </div>
}
        </div>
        </SpaceOwnerContainer>
    )
}


const mapStateToProps = ({auth})=>({
    userData:auth.data.attributes,
});

export default connect(mapStateToProps)(SpaceOwnerInbox);