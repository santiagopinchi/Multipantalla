import React from 'react';
import { Linking } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';

const PhotoDetail = (props) => {
  const { title, imageUrl, photoId } = props;

  return (
    <Card>
      <Card.Title title={ title } />
      <Card.Cover source={{uri: imageUrl}}></Card.Cover>
      <Card.Actions>
        <Button onPress={ () => Linking.openURL(imageUrl)}>SEE IMAGE</Button>
        <Button onPress={() => Actions.commentList({photoId})}>SEE COMMENTS</Button>
      </Card.Actions>
    </Card>
  );
};

export default PhotoDetail;
