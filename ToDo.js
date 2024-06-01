// components/ToDo.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false, key: Math.random().toString() }]);
      setInput('');
    }
  };

  const handleToggleTask = (key) => {
    const newTasks = tasks.map((task) =>
      task.key === key ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const handleRemoveTask = (key) => {
    const newTasks = tasks.filter((task) => task.key !== key);
    setTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={input}
        onChangeText={setInput}
      />
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={item.completed ? styles.completedTask : styles.task}>{item.text}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.taskButton} onPress={() => handleToggleTask(item.key)}>
                <Text style={styles.buttonText}>{item.completed ? 'Undo' : 'Complete'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.taskButton, styles.removeButton]} onPress={() => handleRemoveTask(item.key)}>
                <Text style={[styles.buttonText, styles.removeButtonText]}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addButtonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#61dafb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  task: {
    fontSize: 18,
    color: '#333',
  },
  completedTask: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  buttons: {
    flexDirection: 'row',
  },
  taskButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#61dafb',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  removeButton: {
    backgroundColor: '#ff6b6b',
  },
  removeButtonText: {
    color: '#fff',
  },
});

export default ToDo;
