import React, { useState, useEffect } from 'react';
import { View, FlatList} from 'react-native';
import CommentDetail from './CommentDetail';
import { getComments } from '../endpoints/Flickr'
import Loading from './Loading';

const CommentList = (props) => {
  const { photoId } = props;

  const [comments, setComments] = useState(null)

  useEffect( () => {
      getComments(photoId).then(response => setComments(response));
  }, [] )

  const renderCommentDetail = (comment) => {
    return <CommentDetail  
              key={comment.id} 
              authorName={comment.authorname} 
              date={comment.datecreate}
              content={comment._content}
          />
  }
  
  if (!comments) { 
    return <Loading/>
  }
  else {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
                data={comments}
                renderItem={({ item }) => renderCommentDetail(item)
                }
                keyExtractor={item => item.id}
        />
      </View>);
  }
}

export default CommentList;