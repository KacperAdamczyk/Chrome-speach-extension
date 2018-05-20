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
        window.navigator.mediaDevices.getUserMedia({audio: true, video: false})
            .then(
                () => this.setState({haveAccess: true}),
                () => this.setState({haveAccess: false})
            );
    }

    render() {
        return (
            this.state.haveAccess ?
                this.props.children :
                <div className='no-access'>
                    <span>No access to microphone</span>
                    <a href='access-page/access-page.html' target='_blank'>
                        <button className='btn btn-outline-danger'>Access provider page</button>
                    </a>
                </div>
        );
    }
}

export default AccessProvider;