import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { getInfo } from '../endpoints/Flickr';
import Error from './Error';
import Loading from './Loading';

const PhotoDetail = (props) => {

  const { title, imageUrl, photoId, setDates } = props;
  const [myDate, setMyDate] = useState(null);
  const [statusResponse, setStatusresponse] = useState(null);

  useEffect(() => {
    getInfo(photoId).then( ({status, response}) => {
      if(status) {
        setMyDate(new Date(response));
        setDates(prevDates => [...prevDates, new Date(response).toString().slice(4,25)]);
        setStatusresponse("OK");
      }
      else {
        setStatusresponse("FAIL")
      }
    })
  }, [])

  if(!statusResponse) {
    return <Loading />
  }

  if(statusResponse === "OK") {
    return (
      <Card>
        <Card.Title title={ title } subtitle={myDate? 'Date: '+myDate.toString().slice(4,25): ''}/>
        <Card.Cover source={{uri: imageUrl}}></Card.Cover>
        <Card.Actions>
          <Button onPress={ () => Linking.openURL(imageUrl)}>SEE IMAGE</Button>
          <Button onPress={() => Actions.commentList({photoId})}>SEE COMMENTS</Button>
        </Card.Actions>
      </Card>
    );
  }
  else {
    return <Error />
  }
};

export default PhotoDetail;
