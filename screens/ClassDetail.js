import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const db = SQLite.openDatabase('mydb36.db');

export default function ClassDetails({ route }) {
  const { idname } = route.params;
  const [constant, setConstant] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM constants WHERE idname = ?',
        [idname],
        (_, { rows }) => setConstant(rows._array[0])
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, job TEXT, constant_idname TEXT, FOREIGN KEY(constant_idname) REFERENCES constants(idname));'
      );
      tx.executeSql('INSERT INTO students (name, job, constant_idname) VALUES (?, ?, ?)',['abc', 'thien', idname]
      );
      tx.executeSql('INSERT INTO students (name, job, constant_idname) VALUES (?, ?, ?)',['bcd', 'nam', idname]
      );
      tx.executeSql('SELECT * FROM students WHERE constant_idname = ?',[idname],(_, { rows }) => setStudents(rows._array)
      );
    });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.studentContainer}>
        <Text style={styles.studentText}>Name: {item.name}</Text>
        <Text style={styles.studentText}>Job: {item.job}</Text>
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
        <Text style={styles.title}>Constant Detail</Text>
      </View>
      <View style={styles.constantContainer}>
        <Text style={styles.constantText}>ID Name: {constant.idname}</Text>
        <Text style={styles.constantText}>Name: {constant.name}</Text>
        <Text style={styles.constantText}>Quantity: {constant.quantity}</Text>
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
})