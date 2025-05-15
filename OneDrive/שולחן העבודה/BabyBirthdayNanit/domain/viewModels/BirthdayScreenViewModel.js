import { saveFooterImage, getFooterImage } from '../../data/repositories/UserRepository';
/**
 * Calculate the accurate age in months
 * @param {Date} birthDate - The birth date of the baby
 * @returns {number} - The age in months
 */
 export const calculateAgeInMonths = (birthDate) => {
    const today = new Date();

     // Calculate year, month, and day differences
    const yearDifference = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
  
    // Calculate the age in months
    let ageInMonths = yearDifference * 12 + monthDifference;


   // If the current day is before the birth date in the month, subtract one month
    if (dayDifference < 0) {
            ageInMonths--;
    }

    // If the calculated age is negative, set it to 0
    if (ageInMonths < 0) {
        ageInMonths = 0;
    }
    return ageInMonths;
}


/**
 * Calculate the age in years or months, based on the age
 * @param {Date} birthDate - The birth date of the baby
 * @returns {number} - The age in years or months
 */
export const calculateAge = (birthDate) => {
    const ageInMonths = calculateAgeInMonths(birthDate);
  
    // If the age is less than 12 months, return months; otherwise, return years
    return ageInMonths < 12 ? ageInMonths : Math.floor(ageInMonths / 12);
  };

/**
 * Determine if it's in months or years
 * @param {Date} birthDate - The birth date of the baby
 * @returns {string} - The age text 
 */
export const ageText = (birthDate) => {
    const ageInMonths = calculateAgeInMonths(birthDate);

    if (ageInMonths < 12) {
        if(ageInMonths == 1){
            return 'MONTH OLD!';
        }
        else{
            return 'MONTHS OLD!';
        }
    
    } else {
        if(ageInMonths == 12){
            return 'YEAR OLD!';
        }
        else{
            return 'YEARS OLD!';
        }
    }
  };



/**
 * Get the correct image based on the baby's age
 * @param {Date} birthDate - The birth date of the baby
 * @param {Array} numberImages - The array of number images
 * @returns {Image} - The corresponding image for the baby's age
 */
  export const getNumberImage = (birthDate, numberImages) => {
    const age = calculateAge(birthDate);

    // Return the corresponding number image or the first image if out of range
    return numberImages[age] ;
  };



// Function to load the footer image from AsyncStorage
  export const loadFooterImage = async (setImage) => {
    try {

      // Retrieve the image URI from storage
      const imageUri = await getFooterImage();

      // If an image URI is found, update the state with it
      if (imageUri) {
        setImage(imageUri);
      }
    } catch (error) {
      console.error('Failed to load footer image:', error);  // Log an error if loading fails
    }
  };
  

  // Function to handle changes to the footer image
  export const handleFooterImageChange = async (imageUri, setImage) => {
    try {

      // Update the image state with the new image URI
      setImage(imageUri);

      // Save the new image URI to AsyncStorage
      await saveFooterImage(imageUri);
    } catch (error) {
      console.error('Failed to save footer image:', error);   // Log an error if saving fails
    }
    
  };