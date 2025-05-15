import React, { useState, useEffect } from 'react';
import { View, Image, Button, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import cameraIcon from '../assets/Group 50.png';
import { handleFooterImageChange } from '../domain/viewModels/BirthdayScreenViewModel';

// ImagePickerComponent allows the user to select an image from the gallery or take a new one with the camera
const ImagePickerComponent = ({ setImage }) => {  

// Request permissions for both gallery and camera when the component mounts
useEffect(() => {
  const requestPermissions = async () => {

    // Request permission to access the media library (gallery)
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // Request permission to access the camera
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

    // If either permission is not granted, show an alert
    if (galleryStatus !== 'granted' || cameraStatus !== 'granted') {
      alert('Sorry, we need camera and gallery permissions to make this work!');
    }
  };

  requestPermissions();
}, []);

// Function to select an image from the gallery
const pickImageFromGallery = async () => {
  try {

    // Launch the image picker to choose an image from the gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Allow only image files
      allowsEditing: true, // Allow basic editing like cropping
      quality: 1, // Maximum quality of the image
    });

    // If the user didn't cancel the selection, update the image in the state and AsyncStorage
    if (!result.canceled) {
      setImage(result.assets[0].uri);  // Update the image state with the selected image URI
      handleFooterImageChange(result.assets[0].uri, setImage);  // Save the image in AsyncStorage as well
    }
  } catch (error) {
    console.error('Failed to pick image from gallery:', error);
  }
};

// Function to take a new image with the camera
const takeImageFromCamera = async () => {
  try {

    // Launch the camera to take a new picture
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Allow basic editing like cropping
      quality: 1, // Maximum quality of the image
    });

    // If the user didn't cancel the selection, update the image in the state and AsyncStorage
    if (!result.canceled) {
      setImage(result.assets[0].uri); // Update the image state with the captured image URI
      handleFooterImageChange(result.assets[0].uri, setImage); // Save the image in AsyncStorage as well
    }
  } catch (error) {
    console.error('Failed to take image from camera:', error);
  }
};

// Function to open an alert menu to choose between the camera or gallery
const openImagePicker = () => {
  Alert.alert(
    "Select Image", // Title of the alert
    "Choose an image source", // Message in the alert
    [
      { text: "Camera", onPress: takeImageFromCamera }, // Option for the camera
      { text: "Gallery", onPress: pickImageFromGallery }, // Option for the gallery
      { text: "Cancel", style: "cancel" } // Option to cancel the action
    ]
  );
};



  // Render the camera icon as a button to open the picker menu
  return (
    <TouchableOpacity onPress={openImagePicker} style={{ position: 'absolute'}}>
      <Image source={cameraIcon}  />
    </TouchableOpacity>
  );
};

export default ImagePickerComponent;
