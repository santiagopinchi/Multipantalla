import React, { useState } from 'react';
import axios from 'axios';
import { Text, View } from 'react-native';
import Button from './Button';
import Card from './Card';
import CardSection from './CardSection';
import { TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux';


// get info photo https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photo_id=49952493557&format=json&nojsoncallback=1



const Login = () => {
    const [userInput, setUserInput] = useState('')
    const [state, setState] = useState(1)
    const USER_NOT_FOUND = "User not found"
        //state = 1 user can log in
        //state = 2 wrong user
    const USER_PROFE = '137290658%40N08'
    const USER_TINCHO = '188681120@N04'
    
    async function tryLogin (user) {
       
            await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=${user}&format=json&nojsoncallback=1`)
                .then((response) => {
                        if(response.data.message === USER_NOT_FOUND){
                            setState(2)
                        }
                        else {
                            Actions.albumList({user})
                        }   
                    }
                )
                .catch(() => {
                    setState(2)})
    }

    const cleanState = () => {
        setUserInput('')
        setState(1)
    }

    if (state === 2) { 
			return (
                <View style={{ flex: 1 }}>
                    <Card>
                <CardSection>
                    <Text>
                        {'Error, wrong user'}
					</Text>
                </CardSection>
                <CardSection>
                    <Button onPress={() => cleanState()}>
                        Try again...
                    </Button>
                </CardSection>
            </Card>
					
                </View>
				);
    }
    if(state === 1) {
    return (
      <View style={{ flex: 1 }}>
          <Card>
                <CardSection>
                    <TextInput
                        value={userInput}
                        onChangeText={value => setUserInput(value)}
                        placeholder={'User Id'}
                        // style={styles.input}
                    />
                </CardSection>
                <CardSection>
                    <Button onPress={() => tryLogin(userInput)}>
                        Log in!
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={() => tryLogin(USER_PROFE)}>
                        Log as Profe
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={() => tryLogin(USER_TINCHO)}>
                        Log as Tincho
                    </Button>
                </CardSection>
            </Card>
      </View>
    );
    }
}

export default Login;