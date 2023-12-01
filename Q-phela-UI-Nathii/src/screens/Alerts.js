//Alerts.js
import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
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

export default function Alerts() {



  const [expoPushToken, setExpoPushToken] = useState('');
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
     schedulePushNotification()
    });

    return () => {
      socket.off('proximityAlert');
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User Location: {userLocation ? `${userLocation.coords.latitude}, ${userLocation.coords.longitude}` : 'Loading...'}
      </Text>
      {inDangerZone &&    <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />}
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Warning!⚠️",
      body: 'You are in the danger zone. Watch out and stay safe!',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
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
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
