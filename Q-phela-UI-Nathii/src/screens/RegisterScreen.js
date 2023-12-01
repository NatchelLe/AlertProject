import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../assets/Colors";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import LocationSvg from "../assets/svg/LocationSvg";
import InputComponent from "../components/global/InputComponent";
import RoundedButton from "../components/global/RoundedButton";
import { Formik } from "formik";
import { RegisterValidationSchema } from "../assets/constants/Schemas";
import axios from "axios";
import { BASE_URL } from "../assets/constants/ConstantData";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const registerFun = (values) => {

    const data = {
      citizen_name: values.username,
      email: values.email,
      password: values.password,
      contact_number: values.contactNumber
    };

    console.log(data)

    axios.post(`${BASE_URL}:3002/register`, data)
      .then((res) => {
        if(res.data.success){ 
          console.log('successfully registered')
          navigation.navigate('Login'); 
        } else {
          console.log('register failed')
        }
      })
      .catch((er) => {
        console.log(er);
      });

  }
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.svgtext}>
        <LocationSvg />
        <Text style={styles.headerText}>Register your account</Text>
      </View>
      <View style={styles.fields}>
        <Formik
          validationSchema={RegisterValidationSchema}
          initialValues={{ username: "", email: "", contactNumber: "", password: "", confirmPassword: "" }}
          onSubmit={(values) =>  

            registerFun(values)
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
                name="email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
                mode="email"
                errors={errors.email}
              />
              
              <InputComponent
                name="contactNumber"
                onChangeText={handleChange("contactNumber")}
                onBlur={handleBlur("contactNumber")}
                value={values.contactNumber}
                placeholder="Phone number"
                mode="numeric"
                errors={errors.contactNumber}
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
              <InputComponent
                name="confirmPassword"
                errors={errors.confirmPassword}
                placeholder="Confirm Password"
                mode="text"
                secure={true}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
              />
              <RoundedButton
                btnColor={Colors.black}
                title="Sign Up"
                isDisabled={isValid}
                onPressedFun={handleSubmit}
              />
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray,
  },
  svgtext: {
    gap: 31,
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
  },
  fields: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
});

export default RegisterScreen;