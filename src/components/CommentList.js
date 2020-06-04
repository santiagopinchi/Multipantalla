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

  useEffect( () => {
      getComments(photoId).then(response => setComments(response));
  }, [] )

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
    return<Loading/>
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