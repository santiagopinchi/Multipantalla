import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';
import { getPhotos } from '../endpoints/Flickr';

const PhotoList = (props) => {
  const { albumId } = props
  const [photos, setPhotos] = useState(null)

  useEffect(() => {
    getPhotos("137290658%40N08", albumId).then(response => setPhotos(response));
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
              renderItem={({ item }) => renderAlbums(item)
             }
              keyExtractor={item => item.id}
            />
        </View>
    )


}

export default PhotoList;
