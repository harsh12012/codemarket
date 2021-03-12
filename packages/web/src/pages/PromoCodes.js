import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MdEdit, MdDelete, MdInfoOutline } from 'react-icons/md';
import AccessDenied from '../app/components/AccessDenied';
import AddPromoCodeModal from '../app/components/AddPromoCodeModal';
import PromoCodeDetailsModal from '../app/components/PromoCodeDetailsModal';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import { useCRUDPromoCodes } from '@parkyourself-frontend/shared/hooks/promocode';

const PromoCodes = ({ listing, id }) => {
  // const [togglePromoCode] = useMutation(TOGGLE_PROMO_CODE_VALIDITY);

  const [promoCodes, setPromoCodes] = useState([]);

  // const [listing, setListing] = useState(listings.filter((item) => item._id == id)[0]);

  const [showPromoCodeModal, setShowPromoCodeModal] = useState(false);
  const [showPromoCodeDetails, setShowPromoCodeDetails] = useState(false);
  const [edit, setEdit] = useState(false);
  const [promoCodeId, setPromoCodeId] = useState('');

  const addPromoCodeHandler = async (formData) => {
    formData.listingId = id;
    console.log(formData);
    const { data: rdata, error: rerror } = await addPromoCode(formData);

    console.log(rdata, rerror);

    if (rerror) {
      alert('Something Went Wrong!');
      console.log(rerror);
    } else {
      setPromoCodes([...promoCodes, rdata.createPromoCode]);
      alert('Promo Code Added Successfully');
    }
  };

  const updatePromoCodeHandler = async (data) => {
    console.log(data);
   
    const {data:resdata,error:reserror} = await handleUpdatePromoCode(data)
    if(reserror){
      alert('Something Went Wrong!');
      console.log(reserror);

    }else{
      alert('Promocode Update successfully');
      console.log(resdata)
      setPromoCodes(promoCodes.map(item => item["_id"] === data["id"] ? data : item))
      setEdit(false);
      setPromoCodeId('');
    }
  };

  const deletePromoCodeHandler = async (id) => {
    const { data, error } = await deletePromoCode(id);
    if (error) {
      alert('Something Went Wrong!');
      console.log(error);
    } else {
      setPromoCodes(promoCodes.filter((item) => item._id !== id));
      // toast.success("Promo Code Deleted Successfully");
      alert('Promo Code Deleted Successfully');
    }
  };

  // const togglePromoCodeValidity = async (id,isValid)=>{
  //     try {
  //         const response = await togglePromoCode({
  //           variables: {id:id,isValid:!isValid},
  //         });
  //         console.log(response.data.updatePromoCode);
  //         setPromoCodes(promoCodes.map(item=>item._id===id?response.data.updatePromoCode:item));
  //         if(isValid){
  //         toast.success("Promo Code Inactivated Successfully");
  //         }else{
  //         toast.success("Promo Code Activated Successfully");
  //         }
  //       } catch (error) {
  //         toast.warn("Something Went Wrong!");
  //         console.log(error);
  //       }
  // }

  const editButtonHandler = (id) => {
    setPromoCodeId(id);
    setEdit(true);
    setShowPromoCodeModal(true);
  };

  const infoButtonHandler = (id) => {
    setPromoCodeId(id);
    setShowPromoCodeDetails(true);
  };

  const {
    getPromoCodesByListingId,
    addPromoCode,
    deletePromoCode,
    handleUpdatePromoCode
  } = useCRUDPromoCodes();

  const { data, error, loading } = getPromoCodesByListingId(id);

  useEffect(() => {
    if (data && data.getPromoCodesByListingId) {
      setPromoCodes(data.getPromoCodesByListingId);
    }
  }, [data]);

  if (!id) {
    return <AccessDenied />;
  }

  if (!listing) {
    return <AccessDenied />;
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dg__account">
      <div className="heading-bar">
        <h1 className="heading">Promo Codes</h1>
        <Button
          variant="primary"
          onClick={() => {
            setShowPromoCodeModal(true);
          }}>
          Create Promo Code
        </Button>
        <AddPromoCodeModal
          show={showPromoCodeModal}
          handleSave={addPromoCodeHandler}
          handleUpdate={updatePromoCodeHandler}
          edit={edit}
          id={promoCodeId}
          handleClose={() => {
            setShowPromoCodeModal(false);
            setEdit(false)
          }}
          promoCodes={promoCodes.length > 0 ? promoCodes : []}
        />
      </div>
      <p className="lead">{listing.locationDetails.address}</p>

      {promoCodes.length > 0 ? (
        <div className="mt-3">
          <Table bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Promo Code</th>
                <th>Discount %</th>
                <th>Start Date</th>
                <th>Start Date</th>
                <th>Total Quantity</th>
                <th>Remaining Quantity</th>
                <th className="text-center">Operations</th>
              </tr>
            </thead>
            <tbody>
              {promoCodes.length > 0 &&
                promoCodes.map((code, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{code.code}</td>
                    <td>{code.discount * 100}</td>
                    <td>{moment(code.startDate).format('DD-MM-YYYY')}</td>
                    <td>{moment(code.endDate).format('DD-MM-YYYY')}</td>
                    <td>{code.quantity}</td>
                    <td>{code.remaining}</td>
                    <td style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          infoButtonHandler(code._id);
                        }}
                        style={{ marginRight: 10 }}>
                        <MdInfoOutline />
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          editButtonHandler(code._id);
                        }}
                        style={{ marginRight: 10 }}>
                        <MdEdit />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          deletePromoCodeHandler(code._id);
                        }}>
                        <MdDelete />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="loading">No Promo Codes found</div>
      )}
      {promoCodes.length > 0 && promoCodeId && (
        <PromoCodeDetailsModal
          show={showPromoCodeDetails}
          handleClose={() => {
            setShowPromoCodeDetails(false);
          }}
          promoCode={promoCodes.filter((item) => item._id === promoCodeId)[0]}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  listings: user.listings
});

export default connect(mapStateToProps)(PromoCodes);
