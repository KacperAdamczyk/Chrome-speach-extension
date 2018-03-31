/* @flow */
import React, {Component} from 'react';

import './AccessProvider.css';

declare var chrome: any;

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
            ); chrome.runtime.sendMessage({type: 'GET_COMMANDS', payload: 'youtube.com'}, (r) => console.log('res', r));
    }

    render() {
        return (
            this.state.haveAccess ?
                this.props.children :
                <div className='no-access'>
                    No access to media
                    <a href='access-page/access-page.html' target="_blank">Provide access</a>
                </div>
        );
    }
}

export default AccessProvider;