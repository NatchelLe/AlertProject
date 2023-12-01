import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import BackSvg from "../../assets/svg/BackSvg";
import SearchBar from "./SearchBar";

const TopBar = ( props ) => {
  const [clicked, setClicked] = useState(false);
  const { searchPhrase, setSearchPhrase } = props

  return (
    <>
      <View style={styles.headerRoot}>
        <BackSvg />  
        <TouchableWithoutFeedback onPress={() => console.log('search')}>
          <SearchBar clicked={clicked} searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} setClicked={setClicked} />
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerRoot: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default TopBar;

