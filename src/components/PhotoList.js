import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import PhotoDetail from './PhotoDetail';
import { getPhotos } from '../endpoints/Flickr';
import Loading from './Loading';
import { Card, Actions, Button } from 'react-native-paper';
import NotFound from './NotFoundError';

const PhotoList = (props) => {

  const { userId, albumId } = props
  const [photos, setPhotos] = useState(null)

  const [dates, setDates] = useState([])
  const [photosWithDate, setPhotosWithDates] = useState(null)
  const [ordered, setOrderer] = useState(false)
  const [orderBy, setOrderBy] = useState('NAME')
  const [asc, setAsc] = useState(false)

  const [statusResponse, setStatusresponse] = useState(null);

  useEffect(() => {
    getPhotos(userId, albumId).then( ({status, response}) => {
      if(status) {
        setPhotos(response);
        setStatusresponse("OK");
      }
      else {
        setStatusresponse("FAIL")
      }
    })
  }, []);

  useEffect(() => {
    if (photos) {
      if (photos.length === dates.length) {
        let array = photos.map((item, index) => ({
          ...item, date: dates[index]
        })
        )
        setPhotosWithDates(array)
      }
    }
  }, [photos, dates])

  const changeOrder = () => {
    if (!orderBy) return
    orderArrayBy(orderBy)
  }

  const orderArrayBy = orderType => {
    if (photosWithDate) {
      if (orderType === 'DATE') {
        setPhotosWithDates(photosWithDate.sort(function (a, b) {
          if (new Date(a.date) > new Date(b.date)) {
            return !asc ? 1 : -1;
          }
          if (new Date(a.date) < new Date(b.date)) {
            return !asc ? -1 : 1;
          }
          return 0;
        })
        )
        setOrderer(true)
      }
      if (orderType === 'NAME') {
        setPhotosWithDates(photosWithDate.sort(function (a, b) {
          if (a.title > b.title) {
            return !asc ? 1 : -1;
          }
          if (a.title < b.title) {
            return !asc ? -1 : 1;
          }
          return 0;
        })
        )
        setOrderer(true)
      }
    }
  }

  const renderPhoto = (photo) => {
    return <PhotoDetail photoId={photo.id} key={photo.title} title={photo.title} imageUrl={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} setDates={setDates} />
  }

  if (!statusResponse && !photos) {
    return <Loading />
  }
  else {
    if(statusResponse === "OK") {
      if (photos && !ordered) {
        return (
          <View style={{ flex: 1 }}>
            <Card>
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
                  changeOrder()
                  setAsc(!asc)
                }}>
                  {asc ? 'asc' : 'desc'}
                </Button>
            </Card>
            <FlatList
              data={photos}
              renderItem={({ item }) => renderPhoto(item)
              }
              keyExtractor={item => item.id}
            />
          </View>
        )
      }
      if (photosWithDate && ordered && dates) {
        return (
          <View style={{ flex: 1 }}>
            <Card>
                <Button onPress={() => {
                  setOrderBy('DATE')
                  orderArrayBy('DATE')
                }
                }>
                  Order by Date
                  </Button>
                <Button onPress={() => {
                  setOrderBy('NAME')
                  orderArrayBy('NAME')
                }
                }>
                  Order by Name
                  </Button>
                <Button onPress={() => {
                  changeOrder()
                  setAsc(!asc)
                }}>
                  {asc ? 'asc' : 'desc'}
                </Button>
            </Card>
            <FlatList
              data={photosWithDate}
              renderItem={({ item }) => renderPhoto(item)
              }
              keyExtractor={item => item.id}
            />
          </View>
        )
      }
    }
    else {
      return <NotFound />
    }
  }
}

export default PhotoList;
