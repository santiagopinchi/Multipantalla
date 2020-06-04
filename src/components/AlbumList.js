import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import { getPhotoSet } from '../endpoints/Flickr'
import Loading from './Loading';

const AlbumList = () => {
  const [photoset, setPhotoset] = useState(null)

  useEffect(() => {
    // La carga del ID de usuario deberia ser dinamica
    getPhotoSet("137290658%40N08").then(response => setPhotoset(response));
  }, [])

  
  const renderAlbums = (album) => {
    return <AlbumDetail key={album.id} title={album.title._content}  albumId={album.id}  />
  }

  if (!photoset) { 
    return <Loading/>
  }
  else {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={photoset}
          renderItem={({ item }) => renderAlbums(item) }
          keyExtractor={item => item.id}
        />
      </View>);
  }
}

export default AlbumList;
