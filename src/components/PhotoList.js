import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import PhotoDetail from './PhotoDetail';
import { getPhotos } from '../endpoints/Flickr';
import Loading from './Loading';

const PhotoList = (props) => {

  const { albumId } = props
  const [photos, setPhotos] = useState(null)

  useEffect(() => {
    getPhotos("137290658%40N08", albumId).then(response => setPhotos(response));
  }, [])

  const renderPhoto = (photo) => {
    return <PhotoDetail photoId={photo.id} key={photo.title} imageUrl={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
  }
  console.log(photos);
  
  if (!photos) { 
    return <Loading/>
  }
  else {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={photos}
          renderItem={({ item }) => renderPhoto(item)}
          keyExtractor={item => item.id}
        />
      </View>);
  }
}

export default PhotoList;
