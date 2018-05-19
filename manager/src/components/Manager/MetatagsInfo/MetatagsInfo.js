/* @flow */
import React from 'react';

import './MetatagInfo.css';

type Metatag = {
    tag: string,
    description: string
}

const metatags: Metatag[] = [
    {
        tag: '@value',
        description: 'Inserts text that comes after extended command'
    },
    {
        tag: '@numericValue',
        description: 'Inserts number that comes after extended command. If the text can\'t be parsed as number NaN will be inserted insted'
    }
];

function MetatagsInfo() {
    return (
        <div>
            <table className='metatags-table'>
                <thead>
                <tr>
                    <th>Tag</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {
                    metatags.map(mt =>
                    <tr key={mt.tag}><td className='metatags-table__tag'>{mt.tag}</td><td>{mt.description}</td></tr>)
                }
                </tbody>
            </table>
        </div>
    );
}

export default MetatagsInfo;