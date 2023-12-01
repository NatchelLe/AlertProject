import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';

const root = () => {
    return(
        <View  style={styles.root}>

        </View>
    );

};

const styles = StyleSheet.create({

    root:{flex:1,
        backgroundColor:"#cae7d3",
        justifyContent:'center',
        alignItems:'center',
      },
})

export default root