getAccess();
        function getAccess() {
            window.navigator.mediaDevices.getUserMedia({audio: true, video: false})
                .then(
                    () => window.close.call(this),
                    () => getAccess()
                );
        }