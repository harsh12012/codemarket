import { gql, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Card, Button } from 'react-bootstrap';
import { IoIosArrowForward } from 'react-icons/io';
import { connect } from 'react-redux';
import Link from 'next/link';
import { toast } from 'react-toastify';
import AddFaqModal from '../app/components/AddFaqModal';
import { client } from '../app/graphql';



const Settings = () => {


    return (
        
        <div className="dg__account">
            <div className="heading-bar">
                <h1>Settings</h1>
            </div>
            <div className="more-info-btns">
                <Link href="/settings/privacy-policy">
                    <Card>
                        <Card.Body>
                            <div>Privacy Policy</div>
                            <IoIosArrowForward />
                        </Card.Body>
                    </Card>
                </Link>
                <Link href="/settings/terms-conditions">
                    <Card>
                        <Card.Body>
                            <div>Terms & Conditions</div>
                            <IoIosArrowForward />
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        </div>

    );
};


export default Settings;
