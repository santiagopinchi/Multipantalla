import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';

const styles = {
    container: {
      flex: 1,
    },
    button: {
      margin: 6,
    },
};

const Login = () => {

    const USER_PROFE = "137290658%40N08";
    const OTHER_USER = "188681120@N04";

    const [userInput, setUserInput] = useState("");

    return (
        <ScrollView style={styles.container}>
            <TextInput label="User ID" value={userInput} onChangeText={value => setUserInput(value)} style={styles.button} />
            <Button mode="contained" style={styles.button} onPress={() => Actions.albumList({userId: userInput})}>LOG IN</Button>
            <Button mode="contained" style={styles.button} onPress={() => Actions.albumList({userId: USER_PROFE})}>LOG AS PROFE</Button>
            <Button mode="contained" style={styles.button} onPress={() => Actions.albumList({userId: OTHER_USER})}>LOG AS OTHER USER</Button>
        </ScrollView>
    );
};

export default Login;