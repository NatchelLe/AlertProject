import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,SafeAreaView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';
import HomeScreen from './HomeScreen';
import { Colors } from '../assets/Colors';
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





const screenWidth = Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;
export default function Graph() {



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






  const [incidentType, setIncidentType] = useState([]);
  const [numPerCrime, setNumPerCrime] = useState([]);
  const [findLocation, setFindLocation] = useState('');
  const [isFound, setIsFound] = useState(false);
  const [showRatesLabel, setShowRatesLabel] = useState(false); // Add a state for the Rates label
  const api = 'http://localhost:3008/get_survey_summary_report/';
  const welcomeMessage = `HI`;
  useEffect(() => {
    axios.get(api + 'mabopaneTT').then(
      (res) => {
        console.log(res.data);
        const uniqueIncidentTypes = [...new Set(res.data.incident_types)];
        setIncidentType(uniqueIncidentTypes);
        setNumPerCrime(res.data.numper_per_incedences);
        setIsFound(res.data.success);
        if (res.data.success) {
          setShowRatesLabel(true); // Show the Rates label when the graph is displayed
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const chartConfig = {
    backgroundGradientFrom: '#F0F0F0',
    barPercentage: 7.8,
    backgroundGradientFromOpacity: 0.8,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0.8,
    color: (opacity = 1) => {
      const colors = ['black', 'darkgrey', 'lightgrey', 'grey', 'orange']; // Update the colors
      const colorIndex = Math.floor(colors.length * Math.random());
      return `${colors[colorIndex]}${Math.floor(opacity * 255).toString(16)}`;
    },
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    fillShadowGradient: 'rgba(0, 123, 255, 0.4)',
    fillShadowGradientOpacity: 0.4,
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#007BFF',
    },
    yAxisLabel: 'Rates', // Add the label for the y-axis
  };
  function post() {
    console.log(findLocation);
    axios.get(api + findLocation).then(
      (res) => {
        console.log(res.data);
        setIncidentType(res.data.incident_types);
        setNumPerCrime(res.data.numper_per_incedences);
        setIsFound(res.data.success);
        if (res.data.success) {
          setShowRatesLabel(true); // Show the Rates label when the graph is displayed
        } else {
          setShowRatesLabel(false); // Hide the Rates label when there's no data
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  const data = {
    labels: incidentType,
    datasets: [
      {
        data: numPerCrime,
        colors: [(opacity = 1) =>'Orange',(opacity=1)=>'Red',(opacity=1)=>'Yellow',(opacity=1)=>'Pink',(opacity=1)=>'purple' 
       
      ]
    }
      ]
   
   
  };
  let displayGraph = (
    <View style={styles.graphContainer} >
      <BarChart
        data={data}
        width={screenWidth * 0.8}
        height={200}
        chartConfig={chartConfig}
        verticalLabelRotation={20}
        showBarTops={false}
        showValuesOnTopOfBars={false}
        yAxisSuffix=""
        withInnerLines={false}
        withCustomBarColorFromData
        flatColor
        fromZero

        animation
      />
    </View >
  );
  return (
    <SafeAreaView style={styles.root}>
       <View style={styles.container}>
       <View  style={styles.container2}>
       <View style={styles.headingContainer}>
        
     
        <Text style={styles.welcomeMessage}>{welcomeMessage}!</Text>
        </View>
        <View style={styles.ts}> 
       
        <TextInput
          style={styles.input}
          placeholder="Find HotSpot Location"
          onChangeText={(e) => setFindLocation(e)}
        />
        <TouchableOpacity style={styles.button} onPress={() => post()} >
          <Text style={styles.buttonText}>Find Location</Text>
          {showRatesLabel && (
            <View style={styles.yAxisLabelContainer}>
            </View>
          )}
        </TouchableOpacity>
        <View>
          {isFound === true && (
            <View style={styles.graphContainer}>
              {displayGraph}
              <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>
                Incident Types.
              </Text>
              <Text style={{ transform: 'rotate(-90deg) translateY(-100%)', transformOrigin: 'left top', fontWeight: 'bold',textAlign: 'center',marginTop:19,marginRight:18}}>
    Number Of Crimes
  </Text>
  
  
            </View>
          )}
          {isFound === false && (
            <Text style={styles.errorMessage}>
              THE LOCATION ENTERED IS NOT CONSIDERED A DANGER ZONE! NO CRIMES REPORTED
            </Text>
          )}
        </View>
        </View>
       </View>
       
     
  
    </View>
    <View style={styles.bar}>
    <HomeScreen  />
    </View>
 
    </SafeAreaView>
    
   
  );
}
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginTop:50,
    borderRadius:10,
    backgroundColor: Colors.gray,
    alignItems: 'center',
    height:550,
    marginTop:60,
    marginLeft:40,
    marginRight:40,
  },

  container2:{
    margin:10,
    marginBottom:80,
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

  root:{flex:1,
    backgroundColor:'#cae7d3',
    justifyContent:'center',
    alignItems:'center',
  },
  ts:{
   marginTop:150,
   alignItems:'center',
   justifyContent:'center',
   
  },
  locationText: {
    marginLeft: 10,
    marginBottom: 10,
  },
  graphContainer: {
    width: screenWidth * 0.8,
    height: screenHeight * 5,
   
    backgroundColor: 'gray',
    flex: 30,
    marginTop: 16,
    elevation: 5,
  },
  input: {
    width: 280,
    height: 40,
    borderWidth: 1,
    backgroundColor: 'lightgray',
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    alignContent:'center',
  },
  button: {
    backgroundColor:'black',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    alignItems:'center',
  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    //textAlign: 'left',
    //marginLeft: 2,
    marginRight: 300,
    marginTop: 50,
    marginBottom: 10,
   
  },
  headingContainer: {
    position: 'absolute',
    top: 0, // Place it at the top
    right: 0, // Place it at the right
    //margin: 10,
    marginTop :10, // Add margin for spacing
    fontSize: 24,
     fontWeight: 'bold',
    //   //textAlign: 'left',
  },
});