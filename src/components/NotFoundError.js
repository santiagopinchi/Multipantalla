import React from 'react';
import { Text, View, Image} from 'react-native';

const NotFound = () => {
    return ( 
        <View style={{ flex: 1 }}>
			<Text>
                {'ERROR AL CARGAR DATOS'}
			</Text>
            <Image 
                source={ require('../images/error.png') }
            />
        </View>
     );
}
 
export default NotFound;