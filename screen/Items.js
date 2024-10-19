import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Items = ({ route, navigation }) => {
  const { item, index, setItems } = route.params;
  const [currentItem, setCurrentItem] = useState(item);
  const removeItem = async () => {
    const storedItems = await AsyncStorage.getItem('items');
    const items = storedItems ? JSON.parse(storedItems) : [];
    const updatedItems = items.filter((_, i) => i !== index);
    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
    setItems(updatedItems);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{currentItem.title}</Text>
        <Text style={styles.cardItem}>{currentItem.item}</Text>
        <TouchableOpacity onPress={removeItem} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    width: '100%',
    marginBottom: 20,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  cardItem: {
    marginVertical: 10,
    fontSize: 18,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  backButton: {
    marginTop: 10,
    backgroundColor: '#0288d1',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});



