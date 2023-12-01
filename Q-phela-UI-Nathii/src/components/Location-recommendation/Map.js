import React, { useState, useEffect, Component, useRef } from "react";
import { View, StyleSheet, Text, PermissionsAndroid } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

const MapComponent = () => { 
  const [startOrigin, setStartOrigin] = useState({
    title: 'Origin',
    lat: -25.754182,
    lon: 28.072604,
    desc: 'User location'
  })
  const [destination, setDestination] = useState({ 
    title: 'Destination',
    lat: -25.749258,
    lon: 28.087089,
    desc: 'User destination'
  })
const [clusteringEnabled, setClusteringEnabled] = useState(false);
const mapRef = useRef < MapView | null > (null);

useEffect(() => {
    if (!startOrigin || destination.lat == 0) return;

    var i = setInterval(() => {
      console.log("i Before", i);

      mapRef?.current?.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: {
          top: 100,
          right: 100,
          left: 100,
          bottom: 100,
          aimated: true,
        },
      });
      clearInterval(i);
      console.log("i After clear interval", i);
    }, 50);
  }, [startOrigin, destination]);  

  onLayout = () => { setTimeout( () => { this.map?.fitToCoordinates([{ latitude: 33.9260206, longitude: 75.0173499 }, { latitude: 33.949817, longitude: 74.985655 }], { edgePadding: DEFAULT_PADDING, animated: true, }); }, 2000 );    }

  return (
    <View style={styles.root}>
      <MapView
       mapRef={(ref) => (mapRef.current = ref)} 
      clusteringEnabled={clusteringEnabled}
      onLayout={this.onLayout}
      onMapReady={() => {
            mapRef.current?.fitToSuppliedMarkers(['origin', 'destination']);
            setClusteringEnabled(true);
      }} 
        style={{ flex: 1 }}
        mapType="mutedStandard"
        initialRegion={{
          latitude: startOrigin.lat,
          longitude: startOrigin.lon,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
          
          <Marker
            coordinate={{
              latitude: startOrigin.lat,
              longitude: startOrigin.lon,
            }}
            title={startOrigin.title}
            description={startOrigin.desc}
            identifier="origin"
          />
          <Marker
            coordinate={{
              latitude: destination.lat,
              longitude: destination.lon,
            }}
            title={destination.title}
            description={destination.desc}
            identifier="destination"
          />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "75%",
  },
});

export default MapComponent;
