import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const db = SQLite.openDatabase('class.db');

export default function ClassDetails({ route }) {
  const constants = route.params.constantData;
  const [students, setStudents] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE students'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, idname TEXT, dob DATE, constant_idname TEXT, FOREIGN KEY(constant_idname) REFERENCES constants(idname));'
      );
      tx.executeSql(
        'INSERT INTO students (name, idname, dob, constant_idname) VALUES (?, ?, ?, ?)',
        ['avc', 'Pror', '2002/01/01', constants.idname]
      );
      tx.executeSql(
        'INSERT INTO students (name, idname, dob, constant_idname) VALUES (?, ?, ?, ?)',
        ['Js', 'studenta', '2002/01/01', constants.idname]
      );
      tx.executeSql(
        'SELECT * FROM students WHERE constant_idname = ?',
        [constants.idname],
        (_, { rows }) => setStudents(rows._array)
      );
    });
  }, []);

  const renderItem = ({ item }) => {
    console.log(item.dob);
    return (
      <View style={styles.constantContainer}>
        <Text style={styles.studentText}>Name: {item.name}</Text>
        <Text style={styles.studentText}>Idname: {item.idname}</Text>
        <Text style={styles.studentText}>DoB: {item.dob}</Text>
      </View>
    );
  };

  if (!constant) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
    }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Class Detail</Text>
      </View>
      <View style={styles.constantContainer}>
        <Text style={styles.constantText}>ID Name: {constants.idname}</Text>
        <Text style={styles.constantText}>Name: {constants.name}</Text>
        <Text style={styles.constantText}>Quantity: {constants.quantity}</Text>
      </View>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
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
      studentText: {
        fontSize: 15,
        fontWeight: '500',
      },
})