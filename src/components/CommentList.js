import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Linking } from 'react-native';
import axios from 'axios';
import CommentDetail from './CommentDetail';
import Button from './Button';
import Card from './Card';
import CardSection from './CardSection';

const CommentList = (props) => {
  const { photoId, imageUrl } = props
  const [comments, setComments] = useState(null)

  useEffect(()=>{
    axios.get(` https://www.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photo_id=${photoId}&format=json&nojsoncallback=1`)
      .then(response => setComments(response.data.comments.comment))
  },[])

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
			return (
                <View style={{ flex: 1 }}>
					<Text>
                        {'loading'}
					</Text>
                </View>
				);
    }

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
        </View>
    );
  }

export default CommentList;