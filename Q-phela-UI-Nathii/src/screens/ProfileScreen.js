// UserProfileScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import HomeScreen from './HomeScreen';
import { Dimensions } from 'react-native';
import { Colors  } from '../assets/Colors';
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

const ProfileScreen = () => {




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













  const [name, setName] = useState('John Doe');
  const [username, setUsername] = useState('johndoe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const saveChanges = () => {
    setIsEditing(false);
    setIsModalVisible(true);
    // You can implement code here to save the edited details to your backend or storage.
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const data = [
    { label: 'Name', value: name },
    { label: 'Username', value: username },
    { label: 'Email', value: email },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
      <View style={styles.container2}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <View style={styles.infoRow}>
            <Text style={styles.label}>{item.label}:</Text>
            {isEditing ? (
              <TextInput
                style={styles.editInput}
                value={item.value}
                onChangeText={(text) => {
                  if (item.label === 'Name') setName(text);
                  if (item.label === 'Username') setUsername(text);
                  if (item.label === 'Email') setEmail(text);
                }}
                placeholder={`Enter ${item.label}`}
                placeholderTextColor="grey"
              />
            ) : (
              <Text style={styles.value}>{item.value}</Text>
            )}
          </View>
        )}
      />
      </View>
      
     
    </View>
    <View style={styles.button}>
    {isEditing ? (
        <TouchableOpacity style={styles.editButton} onPress={saveChanges}>
          <Text style={styles.editButtonText}>Save Changes</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(true)}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Profile Updated</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.closeModalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    <View style={styles.bar}>
    <HomeScreen  />
    </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    //flex:1,
    margin:10,
    backgroundColor:Colors.gray,
    width: 300,
    height: 500,
    marginTop:90,
    borderRadius:15,
    
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
  
  container2:{
    flex:1,
    marginLeft:10,
    marginRight:10,
    marginBottom:180,
    marginTop:180,
  },

  root:{flex:1,
    backgroundColor:'#cae7d3',
    justifyContent:'center',
    alignItems:'center',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
  },
  label: {
    width: 100,  // Adjust the width according to your preference
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: 'gray',
  },
  editInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop:50,
    color: 'grey',
  },
  editButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
  },
  closeModalText: {
    color: 'blue',
    marginTop: 10,
  },
});

export default ProfileScreen;
