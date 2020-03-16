import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import isEmpty from 'lodash.isempty';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addLike, removeLike, deletePost } from 'redux/posts';
import { selectIsAuthLoading, selectUserData } from 'redux/auth';

const PostItem = ({
    addLike,
    removeLike,
    deletePost,
    isAuthLoading,
    userData,
    post,
    showActions,
}) => {
    const { _id, text, name, avatar, user, likes, comments, date } = post;
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img className="round-img" src={avatar} alt="" />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{text}</p>
                <p className="post-date">
                    Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
                </p>

                {showActions && (
                    <>
                        <button
                            onClick={() => addLike(_id)}
                            type="button"
                            className="btn btn-light">
                            <i className="fas fa-thumbs-up" />{' '}
                            <span>{!isEmpty(likes) && likes.length}</span>
                        </button>
                        <button
                            onClick={() => removeLike(_id)}
                            type="button"
                            className="btn btn-light">
                            <i className="fas fa-thumbs-down" />
                        </button>
                        <Link to={`/posts/${_id}`} className="btn btn-primary">
                            Discussion{' '}
                            {!isEmpty(comments) && (
                                <span className="comment-count">{comments.length}</span>
                            )}
                        </Link>
                        {!isAuthLoading && user === userData._id && (
                            <button
                                onClick={() => deletePost(_id)}
                                type="button"
                                className="btn btn-danger">
                                <i className="fas fa-times" />
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

PostItem.defaultProps = {
    showActions: true,
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    isAuthLoading: PropTypes.bool.isRequired,
    userData: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    showActions: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    isAuthLoading: selectIsAuthLoading,
    userData: selectUserData,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);
