import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { numberImages } from '../../assets/numberImages';
import shareIcon from '../../assets/ic_share.png';
import { ageText, getNumberImage } from '../../domain/viewModels/BirthdayScreenViewModel';
import { loadFooterImage, handleFooterImageChange } from '../../domain/viewModels/BirthdayScreenViewModel';
import ImagePickerComponent from '../../components/ImagePickerComponent';

// Background images for the screen
const backgrounds = [
  require('../../assets/iOS - BG_Fox.png'), 
  require('../../assets/iOS - BG_Elephant.png'), 
  require('../../assets/iOS - BG_Pelican.png'), 
];

// Background colors for each theme
const backgroundColors = ['#D1F5E1', '#FFF8DC', '#D1F0FF'];

// Decorative images
const leftSwirl = require('../../assets/Left swirls.png');
const rightSwirl = require('../../assets/Right swirls.png');
const nanitLogo = require('../../assets/Nanit logo.png');

// Footer images for each theme
const footerImages = [
    require('../../assets/Group 54.png'), 
    require('../../assets/Group 53.png'), 
    require('../../assets/Group 52.png'), 
];

// Camera icons for each theme
const cameraIcon = [
    require('../../assets/Group 50.png'),  
    require('../../assets/Group 49.png'),
    require('../../assets/Group 51.png'),
    
];



const { width, height } = Dimensions.get('window');

// State management for name, birth date, background, and footer image
const BirthdayScreen = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date()); 
  const [selectedBackground, setSelectedBackground] = useState(0);
  const [footerImage, setFooterImage] = useState(null);
  const navigation = useNavigation();



// Load data from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {

        // Load name and birth date from AsyncStorage
        const storedName = await AsyncStorage.getItem('name');
        const storedDate = await AsyncStorage.getItem('birthDate');
        if (storedName) setName(storedName);
        if (storedDate) setBirthDate(new Date(storedDate));

        // Load footer image from AsyncStorage
        await loadFooterImage(setFooterImage);

        // Randomly pick a background
        const randomBackground = Math.floor(Math.random() * 3);
        setSelectedBackground(randomBackground);

      } catch (error) {
        console.log('Failed to load data from storage:', error);
      }
    };
    loadData();
  }, []);


  // Function to handle image change
  const handleImageChange = (uri) => {
    handleFooterImageChange(uri, setFooterImage);
  };



  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 0 }}> 

      {/* Main container with background color */}
      <View style={[styles.container, { backgroundColor: backgroundColors[selectedBackground] }]}>

         {/* Background image */}
        <Image source={backgrounds[selectedBackground]} style={styles.backgroundImage} />

        {/* Title and Age Display */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={2} adjustsFontSizeToFit>
            TODAY {name.toUpperCase()} IS
          </Text>


          {/* Age Number with Swirls */}
          <View style={styles.numberContainer}>
            <Image source={leftSwirl} style={styles.swirl} />
            <Image source={getNumberImage(birthDate, numberImages)} style={styles.numberImage} />
            <Image source={rightSwirl} style={styles.swirl} />
          </View>

          <Text style={styles.ageText}>{ageText(birthDate)}</Text>
        </View>

        {/* Footer wrapper with images */}
        <View style={styles.footerWrapper}>
          <View style={styles.imageContainer}>
            {footerImage ? (
              <Image 
                source={{ uri: footerImage }} 
                style={styles.footerImage} 
              />
            ) : (
              <Image 
                source={footerImages[selectedBackground]} 
                style={styles.footerImage} 
              />
            )}
          </View>

          {/* Camera Icon */}
          <TouchableOpacity style={styles.cameraIcon}>
            <ImagePickerComponent setImage={handleImageChange} />
          </TouchableOpacity>
        </View>



        {/* Nanit logo and share button */}
        <View style={styles.footerContainer}>
          <Image source={nanitLogo} style={styles.nanitLogo} />

     
        <View style={styles.shareButtonWrapper}>
            <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Share the news</Text>
            <Image source={shareIcon} style={styles.shareIcon} />
            </TouchableOpacity>
        </View>
        </View>

        {/* Back button */}
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
        > 
          <Image 
            source={require('../../assets/ic_back.png')} 
            style={styles.backButtonIcon} 
          />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', 
    zIndex: 0,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    zIndex: 1,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    maxWidth: '90%',
    marginTop: 0,
    paddingTop: 0,
    zIndex: 2,


  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.015, 
    marginTop: height * 0.015,
    zIndex: 2,


    
  },
  swirl: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'contain',
    zIndex: 2,

 
    
    
  },
  numberImage: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'contain',
    zIndex: 2,

  
    
  },
  ageText: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    zIndex: 2,

  },
  footerWrapper: {
    position: 'relative',
    width: Math.min(width - 100, width * 0.6), 
    height: Math.min(width - 100, width * 0.6),
    borderRadius: Math.min(width - 100, width * 0.6) / 2,
   
    alignItems: 'center',
    
    marginBottom:height * 0.03,
    


  },
  footerImage: {
    width: Math.min(width - 100, width * 0.6), 
    height: Math.min(width - 100, width * 0.6),
    borderRadius: Math.min(width - 100, width * 0.6) / 2,
    aspectRatio: 1,    
    resizeMode: 'contain',
    alignSelf: 'center',
    zIndex:0,

 

  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: Math.min(width - 100, width * 0.6) / 2, 
    overflow: 'hidden', 
    
    
    
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'space-between',  
    alignItems: 'center',
    alignSelf: 'stretch',
    zIndex: 2,


  },
  nanitLogo: {
    resizeMode: 'contain',
    width: width * 0.15,
    height: height * 0.05,
    zIndex: 2,
    

    
  },
  shareButtonWrapper: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center', 
    width: '100%',
    zIndex: 2,


  },
  shareButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    position: 'absolute',
    

 
  },
  shareButtonText: {
    color: '#FFF',
    fontSize: width * 0.04,
    marginRight: 5,

    
  },
  shareIcon: {
    width: width * 0.05,
    height: width * 0.05,
  },
  cameraIcon: {
    position: 'absolute',    
    width: width * 0.1,
    height: width * 0.1,

    top: (Math.min(width - 100, width * 0.6)) / 2 -(((Math.min(width - 100, width * 0.6)) / 2)*0.707), 
    left: (Math.min(width - 100, width * 0.6)) / 2 +(((Math.min(width - 100, width * 0.6)) / 2)*0.707), 
    transform: [{ translateX: -(width * 0.05) }, { translateY: -(width * 0.05) }],
    zIndex: 3,

    
  },
  backButton: {
    position: 'absolute',
    top: height * 0.03,
    left: width * 0.05,
    alignItems: 'center',
    zIndex:3,

    width: width * 0.1,
    height: width * 0.1,


  },
  backButtonIcon: {
    position:'relative', 
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain',  
    
  },
  detailsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Math.max(height * 0.05, 20), 
    marginTop: Math.max(height * 0.05, 20), 

    
 
  },
  cameraIconWrapper: {
    width: Math.min(width - 100, width * 0.6), 
    height: Math.min(width - 100, width * 0.6),
    borderRadius: Math.min(width - 100, width * 0.6) / 2,
    aspectRatio: 1,    
    resizeMode: 'contain',
    alignSelf: 'center',

  },
});
export default BirthdayScreen;