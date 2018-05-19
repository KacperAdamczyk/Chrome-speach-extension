/* @flow */
import React, {Component, Fragment} from 'react';

import './Editor.css';

type Props = {
    children?: any,
    onAdd: (page: string) => void,
    onEdit: (page: string) => void,
    onDelete: () => void,
    selected: ?string,
    children?: (setTransformer: (trans: [(value: string) => string, (value: string) => string]) => void) => any,
    placeholder?: string;
    filter?: RegExp
};

type State = {
    value: string,
    validTransformer: boolean
}

class Editor extends Component<Props, State> {
    componentDidUpdate(prevProps: Props, prevState: State, prevContext: any) {
        this.inputVal = this.props.selected;
        if (this.transformer && this.state.validTransformer && this.inputVal) {
            this.inputVal = this.transformer[1](this.inputVal);
        }
    }

    state = {
        value: '',
        validTransformer: false
    };

    transformer: ?[(value: string) => string, (value: string) => string] = null;
    inputRef = React.createRef();

    get inputVal(): string {
        return this.inputRef.current ? this.inputRef.current.value : '';
    }

    set inputVal(value: ?string) {
        if (this.inputRef.current && value !== null && value !== undefined)
            this.inputRef.current.value = value;
    }

    handleAdd = () => {
        this.props.onAdd(this.transformValue(this.inputVal));
        this.inputVal = '';
    };
    handleEdit = () => {
        this.props.onEdit(this.transformValue(this.inputVal));
        this.inputVal = '';
    };
    handleDelete = () => {
        this.props.onDelete();
        this.inputVal = '';
    };
    handleInputChange = ({target: {value}}: SyntheticInputEvent<EventTarget>) => {
        if (!this.props.filter) return;
        const filteredValue = value.match(this.props.filter);
        this.inputVal = filteredValue ? filteredValue.join('') : '';
    };
    transformValue(value: string) {
        if (this.transformer && this.state.validTransformer && value) {
            value = this.transformer[0](value);
        }
        return value;
    }

    setTransformer = (trans: [(value: string) => string, (value: string) => string]) => {
        this.transformer = trans;
        this.setState({validTransformer: this.isTransformerValid()});
    };

    isTransformerValid(): boolean {
        if (!this.transformer) return false;
        const [trans, trans_1] = this.transformer;
        return typeof trans === 'function' && typeof trans_1 === 'function';
    }

    render() {
        return (
            <div className='editor'>
                <input className='form-control' ref={this.inputRef} placeholder={this.props.placeholder} onChange={this.handleInputChange}/>
                {
                    typeof this.props.children === 'function' &&
                    <div className='editor__addition'>
                        {this.props.children(this.setTransformer)}
                    </div>
                }
                <div className='editor__action-buttons'>
                    <button className='btn btn-primary btn-sm' onClick={this.handleAdd}><i
                        className='material-icons'>add</i></button>
                    {
                        this.props.selected &&
                        <Fragment>
                            <button className='btn btn-primary btn-sm' onClick={this.handleEdit}><i
                                className='material-icons'>edit</i></button>
                            <button className='btn btn-danger btn-sm' onClick={this.handleDelete}><i
                                className='material-icons'>delete</i></button>
                        </Fragment>
                    }
                </div>
            </div>
        );
    }
}

export default Editor;