import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, SafeAreaView, Pressable, Text } from "react-native";
import { Colors } from "../assets/Colors";
import InputComponent from "../components/global/InputComponent";
import RoundedButton from "../components/global/RoundedButton";
import Image from "../components/login-screen/Image";
import { Formik } from "formik";
import { loginValidationSchema } from "../assets/constants/Schemas";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../assets/constants/ConstantData";

export default function LoginScreen() {
  const navigation = useNavigation();

  const loginFunction = values => {
    axios
    .post(`${BASE_URL}:3002/login/`, { email: values.username, password: values.password })
    .then((res) => {
      console.log(res.data.results[0].citizen_id)  
      console.log(res.data.results[0].citizen_name)  
      
      if(res.data.success){
        AsyncStorage.setItem('citizen_id', res.data.results[0].citizen_id.toString());
        AsyncStorage.setItem('citizen_name', res.data.results[0].citizen_name.toString())
        navigation.navigate('IncidentReportForm');
      }
    
    })
    .catch((er) => {
      console.log(er);
    });
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.viewStyle}>
        <View style={{ marginBottom: 41 }}>
          <Image />
        </View>
        <View style={[styles.viewStyle, { gap: 30 }]}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ username: "", password: "" }}
            onSubmit={(values) => 
              loginFunction(values)
            }
          >
            {({
              values,
              handleChange,
              isValid,
              errors,
              handleBlur,
              handleSubmit,
            }) => (
              <>
                <InputComponent
                  name="username"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  placeholder="Username"
                  mode="text"
                  errors={errors.username}
                />

                <InputComponent
                  name="password"
                  errors={errors.password}
                  placeholder="Password"
                  mode="text"
                  secure={true}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <RoundedButton
                  btnColor={Colors.black}
                  title="Login"
                  isDisabled={isValid}
                  onPressedFun={handleSubmit}
                />
              </>
            )}
          </Formik>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text
                  style={[
                    styles.text,
                    { color: Colors.blue, fontWeight: "bold" },
                  ]}
                >
                  Register
                </Text>
              </Pressable>
              <Text style={[styles.text]}> your account</Text>
            </View>
            <Pressable
              style={{ marginTop: 5 }}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text
                style={[
                  styles.text,
                  { color: Colors.blue, textAlign: "center" },
                ]}
              >
                forgot password
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray,
  },
  viewStyle: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
});
