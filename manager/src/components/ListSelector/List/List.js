/* @flow */
import React from 'react';

import './List.css';

type Props<T> = {
    items: ?T[],
    onSelect: (v: T) => void,
    selected: ?T,
    keyExtractor: (o: T) => string
};

function List<T>(props: Props<T>) {
    const selectedItemKey = props.selected ? props.keyExtractor(props.selected) : null;
    return (
        <ul className='list'>
            {props.items && props.items.map(item => {
                const key = props.keyExtractor(item);
                const className = `list__element ${props.selected && key === selectedItemKey ? 'list__element--selected' : ''}`;
                return (<li className={className} key={key} onClick={() => props.onSelect(item)}>{key}</li>);
            })}
        </ul>
    );
}

export default List;