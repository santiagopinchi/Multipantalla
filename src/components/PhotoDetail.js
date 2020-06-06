import React, { useState, useEffect } from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

const PhotoDetail = ({ title, imageUrl, photoId, setDates }) => {
  const {
    thumbnailStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    imageStyle
  } = styles;
  const [myDate,setMyDate] = useState(null)

  
  useEffect(() => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photo_id=${photoId}&format=json&nojsoncallback=1`)
          .then(response => {
            setMyDate(new Date(response.data.photo.dates.posted*1000))
          setDates(prevDates => [...prevDates, new Date(response.data.photo.dates.posted*1000).toString().slice(4,25)])
        })
  }, [])

  return (
    <Card>
      <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image
            style={thumbnailStyle}
            source={{ uri: imageUrl }}
          />
        </View>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
          {myDate && console.log(myDate.toString().slice(4,25))}
          {myDate && <Text style={headerTextStyle}>{'Date: '+myDate.toString().slice(4,25)}</Text>}
        </View>
      </CardSection>

      <CardSection>
        <Image
          style={imageStyle}
          source={{ uri: imageUrl }}
        />
      </CardSection>

      <CardSection>
        <Button onPress={() => Linking.openURL(imageUrl)}>
          See Now!
        </Button>
        <Button onPress={() => Actions.commentList({photoId, imageUrl })}>
          See All Comments
        </Button>
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

export default PhotoDetail;
