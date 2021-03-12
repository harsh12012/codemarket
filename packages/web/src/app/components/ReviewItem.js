import React from 'react';
import {ListGroup,Button} from 'react-bootstrap';
import {FaUserCircle} from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import moment from 'moment';
import { MdEdit, MdDelete } from 'react-icons/md';
import { connect } from 'react-redux';


const ReviewItem = ({driverName,rating,feedback,createdAt,driverId,userId,handleDeleteReview,_id,handleEditReview}) => {
    
    return (
    <ListGroup.Item className="review-item">
        <div className="review-item-head">
            <FaUserCircle size={50}/>
            <div className="review-item-head-right">
                <div className="review-item-user-root">
                    <div className="review-item-user">
                        <p>{driverName}</p> 
                        <span className="text-muted">{moment(Date.parse(createdAt)).format('ll')}</span>
                    </div>
                

                   {
                       driverId === userId && (
                        <div style={{marginTop:10,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <Button  variant="primary" style={{marginRight:10}} onClick={handleEditReview}>
                            <MdEdit />
                        </Button>

                        <Button  variant="danger" onClick={() => handleDeleteReview(_id)}>
                            <MdDelete />
                        </Button>
                        </div>
                       )
                   }
                </div>
                <StarRatings
                rating={rating}
                starRatedColor="yellow"
                numberOfStars={5}
                name='rating'
                />
            </div>
        </div>
        <div className="description">
            {feedback}
        </div>
    </ListGroup.Item>
    )
}

const mapStateToProps = ({auth}) =>{
    return{
        userId:auth.data.attributes.sub,
    }
}

export default connect(mapStateToProps,{})(ReviewItem);