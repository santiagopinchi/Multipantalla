import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import { getPhotoSet } from '../endpoints/Flickr'

const AlbumList = () => {
  const [photoset, setPhotoset] = useState(null)

  useEffect(() => {
    // La carga del ID de usuario deberia ser dinamica
    getPhotoSet("137290658%40N08").then(response => setPhotoset(response));
  }, [])

  
  const renderAlbums = (album) => {
    return <AlbumDetail key={album.id} title={album.title._content}  albumId={album.id}  />
    
  }

  console.log(photoset);

    if (!photoset) { 
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
          data={photoset}
          renderItem={({ item }) => renderAlbums(item) }
          keyExtractor={item => item.id}
        />
      </View>
    );
}

export default AlbumList;
