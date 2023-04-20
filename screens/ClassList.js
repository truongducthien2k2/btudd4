import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const db = SQLite.openDatabase('mydb200.db');

export default function ConstantsScreen() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS constants (id INTEGER PRIMARY KEY AUTOINCREMENT, idname TEXT, name TEXT, quantity INTEGER);'
      );
      tx.executeSql('INSERT INTO constants (idname, name, quantity) VALUES (?, ?, ?)', ['cid1', 'thien1', 10]);
      tx.executeSql('INSERT INTO constants (idname, name, quantity) VALUES (?, ?, ?)', ['cid2', 'thien2', 20]);
      tx.executeSql('INSERT INTO constants (idname, name, quantity) VALUES (?, ?, ?)', ['cid3', 'thien3', 30]);
      tx.executeSql('INSERT INTO constants (idname, name, quantity) VALUES (?, ?, ?)', ['cid4', 'thien4', 40]);
      tx.executeSql('SELECT * FROM constants', [], (_, { rows }) =>
        setData(rows._array)
      );
    });
  }, []);

  const onPressConstant = (item) => {
    navigation.navigate('ClassDetails', {constantData: item});
  }

  const renderConstantItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onPressConstant(item)}>
        <View style={styles.constantContainer}>
          <Text style={styles.constantText}>ID Name: {item.idname}</Text>
          <Text style={styles.constantText}>Name: {item.name}</Text>
          <Text style={styles.constantText}>Quantity: {item.quantity}</Text>
        </View>
      </TouchableOpacity>
    );
  };

return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Constants</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderConstantItem}
        keyExtractor={item => item.id.toString()}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    height: 80,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  constantContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  constantText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  flatList: {
    marginTop: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  studentContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  studentText: {
    fontSize: 16,
  },
});