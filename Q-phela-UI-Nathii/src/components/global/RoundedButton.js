import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../assets/Colors";

const RoundedButton = (props) => {
  const { isValid, btnColor, title, onPressedFun } = props;
  return (
    <Pressable
      disabled={isValid}
      style={[styles.button, { backgroundColor: `${btnColor}` }]}
      onPress={onPressedFun}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'black',
    fontWeight: 450,
    paddingHorizontal: 40,
    paddingVertical: 5,
  },
  text: {
    fontSize: 21,
    color: Colors.white,
    fontWeight: "bold",
  },
});

export default RoundedButton;
