import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Spinner } from 'components/shared';
import { getGithubRepos, selectProfileRepos } from 'redux/profile';

const ProfileGithub = ({ githubUsername, getGithubRepos, profileRepos }) => {
    useEffect(() => {
        getGithubRepos(githubUsername);
    }, [getGithubRepos, githubUsername]);

    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">Github Repos</h2>
            {!profileRepos.length > 0 ? (
                <Spinner />
            ) : (
                profileRepos.map(repo => (
                    <div key={repo.id} className="repo bg-white p-1 my-1">
                        <div>
                            <h4>
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                    {repo.name}
                                </a>
                            </h4>
                            <p>{repo.description}</p>
                        </div>
                        <div>
                            <ul>
                                <li className="badge badge-primary">
                                    Stars: {repo.stargazers_count}
                                </li>
                                <li className="badge badge-dark">
                                    Watchers: {repo.watchers_count}
                                </li>
                                <li className="badge badge-light">Forks: {repo.forks_count}</li>
                            </ul>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    profileRepos: PropTypes.array.isRequired,
    githubUsername: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileRepos: selectProfileRepos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
