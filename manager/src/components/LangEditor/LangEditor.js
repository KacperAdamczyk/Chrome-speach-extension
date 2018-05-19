/* @flow */
import React, {Component, Fragment} from 'react';

import './LangEditor.css';

type Props = {
    onAdd: (lang: string) => void,
    onEdit: (lang: string) => void,
    onDelete: () => void,
    selected: ?string
}

type State = {
    value: ?string
}

class LangEditor extends Component<Props, State> {
    langs: string[] = ['', 'pl-PL', 'en-US', 'es-ES'];

    state = {value: null};

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        const newValue = nextProps.selected;
        const oldValue = prevState.value;
        return newValue === oldValue ? null : {value: nextProps.selected};
    }

    handleAdd = () => this.state.value && this.props.onAdd(this.state.value);
    handleEdit = () => this.state.value && this.props.onEdit(this.state.value);
    handleDelete = () => this.props.onDelete();

    handleSelectChange = ({target: {value}}: SyntheticInputEvent<EventTarget>) => this.setState({value});

    render() {
        return (
            <div>
                <select className='form-control'
                        value={this.state.value === null ? '' : this.state.value} onChange={this.handleSelectChange}>
                    {this.langs.map(l => <option value={l} key={l}>{l}</option>)}
                </select>
                <div className='lang-editor__action-buttons'>
                    <button className='btn btn-primary btn-sm' onClick={this.handleAdd}><i className='material-icons'>add</i></button>
                    {
                        this.props.selected &&
                        <Fragment>
                            <button className='btn btn-primary btn-sm' onClick={this.handleEdit}><i className='material-icons'>edit</i></button>
                            <button className='btn btn-danger btn-sm' onClick={this.handleDelete}><i className='material-icons'>delete</i></button>
                        </Fragment>
                    }
                </div>
            </div>
        );
    }
}

export default LangEditor;