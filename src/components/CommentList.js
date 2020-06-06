import React, { useState, useEffect } from 'react';
import { View, FlatList} from 'react-native';
import CommentDetail from './CommentDetail';
import { getComments } from '../endpoints/Flickr'
import Loading from './Loading';
import NotFound from './NotFoundError';

const CommentList = (props) => {
  const { photoId } = props;

  const [comments, setComments] = useState(null);
  const [statusResponse, setStatusresponse] = useState(null);

  useEffect(() => {
    getComments(photoId).then( ({status, response}) => {
      if(status) {
        setComments(response);
        setStatusresponse("OK");
      }
      else {
        setStatusresponse("FAIL")
      }
    })
  }, [])

  const renderCommentDetail = (comment) => {
    return <CommentDetail  
              key={comment.id} 
              authorName={comment.authorname} 
              date={comment.datecreate}
              content={comment._content}
          />
  }
  
  if (!statusResponse && !comments) { 
    return <Loading/>
  }
  else {
    if(statusResponse === "OK") {
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
    else {
      return <NotFound />
    }
    
  }
}

export default CommentList;