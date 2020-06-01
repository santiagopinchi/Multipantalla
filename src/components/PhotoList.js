import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';

const PhotoList = (props) => {
  const { albumId } = props
  const [photos, setPhotos] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${albumId}&user_id=137290658%40N08&format=json&nojsoncallback=1`)
      .then(response => setPhotos(response.data.photoset.photo))
  }, [])

  const clickD = () => {
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photo_id=49952493557&format=json&nojsoncallback=1`)
       .then(response => 
        setData(response.data.comments.comment[0]._content)
        )
  }
<<<<<<< HEAD
   const renderAlbums = (photo) => {
     return <PhotoDetail photoId={photo.id} clickD={clickD} key={photo.title} title={photo.title} imageUrl={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
   }
    console.log(photos);
  
=======
  console.log(photos);

>>>>>>> 419c0592f4ad9160d9c6bf667f416f8587400f0d

  if (!photos) {
    return (
<<<<<<< HEAD
        <View style={{ flex: 1 }}>
            <FlatList
              data={photos}
              renderItem={({ item }) => renderAlbums(item)
              //<PhotoDetail key={item.title} title={item.title} imageUrl={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`} />
             }
              keyExtractor={item => item.id}
            />
            {data? <Text>
                        {data}
					</Text>: null}
        </View>
=======
      <View style={{ flex: 1 }}>
        <Text>
          Loading...
					</Text>
      </View>
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

export default PhotoList;
