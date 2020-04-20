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

// TODO: make possible/ add prompt to add to portfolio if it doesn't already exist and is current authenticated users profile
const ProfilePortfolio = ({ portfolio }) => {
    return (
        <ProfileCard heading="Portfolio">
            {portfolio.map(item => {
                const { title, description, repo, skills, demo, images } = item;
                return (
                    <div>
                        <h3>{title}</h3>
                        {description && <p>{description}</p>}
                        <div>
                            {repo && <a href={repo}>Repo</a>}
                            {demo && <a href={demo}>Repo</a>}
                        </div>
                    </div>
                );
            })}
        </ProfileCard>
    );
};

ProfilePortfolio.propTypes = propTypes;

export default connect(mapStateToProps)(ProfilePortfolio);
