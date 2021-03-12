import React from 'react';
import PropTypes from 'prop-types';
import colors from '@parkyourself-frontend/shared/config/colors';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useCRUDPropertyType } from '@parkyourself-frontend/shared/hooks/adminSettings';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ScreenTittle from '../common/ScreenTittle';
import LoadingSpinner from '../common/LoadingSpinner';
import MaterialButtonPrimary from '../MaterialButtonPrimary';

export default function FormOptionCRUD({ id }) {
  const {
    setForm,
    payload,
    oneData,
    loading,
    handleDelete,
    handleChangeFormOption,
    handleSubmit,
    handleAddNew,
    handleEdit,
    form,
    disabled,
    handlePublish
  } = useCRUDPropertyType(id);

  return (
    <View style={styles.outerView}>
      <ScreenTittle title="Property Type" />
      {form.form ? (
        <View>
          <View style={styles.formHeader}>
            <Text style={styles.formHeaderText}>Add New Property Type</Text>
            <TouchableOpacity onPress={() => setForm({ edit: false, form: false })}>
              <FeatherIcon name="x" style={styles.materialCIcon} />
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              onChangeText={(text) => handleChangeFormOption(text)}
              value={payload.options[payload.index] ? payload.options[payload.index].value : ''}
              style={styles.input}
              placeholder="Property Type"
            />
            <MaterialButtonPrimary
              onPress={() => handleSubmit()}
              caption="Submit"
              style={styles.materialButtonPrimary}
              disabled={disabled}
            />
          </View>
        </View>
      ) : (
        <MaterialButtonPrimary
          onPress={handleAddNew}
          caption="Add New"
          style={styles.materialButtonPrimary}
        />
      )}
      {loading ? (
        <LoadingSpinner style={{ marginTop: 40 }} />
      ) : (
        !form.form && (
          <FlatList
            data={oneData.options}
            keyExtractor={(item) => item.label}
            renderItem={({ item, index }) => (
              <ListItem
                label={item.label}
                published={item.published}
                index={index}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handlePublish={handlePublish}
              />
            )}
          />
        )
      )}
    </View>
  );
}

FormOptionCRUD.propTypes = {
  id: PropTypes.any.isRequired
};

const ListItem = ({ label, published, index, handleDelete, handleEdit, handlePublish }) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => handlePublish(index)}>
          <MaterialCommunityIconsIcon
            name={published ? 'toggle-switch' : 'toggle-switch-off'}
            style={styles.materialCIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEdit(index)}>
          <FeatherIcon name="edit" style={styles.featherIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(index)}>
          <MaterialCommunityIconsIcon name="delete" style={styles.materialCIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

ListItem.propTypes = {
  label: PropTypes.string.isRequired,
  published: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center'
  },
  formHeaderText: {
    fontSize: 20
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
  iconRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    borderColor: colors.grey,
    borderWidth: 0.5,
    height: 40,
    padding: 5,
    borderRadius: 5
  },
  label: {
    fontSize: 15
  },
  listItem: {
    marginTop: 20,
    marginBottom: 1,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    paddingBottom: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  outerView: { flex: 1, backgroundColor: colors.white, padding: 20 },

  materialCIcon: {
    fontSize: 30,
    color: colors.secondary
  },
  featherIcon: {
    fontSize: 25,
    color: colors.secondary,
    marginHorizontal: 15
  }
});
