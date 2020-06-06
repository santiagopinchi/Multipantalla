import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from 'react-native-paper';

const Error = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{
            resizeMode: "contain",
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
 
export default Error;