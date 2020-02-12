import React from 'react';

function Tweet(props) {
  return (
    <div>
        {props.tweet.text} - {props.tweet.createdAt}
    </div>
  );
}

export default Tweet;
