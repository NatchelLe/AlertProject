import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../assets/Colors";

const Header = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleButtonPressIn = (button) => {
    setHoveredButton(button);
  };

  const handleButtonPressOut = () => {
    setHoveredButton(null);
  };
  const navigation = useNavigation();
  const navigateToAnotherPage = (pageName) => {
    // Use navigation to navigate to another page
    navigation.navigate(pageName);
    // toggleDropdown(); // Close the dropdown after navigating
  };

  const buttonStyle = (name) => ({
    ...styles.button,
    transform: [
      { scale: hoveredButton === name ? 1.2 : 1 } // Increase the size when button is pressed
    ]
  });

  return (

    <View style={styles.container}>
         <View style={styles.root}>

<View style={styles.buttonRow}>


 
 

  
  <TouchableOpacity onPress={() => navigateToAnotherPage("TipsPage")}
    style={buttonStyle("tips")}
    onPressIn={() => handleButtonPressIn("tips")}
    onPressOut={handleButtonPressOut}
  >
    <Icon name="lightbulb-o" size={30} color="Black" />
    <Text style={[styles.text, { color: Colors.blue }, styles.topHeading]}>Tips</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigateToAnotherPage("Graph")}
    style={buttonStyle("contact")}
    onPressIn={() => handleButtonPressIn("contact")}
    onPressOut={handleButtonPressOut}
  >
    <Image
        source={require('./assets/images/chatbot.jpg')} // Update the path accordingly
        style={{ width: 30, height: 30, tintColor: 'black' }}
        />
    <Text style={[styles.text, { color: Colors.blue }, styles.topHeading]}>Stats</Text>
  </TouchableOpacity>
 
</View>
</View>
    </View>
   
  );
};

const styles = {
  container: {
    flex: 1,
    marginBottom:20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  root: {
    justifyContent: 'flex-end',
    left: 0,
    bottom: 0,
    right: 0,
    flex:1
  },
  buttonRow: {
    flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: Colors.gray,
    borderRadius: 15,
    elevation: 8, // Add elevation for shadow (Android)
    shadowColor: "black", // Specify shadow color (iOS)
    shadowOffset: { width: 0, height: 2 }, // Specify shadow offset (iOS)
    shadowOpacity: 0.2, // Specify shadow opacity (iOS)
    shadowRadius: 2,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
};

export default Header;
