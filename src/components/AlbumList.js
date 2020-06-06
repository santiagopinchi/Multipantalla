import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import { getPhotoSet } from '../endpoints/Flickr'
import Loading from './Loading';

const AlbumList = (props) => {
  const { user } = props
  const [photoset, setPhotoset] = useState(null)
  //antiguo user: 137290658%40N08

  useEffect(() => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=${user}&format=json&nojsoncallback=1`)
      .then(response => setPhotoset(response.data.photosets.photoset))
  }, [user])

  
  const renderAlbums = (album) => {
    return <AlbumDetail user={user} key={album.id} title={album.title._content}  albumId={album.id}  />
    
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
