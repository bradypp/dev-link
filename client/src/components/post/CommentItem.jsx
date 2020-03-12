import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { createStructuredSelector } from 'reselect';
import { deleteComment } from 'redux/posts';
import { selectIsAuthLoading, selectUserData } from 'redux/auth';

const CommentItem = ({ postId, comment, isAuthLoading, userData, deleteComment }) => {
    const { _id, text, name, avatar, user, date } = comment;
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
                    Posted on <Moment format="DD/MM/YYY">{date}</Moment>
                </p>
                {!isAuthLoading && user === userData._id && (
                    <button
                        onClick={() => deleteComment(postId, _id)}
                        type="button"
                        className="btn btn-danger">
                        <i className="fas fa-times" />
                    </button>
                )}
            </div>
        </div>
    );
};

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    isAuthLoading: PropTypes.bool.isRequired,
    userData: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    isAuthLoading: selectIsAuthLoading,
    userData: selectUserData,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
