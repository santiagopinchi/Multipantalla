import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Card, Title, Button} from 'react-native-paper';

const AlbumDetail = (props) => {

  const { title, albumId } = props;

  return (
    <Card>
      <Card.Content>
        <Title>{ title }</Title>
      </Card.Content>
      <Card.Actions>
        <Button onPress={ () => Actions.photoList({albumId})}>SEE NOW</Button>
      </Card.Actions>
    </Card>
  );
};

export default AlbumDetail;
