import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Spinner, PostItem, PostForm } from 'components';
import { getPosts, selectIsPostsLoading, selectPostsArr } from 'redux/posts';

const Posts = ({ getPosts, posts, isPostsLoading }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return isPostsLoading ? (
        <Spinner />
    ) : (
        <>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome to the community
            </p>
            <PostForm />
            <div className="posts">
                {posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </>
    );
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    isPostsLoading: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    posts: selectPostsArr,
    isPostsLoading: selectIsPostsLoading,
});

export default connect(mapStateToProps, { getPosts })(Posts);