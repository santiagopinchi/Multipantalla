import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const NotFound = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{
            resizeMode: "cover"
          }}
          source={require('../images/error.png')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      height: "100%",
      textAlign: "center"
    }
  });
 
export default NotFound;