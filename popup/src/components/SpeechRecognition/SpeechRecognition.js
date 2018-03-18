import React, {Fragment} from 'react';

import SpeechRecognitionOptions from "./SpeechRecognitionOptions/SpeechRecognitionOptions";
import SpeechRecognitionInstance from "./SpeechRecognitionInstance/SpeechRecognitionInstance";

function SpeechRecognition() {
    return (
        <Fragment>
            <SpeechRecognitionOptions/>
            <SpeechRecognitionInstance/>
        </Fragment>
    )
}

export default SpeechRecognition;