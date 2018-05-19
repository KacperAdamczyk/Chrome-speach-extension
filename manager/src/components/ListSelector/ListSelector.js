/* @flow */
import React, {Component} from 'react';

import List from './List/List';

import './ListSelector.css';

type Props<T> = {
    itemList: ?T[],
    onSelect: (v: T) => void,
    selected: ?T,
    keyExtractor: (o: T) => string,
    children?: any
};

type State = {
    filter: string
}

class ListSelector<T> extends Component<Props<T>, State> {
    static defaultProps = {
        keyExtractor<T>(o: T): T {
            return o;
        }
    };

    state = {filter: ''};

    changeFilter = ({target: {value}}: SyntheticInputEvent<EventTarget>) => this.setState({filter: value.toLowerCase()});
    clearFilter = () => this.setState({filter: ''});

    itemsSelector(): ?T[] {
        return this.props.itemList && this.props.itemList.filter(item =>
            this.props.keyExtractor(item).toLowerCase().includes(this.state.filter) || item === this.props.selected);

    }

    render() {
        return (
            <div className='list-selector'>
                <div className='input-group list-selector__search'>
                    <input type="text" className='form-control' placeholder='filter' value={this.state.filter} onChange={this.changeFilter}/>
                    <div className='input-group-append'>
                        <button className='btn btn-secondary btn-sm' onClick={this.clearFilter}><i className='material-icons'>clear</i></button>
                    </div>
                </div>
                <List items={this.itemsSelector()} onSelect={this.props.onSelect}
                      selected={this.props.selected} keyExtractor={this.props.keyExtractor}/>
                {
                    this.props.children &&
                    <div className='list-selector__editor'>
                        {this.props.children}
                    </div>
                }
            </div>
        );
    }
}

export default ListSelector;