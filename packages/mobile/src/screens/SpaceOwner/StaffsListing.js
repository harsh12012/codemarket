import colors from '@parkyourself-frontend/shared/config/colors';
import { useCRUDManageStaff } from '@parkyourself-frontend/shared/hooks/staff';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native';
import FilterButton from '../../components/common/FilterButton';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ScreenTittle from '../../components/common/ScreenTittle';
import MyListingStaffItem from '../../components/listing/myListing/MyListingStaffItem';
import MaterialButtonPrimary from '../../components/MaterialButtonPrimary';
import AddStaffModal from '../../components/SpaceOwner/AddStaffModal';
import StaffFilter from './StaffFilter';

const StaffsListing = ({ route, navigation }) => {
  const { listingId } = route.params;

  const {
    getListUsersInGroup,
    handleDeleteStaffFromGroup,
    getAllUsersRoles
  } = useCRUDManageStaff();

  const [modalOpen, setModalOpen] = useState(false);
  const [staffData, setStaffData] = useState([]);
  const [staffsList, setStaffsList] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [payload, setPayload] = useState({
    edit: false,
    data: null
  });

  const { data, error, loading } = getListUsersInGroup(listingId);
  const { data: data2 } = getAllUsersRoles();

  const handleEditedSuccess = (id, role) => {};

  const deleteStaffHandler = async (id) => {
    const { data, error } = await handleDeleteStaffFromGroup(id, listingId);
    if (data) {
      const res = staffsList.filter((staff) => staff['_id'] !== id);
      setStaffsList(res);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data && staffsList.length === 0) {
      setStaffsList(data.getStaff);
      setStaffData(data.getStaff);
    }
  }, [data]);

  useEffect(() => {
    if (data2 && data2.getOneFormOption) {
      setUserRoles(data2.getOneFormOption.options);
    }
  }, [data2]);

  useEffect(() => {
    if (activeFilter !== null) {
      setStaffsList(staffData.filter((item) => item.role === activeFilter));
    } else {
      if (staffData.length > 0) {
        setStaffsList(staffData);
      }
    }
  }, [activeFilter]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ScreenTittle title="Manage Staffs" />
        <FilterButton>
          <StaffFilter
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            userRoles={userRoles}
          />
        </FilterButton>
      </View>
      <MaterialButtonPrimary
        caption="Add Staff"
        style={styles.materialBtn}
        onPress={() => setModalOpen(true)}
      />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.tableHead}>
              <View style={styles.titleViewName}>
                <Text style={styles.titleText}>Name</Text>
              </View>
              <View style={styles.titleViewEmail}>
                <Text style={styles.titleText}>Email</Text>
              </View>
              <View style={styles.titleViewRole}>
                <Text style={styles.titleText}>Role</Text>
              </View>
              <View style={styles.titleViewRole}>
                <Text style={styles.titleText}>Date</Text>
              </View>
              <View style={styles.titleViewOp}>
                <Text style={styles.titleText}>Operations</Text>
              </View>
            </View>
            {staffsList.map((staff, index) => {
              return (
                <MyListingStaffItem
                  key={`${staff['_id']}key`}
                  name={staff.user.name}
                  email={staff.user.email}
                  role={staff.role}
                  createdAt={staff.user.createdAt}
                  onDelete={() => deleteStaffHandler(staff['_id'])}
                  onEdit={() => {
                    setPayload({
                      edit: true,
                      data: staff
                    });
                    setModalOpen(true);
                  }}
                />
              );
            })}
          </View>
        </ScrollView>
      )}
      <AddStaffModal
        handleEditedSuccess={handleEditedSuccess}
        visible={modalOpen}
        onHide={() => {
          setModalOpen(false);
          setPayload({
            data: '',
            edit: false
          });
        }}
        users={staffsList}
        listingId={listingId}
        payload={payload}
        userRoles={userRoles}
      />
    </View>
  );
};

export default StaffsListing;

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
    width: 120,
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
    width: 130,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 1,
    borderColor: '#cecece',
    paddingTop: 10,
    paddingBottom: 10
  },
  titleViewEmail: {
    width: 200,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#cecece',
    paddingTop: 10,
    paddingBottom: 10
  },
  titleViewRole: {
    width: 109,
    justifyContent: 'center',
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
