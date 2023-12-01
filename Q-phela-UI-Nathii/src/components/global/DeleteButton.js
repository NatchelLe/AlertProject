import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../assets/Colors";

const DeleteButton = (props) => {
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
    borderRadius: 9,
    height: 33,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: "bold",
  },
});

export default DeleteButton;

