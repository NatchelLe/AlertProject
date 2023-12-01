import React from "react";
import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/RegisterScreen";
import LandingScreen from "../screens/LandingScreen";
import ForgotPassword from "../screens/ForgotPassword";
import IncidentReportForm from "../screens/IncidentReportForm"; 
import TipsPage from "../screens/TipsPage"; 
// import MyMap from "../screens/MyMap";
// import "leaflet/dist/leaflet.css";
// import CustomerBarChart from "../screens/CustomerBarChart";
import AdminReport from "../AdminScreen/AdminReport";
import AdminTips from "../AdminScreen/AdminTips";
// import LocationSearchBar from "../screens/LocationSearchBar";
 import Graph from "../screens/Graph";
 import CitizenReport from "../screens/CitizenReport";
 import HomeScreen from "../screens/HomeScreen";
//  import Header from "../screens/header";
//import { UserProfile } from "../screens/UserProfile";
import ProfileScreen from "../screens/ProfileScreen";
// import ProfileImage from "../screens/ProfileImage";
import Chatbot from "../screens/Chatbot";
import Alerts from "../screens/Alerts";

const Stack = createNativeStackNavigator();

const StartNavigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
         initialRouteName="Graph"
         screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} /> 
         <Stack.Screen name="Graph" component={Graph} /> 
         
         <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Landing" component={LandingScreen} /> 
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="IncidentReportForm" component={IncidentReportForm} /> 
       <Stack.Screen name="TipsPage" component={TipsPage} />
       <Stack.Screen name="AdminReport" component={AdminReport} />
       {/* <Stack.Screen name="LocationSearchBar" component={LocationSearchBar} /> */}
       {/* <Stack.Screen name="MyMap" component={MyMap} /> */}
       {/* <Stack.Screen name="CustomerBarChart" component={CustomerBarChart} /> */}
       <Stack.Screen name="CitizenReport" component={CitizenReport} />
       <Stack.Screen name="AdminTips" component={AdminTips} />
       <Stack.Screen name="Alerts" component={Alerts} />
       <Stack.Screen name="HomeScreen" component={HomeScreen} />
       <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
       {/* <Stack.Screen name="ProfileImage" component={ProfileImage} /> */}
       <Stack.Screen name="Chatbot" component={Chatbot} />
       {/* <Stack.Screen name="Header" component={Header} /> */}
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StartNavigations;
