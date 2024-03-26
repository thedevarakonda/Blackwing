import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import { format } from 'date-fns';

const HomeScreen = () => {
  const [data, setData] = useState([
    { date: '2024-03-20', count: 10 },
    { date: '2024-03-21', count: 15 },
    { date: '2024-03-22', count: 20 },
    { date: '2024-03-20', count: 10 },
    { date: '2024-03-21', count: 15 },
    { date: '2024-03-22', count: 20 },
    { date: '2024-03-20', count: 10 },
    { date: '2024-03-21', count: 15 },
    { date: '2024-03-22', count: 20 },
    { date: '2024-03-20', count: 10 },
    { date: '2024-03-21', count: 15 },
    { date: '2024-03-22', count: 20 },
    { date: '2024-03-20', count: 10 },
    { date: '2024-03-21', count: 15 },
    { date: '2024-03-22', count: 20 },
  ]);

  const handleItemClick = (item) => {
    console.log('Item clicked:', item);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)} style={styles.item}>
      <Text style={styles.date}>{format(new Date(item.date), 'EEEE, MMMM do yyyy')}</Text>
      <View style={styles.countContainer}>
        <Text style={styles.count}>Drone Count:</Text>
        <Text style={styles.countValue}>{item.count}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.content}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  content: {
    flexGrow: 1,
  },
  item: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  countContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  count: {
    fontSize: 14,
    color: '#888',
    marginRight: 5,
  },
  countValue: {
    fontSize: 14,
    color: '#000',
  },
});

export default HomeScreen;
