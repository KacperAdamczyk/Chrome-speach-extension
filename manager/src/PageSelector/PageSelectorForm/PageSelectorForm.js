/* @flow */
import React from 'react';
import {Field, reduxForm} from 'redux-form';
import type {State} from '../../store/store';
import {connect} from 'react-redux';

let PageSelectorForm = (props) => (
    <form onSubmit={props.handleSubmit}>
        <label htmlFor="newUrl">Add new</label>
        <Field name='newUrl' component='input' type='text'/>
    </form>
);

function mapStateToProps(state: State) {
    return {
        commands: state.commands
    };
}

PageSelectorForm = connect(mapStateToProps)(PageSelectorForm);

PageSelectorForm = reduxForm({
    form: 'pageSelector'
})(PageSelectorForm);

export default PageSelectorForm;