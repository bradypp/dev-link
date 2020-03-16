import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Spinner, PostItem, PostForm } from 'components';
import { getPosts, selectIsPostsLoading, selectPostsArr } from 'redux/posts';

const Posts = ({ getPosts, posts, isPostsLoading }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    const renderPosts = () =>
        !isEmpty(posts) ? (
            posts.map(post => <PostItem key={uuidv4()} post={post} />)
        ) : (
            <h4>There are no posts...</h4>
        );

    return (
        <>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome to the community
            </p>
            <PostForm />
            {isPostsLoading ? (
                <Spinner />
            ) : (
                <>
                    <div className="posts">{renderPosts()}</div>
                </>
            )}
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
