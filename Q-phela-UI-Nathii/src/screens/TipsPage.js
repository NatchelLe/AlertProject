import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/HomeScreen';
import { FontAwesome } from '@expo/vector-icons';
import RoundedButton from '../components/global/RoundedButton';
import { BASE_URL } from "../assets/constants/ConstantData";
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import io from 'socket.io-client';
import * as Notifications from 'expo-notifications';

//const API_BASE_URL = 'http://localhost:3006';

const serverURL = 'http://10.7.34.201:3002'; // Replace with your server's URL

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


const TipsPage = ({ citizen }) => {




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








  const [tipText, setTipText] = useState('');
  const [tips, setTips] = useState([]);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch safety tips when the component mounts
    fetchSafetyTips();
  }, []);

  //const welcomeMessage = `Welcome ${localStorage.getItem('citizen_name')}`;
  const welcomeMessage = `Welcome ${citizen?.name || ''}`;

  const fetchSafetyTips = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}:3006/safety_tip`);
      
      if (response.data) {
        // Sort the tips by date in descending order (newest first)
        const sortedTips = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTips(sortedTips);
      } else {
        setError('Error fetching safety tips: Empty response');
      }
    } catch (error) {
      setError(`Error fetching safety tips: ${error.message}`);
      console.error('Error fetching safety tips:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleAddTip = async () => {
    try {
      const citizen_id = await AsyncStorage.getItem('citizen_id');
  
      const tip = { tip_description: tipText, citizen_id: Number(citizen_id) };
  
      if (!tipText || !citizen_id) {
        setError('Tip text or citizen information is missing.');
        return;
      }
  
      setLoading(true);
      const response = await axios.post(`${BASE_URL}:3006/safety_tip`, tip, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Tip added successfully:', response.data);
      await fetchSafetyTips();
      setTipText('');
      setError(null);
    } catch (error) {
      setError('Error adding safety tip');
      console.error('Error adding safety tip:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleLike = (index) => {
    const updatedTips = [...tips];
    if (updatedTips[index].liked === true) {
      updatedTips[index].liked = null; // Remove the like
    } else {
      updatedTips[index].liked = true; // Set to like
    }
    setTips(updatedTips);
  };

  const handleDislike = (index) => {
    const updatedTips = [...tips];
    if (updatedTips[index].liked === false) {
      updatedTips[index].liked = null; // Remove the dislike
    } else {
      updatedTips[index].liked = false; // Set to dislike
    }
    setTips(updatedTips);
  };

  const renderLikeDislikeButtons = (index, liked) => {
    if (liked === true) {
      return (
        <View style={styles.thumbsContainer}>
          <TouchableOpacity onPress={() => handleLike(index)}>
            <FontAwesome name="thumbs-up" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      );
    } else if (liked === false) {
      return (
        <View style={styles.thumbsContainer}>
          <TouchableOpacity onPress={() => handleDislike(index)}>
            <FontAwesome name="thumbs-down" size={24} color="red" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.thumbsContainer}>
          <TouchableOpacity onPress={() => handleLike(index)}>
            <FontAwesome name="thumbs-up" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDislike(index)}>
            <FontAwesome name="thumbs-down" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString(); // Formats the date as per locale
  };

  return (
    <View style={styles.container}>
      {/* <Heading />  */}
      <Text style={styles.welcomeMessage}>{welcomeMessage}!</Text>

      <Text style={styles.listTitle} textAlign="center">
        Alert Community
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <FlatList
          data={tips}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View>
              <View style={styles.commentContainer}>
                <Text style={styles.tipAndUser}>
                  <Text style={[styles.username, { textAlign: 'center' }]}>
                    {item.citizen_name}:
                  </Text>{' '}
                  <Text style={styles.tip} textAlign="center">
                    {item.tip_description}
                  </Text>
                </Text>
                {/* <View style={styles.thumbsContainer}>
                  {renderLikeDislikeButtons(index, item.liked)}
                  <Text style={styles.likeDislikeCounts}>
                    Likes: {item.likes} Dislikes: {item.dislikes}
                  </Text>
                </View> */}
                <Text style={styles.date}>{formatDate(item.date)}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={[styles.emptyList, { textAlign: 'center' }]}>
              No tips yet
            </Text>
          )}
        />
      )}

      {error && (
        <Text style={[styles.errorText, { textAlign: 'center' }]}>{error}</Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your tip here"
          value={tipText}
          onChangeText={(text) => setTipText(text)}
          multiline
        />
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleAddTip} style={styles.pressableButton}>
            <Text style={[styles.buttonText, { color: 'white', textAlign: 'center' }]}>
              Add Tip
            </Text>
          </Pressable>
        </View>
         

      </View>
      <View style={styles.btn}>
      <HomeScreen/>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (previous styles)

  likeDislikeCounts: {
    fontSize: 14,
    color: '#777',
    marginLeft: 8,
  },

  btn:{
    marginTop:15,
  },




  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "gray",
    elevation: 12,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center", // Center-align the text
  },
  commentContainer: {
    backgroundColor: "#D9D9D9",
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: 'row',
    alignItems: "center",
    padding: 8,
    marginBottom: 8,
    justifyContent: 'space-between',
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tipAndUser: {
    flex: 1, // Allow the text to take up all available space
    alignItems: "center",
  },
  /*thumbsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
  },
  thumbsIcon: {
    marginBottom: 8, // Adjust the spacing between thumbs
  },*/
  username: {
    fontWeight: 'bold',
    marginRight: 8,
    textAlign: 'center',
  },
  tip: {
    fontSize: 16,
    textAlign: "center",
  },
  emptyList: {
    fontSize: 16,
    color: "#777",
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: 16,
   
  },
  input: {
    width: 363,
    height: 51,
    marginBottom: 8,
    backgroundColor: "#D9D9D9",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    //padding: 8,
   
    textAlign: "center",
  },
  buttonContainer: {
    width: 82,
    height: 28,
    backgroundColor: "black",
    alignSelf: "flex-end",
    borderRadius: 6,
  },
  date: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8, // Add margin at the bottom to create space for the date
    textAlign: 'right', // Align the date to the right
  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 16,
  },
 /*thumbsIcon: {
    marginRight: 8, // Adjust the spacing
  },*/
});

export default TipsPage;