/* @flow */
import React from 'react';

import PageSelectorForm from './PageSelectorForm/PageSelectorForm';

function PageSelector() {
    let onSubmit = values => {
        console.log(values);
    };

    return (
        <PageSelectorForm onSubmit={onSubmit}/>
    );
}

export default PageSelector;