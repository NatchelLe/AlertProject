import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal ,SafeAreaView, Dimensions} from 'react-native';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import HomeScreen from '../screens/HomeScreen';
import { Colors } from '../assets/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenWidth = Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;
import { BASE_URL } from "../assets/constants/ConstantData";
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import io from 'socket.io-client';
import * as Notifications from 'expo-notifications';

const serverURL = 'http://10.7.34.201:3002'; // Replace with your server's URL

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


const incidentTypes = [
  { label: 'Car jacking', value: 'Car jacking' },
  { label: 'Robbery', value: 'Robbery' },
  { label: 'Kidnapping', value: 'Kidnapping' },
  { label: 'Other', value: 'Other' },
];

const IncidentReportForm = () => {
  const [incident, setIncident] = useState({
    location: '',
    incidentType: '',
    description: '',
    customIncidentType: '',
  });


  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = useState(false); // Define isOtherSelected state variable



  const handleChange = (name, value) => {
    setIncident({
      ...incident,
      [name]: value,
    });
  };

  const handleIncidentTypeChange = (value) => {
    if (value === 'Other') {
      handleChange('incidentType', 'Other');
      handleChange('description', ''); // Clear description when 'Other' is selected
    } else {
      handleChange('incidentType', value);
    }
  };

  const handleSubmit = async () => {


    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [userLocation, setUserLocation] = useState(null);
    const [inDangerZone, setInDangerZone] = useState(false);
    const [locationSubscription, setLocationSubscription] = useState(null);
    const socket = io(serverURL);
  
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
  
    useEffect(() => {
      const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log("Please grant location permissions");
          return;
        }
  
        const subscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.BestForNavigation, distanceInterval: 10 },
          location => {
            const { latitude, longitude } = location.coords;
            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);
            setUserLocation(location);
  
            if (socket.connected) {
              socket.emit('userLocation', { latitude, longitude });
              console.log('Coordinates sent to the server:', latitude, longitude);
            } else {
              console.error('Socket is not connected. Coordinates not sent.');
            }
          }
        );
  
        setLocationSubscription(subscription);
  
        return () => {
          if (locationSubscription) {
            locationSubscription.remove();
          }
          socket.disconnect(); // Disconnect the socket when the component unmounts
        };
      };
  
      getPermissions();
  
      return () => {
        socket.disconnect(); // Disconnect the socket when the component unmounts
      };
    }, []);
  
    useEffect(() => {
      socket.on('proximityAlert', () => {
        setInDangerZone(true);
        console.log("Push notification displayed on the same page");
        schedulePushNotification();
      });
  
      return () => {
        socket.off('proximityAlert');
      };
    }, []);
  
    async function schedulePushNotification() {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Warning!⚠️",
          body: 'You are in the danger zone. Watch out and stay safe!',
          data: { data: 'goes here' },
        },
        trigger: { seconds: 1 },
      });
    }
  
    async function registerForPushNotificationsAsync() {
      let token;
  
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
  
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
      } else {
        alert('Must use a physical device for Push Notifications');
      }
  
      return token;
    }
  






    const { location, incidentType, description, customIncidentType } = incident;
    const citizen_id = await AsyncStorage.getItem("citizen_id");
    const location_id = await AsyncStorage.getItem("location_id");
    const report = {
      incident_type: incidentType === 'Other' ? customIncidentType : incidentType,
      rep_description: description,
      name: location, // Assuming 'name' corresponds to the location in your backend
      citizen_id: Number(citizen_id),
    };

    console.log(report);

    try {
      //10.0.27.42
      const response = await axios.post(`${BASE_URL}:3003/reports`, report);

    //  const response = await axios.post('http://localhost:3007/reports', report);

      if (response.status === 201) {
        console.log('Report created successfully');
        setIncident({
          location: '',
          incidentType: '',
          description: '',
          customIncidentType: '',
        });

        setSuccessMessageVisible(true);


      } else {
        console.error('Report creation failed. Response status:', response.status);
      }
      
    } catch (error) {
      console.error('Error creating report:', error);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
    <View style={styles.container}>
      <Text style={styles.title}>Incident Reporting</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your location"
        value={incident.location}
        onChangeText={(text) => handleChange('location', text)}
      />





<Text style={styles.label}>Incident Type:</Text>
{incidentTypes.map((type) => (
  <View key={type.value} style={styles.radioContainer}>
    <RadioButton
      value={type.value}
      status={incident.incidentType === type.value ? 'checked' : 'unchecked'}
      onPress={() => handleIncidentTypeChange(type.value)}
    />
    <Text>{type.label}</Text>
  </View>
))}

{setIsOtherSelected && (
  <TextInput
    style={styles.input}
    placeholder="Enter custom incident type"
    value={incident.customIncidentType}
    onChangeText={(text) => handleChange('customIncidentType', text)}
  />
)}

      <Text style={styles.label}>Incident Description:</Text>
      <TextInput
  style={styles.textArea}
  multiline
  placeholder="Type your description"
  value={incident.description}
  onChangeText={(text) => handleChange('description', text)}
/>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={{ color: 'white' }}>Submit</Text>
      </TouchableOpacity>

      <Modal visible={successMessageVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text>Report successfully submitted!</Text>
          <TouchableOpacity onPress={() => setSuccessMessageVisible(false)} style={styles.closeButton}>
      <Text style={{ color: 'white' }}>Close</Text>
    </TouchableOpacity>
        </View>
      </Modal>


      <View style={styles.btn}>
      <HomeScreen/>
      </View>
    </View>
    <View style={styles.bar}>
    <HomeScreen  />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginTop:50,
    borderRadius:10,
    backgroundColor: Colors.gray,
    alignItems: 'center',
    height:550,
    width: screenWidth * 0.85,
    marginTop:60,
    // marginLeft:40,
    // marginRight:40,
    marginBottom:10
  },
  closeButton: {
    backgroundColor: 'black',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  bar:{
    flex:1,
    justifyContent: 'flex-end',
    height: screenHeight * 5,
    left: 0,
    bottom: 0,
    right: 0,
    width: screenWidth * 0.98,
  },
  btn:{
    marginTop:15,
  },
  root:{
    flex:1,
    backgroundColor:'#cae7d3',
    justifyContent:'center',
    alignItems:'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: screenWidth * 0.72,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'lightgray',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'gray', // Set the background color to grey
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    width: screenWidth * 0.70,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: screenWidth * 0.70,
  },
  textArea: {
    borderWidth: 1,
    width: screenWidth * 0.70,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'lightgray',
    minHeight: 100,
  },
  button: {
    backgroundColor: 'black',
    color: 'white',
  },
});

export default IncidentReportForm;