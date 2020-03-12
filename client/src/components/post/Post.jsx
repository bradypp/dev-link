import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import { createStructuredSelector } from 'reselect';
import { Spinner, PostItem, CommentForm, CommentItem } from 'components';
import { getPost, selectPost, selectIsPostsLoading } from 'redux/posts';

const Post = ({ getPost, post, isPostsLoading }) => {
    const params = useParams();

    useEffect(() => {
        getPost(params.id);
    }, [getPost, params.id]);

    return isPostsLoading || isEmpty(post) ? (
        <Spinner />
    ) : (
        <>
            <Link to="/posts" className="btn">
                Back To Posts
            </Link>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className="comments">
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </div>
        </>
    );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    isPostsLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    post: selectPost,
    isPostsLoading: selectIsPostsLoading,
});

export default connect(mapStateToProps, { getPost })(Post);
