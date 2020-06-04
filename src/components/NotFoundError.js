import React from 'react';
import { View, Image, StyleSheet} from 'react-native';

const NotFound = () => {
    return ( 
        <View style={[ styles.container ]}>			
            <Image 
                source={ require('../images/error.png') }
            />
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    }
});
 
export default NotFound;