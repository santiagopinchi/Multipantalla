import React from 'react';
import { Card, Paragraph } from 'react-native-paper';

const CommentDetail = (props) => {

  const { authorName, content, date} = props;

  const toDate = seconds => {
    let date = new Date(null);
    date.setSeconds(seconds);
    return date.toDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <Card>
      <Card.Title title={ authorName } subtitle={ toDate(date) } />
      <Card.Content>
        <Paragraph>{ content }</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default CommentDetail;
