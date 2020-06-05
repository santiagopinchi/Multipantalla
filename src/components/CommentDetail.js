import React from 'react';
import { Text, View } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';

const CommentDetail = (props) => {
  const { key, authorName, content, imageUrl, photoId } = props;

  const {
    headerContentStyle,
    thumbnailContainerStyle,
    authorNameStyle,
    contentStyle,
  } = styles;
console.log('jajex')
  return (
    <Card>
      <CardSection>
        <View style={thumbnailContainerStyle}>
            <Text style={authorNameStyle}>{'Comentario De: ' +authorName}</Text>
            <View style={headerContentStyle}>
                <Text style={contentStyle}>{content}</Text>
            </View>
        </View>
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  authorNameStyle: {
    fontSize: 18
  },
  contentStyle: {
    fontSize: 14
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderColor: 'black',
    backgroundColor: 'grey'
  }
};

export default CommentDetail;
