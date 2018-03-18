/* @flow */
import React, {Component} from 'react';

import './AccessProvider.css';

type Props = {
    children: any
}

type State = {
    haveAccess: boolean
};

class AccessProvider extends Component<Props, State> {
    state = {
        haveAccess: false
    };

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({audio: true, video: false})
            .then(
                () => this.setState({haveAccess: true}),
                () => this.setState({haveAccess: false})
            );
    }

    render() {
        return (
            this.state.haveAccess ?
                this.props.children :
                <div className='no-access'>No access to media</div>
        )
    }
}

export default AccessProvider;