import React, { useState, useEffect } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useGetStripePaymentReport } from '@parkyourself-frontend/shared/hooks/spaceOwner';

const PayoutDeposit = ({ userId }) => {
  const [depositdata, setDepositData] = useState({
    data: null,
    error: false,
    totalEarnings: 0,
    lastMonthEarnings: 0
  });

  const { loading, data, error } = useGetStripePaymentReport(userId);

  useEffect(() => {
    if (data && data.stripeGetPaymentReport) {
      setDepositData({
        data: JSON.parse(data.stripeGetPaymentReport.availableForWithdrawal),
        totalEarnings: data.stripeGetPaymentReport.totalEarnings,
        lastMonthEarnings: data.stripeGetPaymentReport.lastMonthEarnings,
        error: false
      });
    }
    if (error) {
      setDepositData({
        ...data,
        error: true
      });
    }
  }, [data]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (depositdata.data) {
    return (
      <div>
        <h4>Payout Deposit Report</h4>
        <div className="more-info-btns">
          <Card>
            <Card.Body>
              <div>Current Balance</div>
              <div className="text-parkyourself">
                <b>${depositdata.data.instant_available[0].amount / 100}</b>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div>Pending Funds</div>
              <div className="text-parkyourself">
                <b>${depositdata.data.pending[0].amount / 100}</b>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div>Last Withdrawal</div>
              <div className="text-parkyourself">
                <b>$1</b>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div>Total Earnings</div>
              <div className="text-parkyourself">
                <b>${depositdata.totalEarnings}</b>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div>Earning in March</div>
              <div className="text-parkyourself">
                <b>${depositdata.lastMonthEarnings}</b>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div>Available for Withdrawal</div>
              <div className="text-parkyourself">
                <b>${depositdata.data.available[0].amount / 100}</b>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

const mapStateToProps = ({ auth }) => {
  return {
    userId: auth.authenticated ? auth.data.attributes.sub : null
  };
};

export default connect(mapStateToProps)(PayoutDeposit);
