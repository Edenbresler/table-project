import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * Save the baby's name to AsyncStorage
 * @param {string} name - The name of the baby
 */
export const saveName = async (name) => {
  try {
    await AsyncStorage.setItem('name', name);
  } catch (error) {
    console.log('Failed to save name:', error);
  }
};


/**
 * Retrieve the baby's name from AsyncStorage
 * @returns {string} - The name of the baby (or an empty string if not found)
 */
export const getName = async () => {
  try {
    const name = await AsyncStorage.getItem('name');
    return name !== null ? name : '';
  } catch (error) {
    console.log('Failed to load name:', error);
  }
};

/**
 * Save the baby's birth date to AsyncStorage
 * @param {Date} birthDate - The birth date of the baby
 */
export const saveBirthDate = async (birthDate) => {
  try {
    await AsyncStorage.setItem('birthDate', birthDate.toISOString());
  } catch (error) {
    console.log('Failed to save birth date:', error);
  }
};


/**
 * Retrieve the baby's birth date from AsyncStorage
 * @returns {Date} - The birth date of the baby (or the current date if not found)
 */
export const getBirthDate = async () => {
  try {
    const storedDate = await AsyncStorage.getItem('birthDate');
    return storedDate !== null ? new Date(storedDate) : new Date();
  } catch (error) {
    console.log('Failed to load birth date:', error);
  }
};


// Function to save the footer image URI to AsyncStorage
export const saveFooterImage = async (uri) => {
  try {
    // Store the image URI with the key 'footerImage'
    await AsyncStorage.setItem('footerImage', uri);
  } catch (error) {
    console.error('Failed to save footer image:', error);  // Log an error if saving fails
  }
};

// Function to retrieve the footer image URI from AsyncStorage
export const getFooterImage = async () => {
  try {

    // Get the image URI from storage using the key 'footerImage'
    const imageUri = await AsyncStorage.getItem('footerImage');

    // Return the URI if found, otherwise return null
    return imageUri !== null ? imageUri : null;
  } catch (error) {
    console.error('Failed to load footer image:', error);  // Log an error if loading fails
  }
};
