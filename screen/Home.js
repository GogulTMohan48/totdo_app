import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const loadItems = async () => {
    const storedItems = await AsyncStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  };
  const removeItem = (index) => {
    Alert.alert(
      'Confirm Removal',
      'Are you sure you want to remove this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK', onPress: async () => {
            const updatedItems = items.filter((_, i) => i !== index);
            await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
            setItems(updatedItems);
          }
        }
      ],
      { cancelable: false }
    );
  };
  const handleCardPress = (item) => {
    navigation.navigate('items', { item, setItems });
  };
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <LinearGradient
      colors={['#b3e5fc', '#0288d1', '#e1bee7', '#7b1fa2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text1}>ToDo List</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('add', { setItems })}
            style={styles.button}
          >
            <Text style={styles.text2}>Add Items</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search here"
            placeholderTextColor="gray"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleCardPress(item)} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardItem}>{item.item}</Text>
              <TouchableOpacity onPress={() => removeItem(index)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noResultsText}>No items found.</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    flexGrow: 1,
    alignItems: 'stretch',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  text1: {
    fontSize: 30,
    fontWeight: '600',
  },
  text2: {
    fontWeight: '800',
  },
  button: {
    borderRadius: 20,
    borderWidth: 2,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 20,
    height: 50,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    paddingLeft: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    marginTop: 20
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardItem: {
    marginVertical: 5,
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
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'white',
  },
});


