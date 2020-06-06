import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Update = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="50" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

export default Update;
