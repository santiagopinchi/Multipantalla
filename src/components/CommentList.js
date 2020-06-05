import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Linking } from 'react-native';
import axios from 'axios';
import CommentDetail from './CommentDetail';
import Button from './Button';
import Card from './Card';
import CardSection from './CardSection';
import { getComments } from '../endpoints/Flickr'
import Loading from './Loading';

const CommentList = (props) => {
  const { photoId, imageUrl } = props;

  const [comments, setComments] = useState(null)

<<<<<<< HEAD
  useEffect(()=>{
    axios.get(` https://www.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photo_id=${photoId}&format=json&nojsoncallback=1`)
      .then(response => {
          console.log(response.data.comments.comment,'response')
          setComments(response.data.comments.comment)
      })
      .catch(error => console.log(error,'error'))
  },[])
=======
  useEffect( () => {
      getComments(photoId).then(response => setComments(response));
  }, [] )
>>>>>>> 195e855ad511ef32da510bc9a339ed263693755f

  const renderComments = (comment) => {
    return <CommentDetail  
              photoId={photoId}
              imageUrl={imageUrl} 
              key={comment.id} 
              authorName={comment.authorname} 
              content={comment._content}
          />
  }
  
  if (!comments) { 
    return <Loading/>
  }
  else {
    return (
      <View style={{ flex: 1 }}>
          <Card>
              <CardSection>
                  <FlatList
                          data={comments}
                          renderItem={({ item }) => renderComments(item)
                          }
                          keyExtractor={item => item.id}
                  />
              </CardSection>
              
              <CardSection>
                  <Button onPress={() => Linking.openURL(imageUrl)}>
                      See in Browser!
                  </Button>
              </CardSection>
          </Card>
      </View>);
  }
}

export default CommentList;