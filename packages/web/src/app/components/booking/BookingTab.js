import React, { useState } from 'react';
import { Tabs, Tab, Modal, Button, Dropdown } from 'react-bootstrap';
import { Menu, X } from 'react-feather';
import { DateRange } from 'react-date-range';
import moment from 'moment';
import BookingList from './BookingList';
import dateFilterConfig from '@parkyourself-frontend/shared/config/dateFilter';

const BookingTab = ({ screen, hideTitle, driverId = null, ownerId = null, title = null }) => {
  const [state, setState] = useState([
    {
      startDate: dateFilterConfig.oneMonthBack,
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [dateFilter, setDateFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [verify, setVerify] = useState(false);
  const filterStartDate = state[0].startDate;
  const filterEndDate = state[0].endDate ? state[0].endDate : null;

  let oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() - 1);

  return (
    <>
      <div className="dg__account my-bookings-container">
        {!hideTitle && (
          <div className="d-flex justify-content-between">
            <div>
              <h1 className="heading">{title || 'Bookings'}</h1>
            </div>
            <Dropdown drop="left">
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                <Menu size={25} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">
                  <span onClick={() => setShowModal(true)}>Date Range</span>
                  {dateFilter && (
                    <span className="cursor-pointer" onClick={() => setDateFilter(false)}>
                      <X size={25} className="ml-2" />
                    </span>
                  )}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    let newDate = {
                      startDate: dateFilterConfig.oneDayBack,
                      endDate: new Date(),
                      key: 'selection'
                    };
                    setState([newDate]);
                    setDateFilter(true);
                  }}>
                  Day
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    let newDate = {
                      startDate: dateFilterConfig.oneWeekBack,
                      endDate: new Date(),
                      key: 'selection'
                    };
                    setState([newDate]);
                    setDateFilter(true);
                  }}>
                  Week
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    let newDate = {
                      startDate: dateFilterConfig.oneMonthBack,
                      endDate: new Date(),
                      key: 'selection'
                    };
                    setState([newDate]);
                    setDateFilter(true);
                  }}>
                  Month
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    let newDate = {
                      startDate: oneYearFromNow,
                      endDate: new Date(),
                      key: 'selection'
                    };
                    setState([newDate]);
                    setDateFilter(true);
                  }}>
                  Year
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        {dateFilter && (
          <p>
            <span className="cursor-pointer" onClick={() => setShowModal(true)}>
              <b>
                {moment(filterStartDate).format('LL')} - {moment(filterEndDate).format('LL')}
              </b>
            </span>{' '}
            <span className="cursor-pointer" onClick={() => setDateFilter(false)}>
              <X size={25} className="mt-n1" />
            </span>
          </p>
        )}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Select Date Range</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
            </div>
            {verify && (!filterStartDate || !filterEndDate) && (
              <p className="text-center text-danger">Please select start and end Date range</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (!filterStartDate || !filterEndDate) {
                  return setVerify(true);
                } else {
                  setDateFilter(true);
                  setShowModal(false);
                }
              }}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <Tabs defaultActiveKey="upcoming">
          <Tab eventKey="pending" title="Pending">
            <BookingList
              driverId={driverId}
              ownerId={ownerId}
              screen={screen}
              filterStartDate={filterStartDate}
              filterEndDate={filterEndDate}
              dateFilter={dateFilter}
              status="pending"
            />
          </Tab>
          <Tab eventKey="current" title="Current">
            <BookingList
              driverId={driverId}
              ownerId={ownerId}
              screen={screen}
              filterStartDate={filterStartDate}
              filterEndDate={filterEndDate}
              dateFilter={dateFilter}
              status="current"
            />
          </Tab>
          <Tab eventKey="upcoming" title="Upcoming">
            <BookingList
              driverId={driverId}
              ownerId={ownerId}
              screen={screen}
              filterStartDate={filterStartDate}
              filterEndDate={filterEndDate}
              dateFilter={dateFilter}
              status="upcoming"
            />
          </Tab>
          <Tab eventKey="completed" title="Completed">
            <BookingList
              driverId={driverId}
              ownerId={ownerId}
              screen={screen}
              filterStartDate={filterStartDate}
              filterEndDate={filterEndDate}
              dateFilter={dateFilter}
              status="completed"
            />
          </Tab>
          <Tab eventKey="cancelled" title="Cancelled">
            <BookingList
              driverId={driverId}
              ownerId={ownerId}
              screen={screen}
              filterStartDate={filterStartDate}
              filterEndDate={filterEndDate}
              dateFilter={dateFilter}
              status="cancelled"
            />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default BookingTab;
