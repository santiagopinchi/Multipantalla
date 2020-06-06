import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Card, Button, Avatar} from 'react-native-paper';

const AlbumDetail = (props) => {

  const { userId, title, albumId } = props;

  const leftContent = props => {
    return (<Avatar.Icon {...props} icon="folder" />);
  } 

  return (
    <Card>
      <Card.Title title={ title } left={ leftContent }/>
      <Card.Actions>
        <Button onPress={ () => Actions.photoList({userId, albumId})}>SEE NOW</Button>
      </Card.Actions>
    </Card>
  );
};

export default AlbumDetail;
