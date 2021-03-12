import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import colors from '@parkyourself-frontend/shared/config/colors';
import { useCardCRUD } from '@parkyourself-frontend/shared/hooks/stripe';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import ScreenTittle from '../common/ScreenTittle';
import AddCardModal from './AddCardModal';
import NoFound from '../common/NoFound';

export default function CardList() {
  const { createSetupIntent, cards, handleDeleteCard, refetchCards, loading } = useCardCRUD();
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  return (
    <View style={styles.container}>
      <ScreenTittle title="Payments" />
      <AddCardModal
        visible={showAddCardModal}
        onComplete={async () => {
          await refetchCards();
          setShowAddCardModal(false);
        }}
        onHide={async () => setShowAddCardModal(false)}
        createSetupIntent={createSetupIntent}
      />
      <View style={styles.rect}>
        <TouchableOpacity style={styles.rect2} onPress={() => setShowAddCardModal(true)}>
          <View style={styles.wrapper}>
            <EntypoIcon name="circle-with-plus" style={styles.icon5} />
            <Text style={styles.loremIpsum}>Add Payment Method</Text>
          </View>
        </TouchableOpacity>
        <FlatList
          data={cards}
          renderItem={({ item, index }) => (
            <CardItem item={item} index={index} handleDeleteCard={handleDeleteCard} />
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <View>
              <NoFound loading={loading} count={cards.length} label="Cards" />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const CardItem = ({ item, handleDeleteCard }) => {
  const [disabled, setDisabled] = useState(false);
  const onDelete = async (id) => {
    try {
      setDisabled(true);
      await handleDeleteCard(id);
    } catch (error) {
      setDisabled(false);
      Alert.alert('Something Went Wrong', 'Please try again');
    }
  };
  return (
    <View style={styles.rect2}>
      <View>
        <Text style={styles.cardBrand}>{item.card.brand}</Text>
        <Text style={styles.cardNumber}>{`**** **** **** ${item.card.last4}`}</Text>
        <Text>
          Expiry {item.card.exp_month}/{item.card.exp_year}
        </Text>
      </View>
      {disabled ? (
        <ActivityIndicator size="small" color={colors.black} />
      ) : (
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <FontAwesomeIcon name="trash-o" style={styles.icon2} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15
  },
  rect: {
    marginTop: 15
  },
  rect2: {
    width: '100%',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 1,
      height: 1
    },
    elevation: 2,
    shadowOpacity: 0.15,
    shadowRadius: 1,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  icon5: {
    color: colors.primary,
    fontSize: 30
  },
  icon: {
    fontSize: 28,
    color: colors.secondary
  },
  icon2: {
    fontSize: 25
  },
  loremIpsum: {
    color: colors.black,
    fontSize: 17,
    marginLeft: 20,
    fontWeight: 'bold'
  },
  cardBrandBox: {
    marginRight: 10
  },
  cardBrand: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 17
  },
  cardNumber: {
    fontSize: 17
  }
});
