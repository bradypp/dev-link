import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteExperience } from 'redux/profile';

const Experience = ({ experience, deleteExperience }) => {
    const experiences = experience.map(({ _id, company, title, to, from }) => (
        <tr key={_id}>
            <td>{company}</td>
            <td className="hide-sm">{title}</td>
            <td>
                <Moment format="DD/MM/YYYY">{moment.utc(from)}</Moment> -{' '}
                {to === null ? 'Now' : <Moment format="DD/MM/YYYY">{moment.utc(to)}</Moment>}
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => deleteExperience(_id)}
                    type="button">
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Time period</th>
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </>
    );
};

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
