import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputComponent = ({ value, placeholder, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}               // Styling for the input field
      value={value}                      // The current value of the input
      placeholder={placeholder}          // Placeholder text to display when the input is empty
      onChangeText={onChangeText}        // Callback to handle text changes
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
});

export default InputComponent;
