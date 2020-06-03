import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';

const PhotoList = (props) => {
  const { albumId } = props
  const [photos, setPhotos] = useState(null)

  useEffect(() => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${albumId}&user_id=137290658%40N08&format=json&nojsoncallback=1`)
      .then(response => setPhotos(response.data.photoset.photo))
  }, [])

   const renderAlbums = (photo) => {
     return <PhotoDetail photoId={photo.id} key={photo.title} title={photo.title} imageUrl={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
   }
    console.log(photos);
  
    if (!photos) { 
			return (
        <View style={{ flex: 1 }}>
					<Text>
            {'loading'}
					</Text>
        </View>
				);
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={photos}
          renderItem={({ item }) => renderAlbums(item)}
          keyExtractor={item => item.id}
        />
      </View>
    )
}

export default PhotoList;
