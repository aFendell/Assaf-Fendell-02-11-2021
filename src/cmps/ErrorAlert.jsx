import React from "react";
import PropTypes from 'prop-types';

export const ErrorAlert = ({ message }) => (
    <div className="error-alert">
        {message}
    </div>
)

ErrorAlert.propTypes = {
    message: PropTypes.string,
}

ErrorAlert.defaultProps = {
    message: 'An error accured',
}
