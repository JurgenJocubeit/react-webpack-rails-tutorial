import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Alert from 'react-bootstrap/lib/Alert';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import Comment from './Comment';

const CommentList = React.createClass({
  displayName: 'CommentList',

  propTypes: {
    $$comments: PropTypes.instanceOf(Immutable.List).isRequired,
    error: PropTypes.any,
  },

  errorWarning() {
    // If there is no error, there is nothing to add to the DOM
    if (!this.props.error) return undefined;
    return (
      <Alert bsStyle="danger" key="commentFetchError">
        <strong>Comments could not be retrieved.</strong>
        A server error prevented loading comments. Please try again.
      </Alert>
    );
  },

  render() {
    const { $$comments } = this.props;
    const commentNodes = $$comments.reverse().map(($$comment, index) => {
      // `key` is a React-specific concept and is not mandatory for the
      // purpose of this tutorial. if you're curious, see more here:
      // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
      return (
        <Comment
          key={index}
          author={$$comment.get('author')}
          text={$$comment.get('text')}
        />
      );
    });

    return (
      <div>
        <ReactCSSTransitionGroup transitionName="element">
          {this.errorWarning()}
        </ReactCSSTransitionGroup>
        <div className="commentList">
          {commentNodes}
        </div>
      </div>
    );
  },
});

export default CommentList;
