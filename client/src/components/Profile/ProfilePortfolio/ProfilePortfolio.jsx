import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProfileCard } from 'components';
import { selectProfilePortfolio } from 'redux/profiles';

const propTypes = {
    portfolio: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    portfolio: selectProfilePortfolio,
});

// TODO: make possible/ add prompt to add bio if it doesn't already exist and is current authenticated users profile
// TODO: conditionally render component if viewed by other users & component is empty?
// TODO: add loader/don't render anything while loading
const ProfilePortfolio = ({ portfolio }) => {
    return (
        <ProfileCard heading="Portfolio">
            {portfolio.map(item => {
                return (
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p>{item.repo}</p>
                        <p>{item.demo}</p>
                    </div>
                );
            })}
        </ProfileCard>
    );
};

ProfilePortfolio.propTypes = propTypes;

export default connect(mapStateToProps)(ProfilePortfolio);
