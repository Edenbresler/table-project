import { saveName, getName, saveBirthDate, getBirthDate } from '../../data/repositories/UserRepository';

/**
 * Load data (name and birth date) from storage and update the state
 * @param {function} setName - Function to set the name in the state
 * @param {function} setBirthDate - Function to set the birth date in the state
 */

export const loadData = async (setName, setBirthDate) => {
  try{
     // Retrieve data from local storage (AsyncStorage)
    const storedName = await getName();
    const storedDate = await getBirthDate();
    
     // Update state if data is available
    if (storedName) setName(storedName);
    if (storedDate) setBirthDate(storedDate);
  }catch (error){
    console.error('Failed to load data:', error);
  }
};

/**
 * Handle name change and save it to storage
 * @param {string} text - The new name
 * @param {function} setName - Function to update the name in the state
 */

export const handleNameChange = async (text, setName) => {
  try {
    // Update the state with the new name
    setName(text);

    // Save the updated name in local storage (AsyncStorage)
    await saveName(text); 
  } catch (error) {
    console.error('Failed to save name:', error);
  }
};


/**
 * Handle birth date change and save it to storage
 * @param {Date} date - The new birth date
 * @param {function} setBirthDate - Function to update the birth date in the state
 */
export const handleDateChange = async (date, setBirthDate) => {
  try {
    // Update the state with the new birth date
    setBirthDate(date);

    // Save the updated birth date in local storage (AsyncStorage)
    await saveBirthDate(date); 
  } catch (error) {
    console.error('Failed to save birth date:', error);
  }
};
