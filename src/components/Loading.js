import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator animating={true} size="large" />
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
 
export default Loading;
