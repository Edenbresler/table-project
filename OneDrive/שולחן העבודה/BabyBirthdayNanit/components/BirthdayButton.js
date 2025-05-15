
import React from 'react';
import { Button } from 'react-native';

const BirthdayButton = ({ onPress, disabled }) => {
  return (
    <Button
    title="Show Birthday Screen" // Button label
    onPress={onPress}            // Callback function when button is pressed
    disabled={disabled}          // If true, button is disabled
    />
  );
};

export default BirthdayButton;
