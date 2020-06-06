import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import AlbumDetail from './AlbumDetail';
import { getPhotoSet } from '../endpoints/Flickr'
import Loading from './Loading';
import Error from './Error';

const AlbumList = (props) => {

  const { userId } = props;

  const [photoset, setPhotoset] = useState(null);
  const [statusResponse, setStatusresponse] = useState(null);

  useEffect(() => {
    getPhotoSet(userId).then( ({status, response}) => {
      if(status) {
        setPhotoset(response);
        setStatusresponse("OK");
      }
      else {
        setStatusresponse("FAIL");
      }
    })
  }, [])
  
  const renderAlbumDetail = (album) => {
    return <AlbumDetail key={album.id} userId={userId} title={album.title._content} albumId={album.id}  />
  }

  if (!statusResponse && !photoset) { 
    return <Loading/>
  }
  else {
    if(statusResponse === "OK") {
      return (
        <View>
          <FlatList
            data={photoset}
            renderItem={({ item }) => renderAlbumDetail(item) }
            keyExtractor={item => item.id}
          />
        </View>);
    }
    else {
      return <Error />
    }
  }
}

export default AlbumList;
