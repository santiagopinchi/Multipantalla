import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

const AlbumList = () => {
  const [photoset, setPhotoset] = useState(null)

  useEffect(() => {
    axios.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1')
      .then(response => setPhotoset(response.data.photosets.photoset))
  }, [])

<<<<<<< HEAD
  const renderAlbums = (album) => {
    return <AlbumDetail key={album.id} title={album.title._content}  albumId={album.id}  />
    
=======
  const renderAlbums = () => {
    return photoset.map(album =>
      <AlbumDetail key={album.id} title={album.title._content} albumId={album.id} />
    );
>>>>>>> 419c0592f4ad9160d9c6bf667f416f8587400f0d
  }

  console.log(photoset);

  if (!photoset) {
    return (
<<<<<<< HEAD
      <View style={{ flex: 1 }}>
        <FlatList
          data={photoset}
          renderItem={({ item }) => renderAlbums(item) }
          keyExtractor={item => item.id}
        />
      </View>
=======
      <Text>
        Loading...
      </Text>
>>>>>>> 419c0592f4ad9160d9c6bf667f416f8587400f0d
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
