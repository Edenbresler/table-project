import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, View } from 'react-native';

const DatePickerComponent = ({ date, setDate }) => {
  const [show, setShow] = React.useState(false);      // Manage visibility of the date picker

  // Handle the date change event
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;  // Use selected date or the current one
    setShow(false);                            // Hide the picker after selection
    setDate(currentDate);                      // Update the parent component's date
  };

  return (
    <View>
      <Button title="Select Date" onPress={() => setShow(true)} />
      {show && (
        <DateTimePicker
        value={date}            // Current selected date
        mode="date"             // Mode set to date only
        display="default"       // Display style
        onChange={onChange}     // Handle date changes
        />
      )}
    </View>
  );
};

export default DatePickerComponent;
