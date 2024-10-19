import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({ navigation, route }) => {
  const { setItems } = route.params;
  const [title, setTitle] = useState('');
  const [item, setItem] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!title.trim() || !item.trim()) {
      setError('Both fields are required');
      return;
    }
    setError('');

    const newItem = { title, item };

    const currentItems = await AsyncStorage.getItem('items');
    const updatedItems = currentItems ? JSON.parse(currentItems) : [];
    updatedItems.push(newItem);
    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));

    setItems(updatedItems);
    navigation.navigate('home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Add Items</Text>
      <View style={styles.box}>
        <TextInput
          style={styles.input}
          placeholder='Enter Title of Item'
          value={title}
          onChangeText={setTitle}
        />
        {error && !title && <Text style={styles.errorText}>{error}</Text>}

        <TextInput
          style={styles.input}
          placeholder='Enter Item'
          value={item}
          onChangeText={setItem}
        />
        {error && !item && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <Button title='Save' onPress={handleSave} />
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  text1: {
    fontSize: 30,
    fontWeight: '600',
  },
  box: {
    margin: 10,
    width: 300,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

