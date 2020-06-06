import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';

const CommentDetail = (props) => {
  const { authorName, content} = props;

  return (
    <Card>
      <Card.Content>
        <Title>{ authorName }</Title>
        <Paragraph>{ content }</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default CommentDetail;
