import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteEducation } from 'redux/profile';

const AddEducation = ({ education, deleteEducation }) => {
    const educations = education.map(({ _id, school, degree, from, to }) => (
        <tr key={_id}>
            <td>{school}</td>
            <td className="hide-sm">{degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{moment.utc(from)}</Moment> -{' '}
                {to === null ? ' Now' : <Moment format="YYYY/MM/DD">{moment.utc(to)}</Moment>}
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => deleteEducation(_id)}
                    type="button">
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </>
    );
};

AddEducation.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(AddEducation);
