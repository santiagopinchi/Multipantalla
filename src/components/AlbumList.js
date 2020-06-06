import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import AlbumDetail from './AlbumDetail';
import { getPhotoSet } from '../endpoints/Flickr'
import Loading from './Loading';

const AlbumList = () => {
  const [photoset, setPhotoset] = useState(null)

  useEffect(() => {
    getPhotoSet("137290658%40N08").then(response => setPhotoset(response));
  }, [])

  
  const renderAlbumDetail = (album) => {
    return <AlbumDetail key={album.id} title={album.title._content}  albumId={album.id}  />
  }

  if (!photoset) { 
    return <Loading/>
  }
  else {
    return (
      <View>
        <FlatList
          data={photoset}
          renderItem={({ item }) => renderAlbumDetail(item) }
          keyExtractor={item => item.id}
        />
      </View>);
  }
}

export default AlbumList;
