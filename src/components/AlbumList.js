import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

const AlbumList = () => {
  const [photoset, setPhotoset] = useState(null)

  useEffect(()=>{
    axios.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1')
      .then(response => setPhotoset(response.data.photosets.photoset))
  },[])

  const renderAlbums = () => {
    return photoset.map(album =>
      <AlbumDetail key={album.id} title={album.title._content}  albumId={album.id}  />
    );
  }

    console.log(photoset);

    if (!photoset) { 
			return (
					<Text>
            Loading...
					</Text>
				);
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {renderAlbums()}
        </ScrollView>
      </View>
    );
  }

export default AlbumList;
