/* @flow */
import React, {Component} from 'react';

import './CommandExtender.css';

type Props = {
    setTransformer: (trans: [(value: string) => string, (value: string) => string]) => void
}

type State = {
    checked: boolean
}

class CommandExtender extends Component<Props, State> {
    state = {checked: false};
    extendSign = ' *';

    componentDidMount() {
        this.props.setTransformer([this.transform, this.transform_1]);
    }

    transform = (value: string) => this.state.checked ? value.concat(this.extendSign) : value;
    transform_1 = (value: string) => {
        const isExtended = value.endsWith(this.extendSign);
        this.setState({checked: isExtended});
        return isExtended ? value.slice(0, -this.extendSign.length) : value;
    };

    onChange = ({target: {checked}}: SyntheticInputEvent<EventTarget>) => this.setState({checked});

    render() {
        return (
            <div className='form-check extender'>
                <input type='checkbox' id='extender-checkbox' className='form-check-input'
                       checked={this.state.checked} onChange={this.onChange}/>
                <label htmlFor='extender-checkbox' className='form-check-label'>Extend command</label>
            </div>
        );
    }
}

export default CommandExtender;