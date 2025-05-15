import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';


import {
  loadData,
  handleNameChange,
  handleDateChange,
} from '../../domain/viewModels/HomeScreenViewModel';

const backgroundImage = require('../../assets/Group 52.png'); 

// Initialize navigation, state for name, birth date, and date picker visibility
export default function HomeScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

// Load saved data from AsyncStorage
  useEffect(() => {
    loadData(setName, setBirthDate);
  }, []);



  // Save birth date to AsyncStorage when it changes
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false);
    handleDateChange(currentDate, setBirthDate);
  };


  // Navigate to Birthday Screen with name and birth date as parameters
  const navigateToBirthdayScreen = () => {
    navigation.navigate('Birthday', {
      name,
      birthDate: birthDate.toISOString(),
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Celebrate Your Baby’s Birthday with Nanit!</Text>
            <Text style={styles.emojis}>🎉🎂🎉</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={(text) => handleNameChange(text, setName)}
        />

        <Button
          title="Select Birth Date"
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <Button
          title="Show Birthday Screen"
          disabled={!name || !birthDate}
          onPress={navigateToBirthdayScreen}
        />
      </View>

      <View style={styles.imageContainer}>
        <Image source={backgroundImage} style={styles.backgroundImage} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    zIndex: 2,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  emojis: {
    fontSize: 28,   
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  backgroundImage: {
    width: '90%',
    height: 250,
    resizeMode: 'contain',
    opacity: 1,
  },
});
