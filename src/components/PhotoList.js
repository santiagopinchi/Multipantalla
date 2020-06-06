import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';
import Button from './Button';
import Card from './Card';
import CardSection from './CardSection';
import { getPhotos } from '../endpoints/Flickr';
import Loading from './Loading';

const PhotoList = (props) => {
  const { albumId, user } = props
  const [photos, setPhotos] = useState(null)
  const [dates, setDates] = useState([])
  const [photosWithDate, setPhotosWithDates] = useState(null)
  const [ordered, setOrderer] = useState(false)
  const [orderBy, setOrderBy] = useState('NAME')
  const [asc, setAsc] = useState(false)
  //antiguo user: 137290658%40N08
  useEffect(() => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${albumId}&user_id=${user}&format=json&nojsoncallback=1`)
      .then(response => {
        setPhotos(response.data.photoset.photo)
      })
  }, [])

  useEffect(() => {
    if(photos){
      console.log(dates, 'DATES')
      console.log(photos.length === dates.length,'RESULT')
      if(photos.length === dates.length){
        let array = photos.map((item, index) => ({
          ...item, date: dates[index]
            })
          )
          console.log(array,'EL ARRAY')
          setPhotosWithDates(array)
        }
    }
  }, [photos, dates])

  const changeOrder = () => {
    if(!orderBy) return
    orderArrayBy(orderBy)
  }
  const orderArrayBy = orderType => {
    console.log(orderType, 'como se ordena')
    if(photosWithDate){
      console.log(photosWithDate,'phowd')
    if(orderType === 'DATE'){
      console.log(photosWithDate,'BOTON')
      setPhotosWithDates(photosWithDate.sort(function (a, b) {
        if (new Date(a.date) > new Date(b.date)) {
          console.log(a.date, 'es mayor que ', b.date)
          return !asc? 1 : -1;
        }
        if (new Date(a.date) < new Date(b.date)) {
          console.log(a.date, 'es menor que ', b.date)
          return !asc? -1 : 1;
        }
        // a must be equal to b
        console.log(a.date, 'es igual a ', b.date)
        return 0;
      })
      )
      setOrderer(true)
    }
    if(orderType === 'NAME'){
      console.log(photosWithDate,'BOTON N')
      setPhotosWithDates(photosWithDate.sort(function (a, b) {
        if (a.title > b.title) {
          console.log(a.title,' es mayor que ', b.title)
          return !asc? 1 : -1;
        }
        if (a.title < b.title) {
          console.log(a.title,' es menor que ', b.title)
          return !asc? -1 : 1;
        }
        console.log(a.title, 'es igual a ', b.title)
        // a must be equal to b
        return 0;
      })
      )
      setOrderer(true)
    }
  }
  }

  console.log(dates,'fuerex')
   const renderAlbums = (photo) => {
     return <PhotoDetail setDates={setDates} photoId={photo.id} key={photo.title} title={photo.title} imageUrl={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
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
    if (photos && !ordered) {
      return (
          <View style={{ flex: 1 }}>
            <Card>
              <CardSection>
                <Button onPress={() => {
                  setOrderBy('DATE')
                  orderArrayBy('DATE')
                  }}>
                  {'Order by Date'}
                </Button>
                <Button onPress={() => {
                  setOrderBy('NAME')
                  orderArrayBy('NAME')
                  }}>
                  Order by Name
                </Button>
                <Button onPress={() => {
                  console.log(orderBy, 'DEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEA')
                  changeOrder()
                  setAsc(!asc)
                  }}>
                    {asc? 'asc' : 'desc'}
                </Button>
              </CardSection>
            </Card>
            <FlatList
              data={photos}
              renderItem={({ item }) => renderAlbums(item)
                }
              keyExtractor={item => item.id}
            />
          </View>
        )
    }
    if(photosWithDate && ordered && dates){
      return (
          <View style={{ flex: 1 }}>
            <Card>
              <CardSection>
                <Button onPress={() => {
                  setOrderBy('DATE')
                  orderArrayBy('DATE')}
                }>
                  Order by Date
                </Button>
                <Button onPress={() => {
                  setOrderBy('NAME')
                  orderArrayBy('NAME')}
                }>
                  Order by Name
                </Button>
                <Button onPress={() => {
                  changeOrder()
                  setAsc(!asc)
                  }}>
                    {asc? 'asc' : 'desc'}
                </Button>
              </CardSection>
            </Card>
              <FlatList
                data={photosWithDate}
                renderItem={({ item }) => renderAlbums(item)
                  }
                keyExtractor={item => item.id}
              />
          </View>
        )
    }

}

export default PhotoList;
