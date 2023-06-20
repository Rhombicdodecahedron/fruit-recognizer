import React, {useRef, useState} from 'react';
import {Button, Container, Dimmer, Divider, Header, Image, Loader, Message} from 'semantic-ui-react';

import fruit from '../assets/icon/icon.png';

const CameraPage = () => {
    const fileInputRef = useRef(null);
    const [responseText, setResponseText] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Open the camera
    const openCamera = () => {
        if (!fileInputRef || !fileInputRef.current) {
            return;
        }
        fileInputRef.current.click();
    };

    // Take a picture and send it to the API
    const handleFileSelect = async (event) => {
        const file = event.target.files[0];

        if (!file) {
            setResponseText(null);
            setError('No image selected or captured');
            return;
        }

        try {
            // TODO
        } catch (error) {
            console.error('Error while sending the image to the API: ', error);
            setResponseText(null);
            setError(error.response.data.details);
        }
    };

    return (
        <Container textAlign="center">
            <Dimmer active={loading} inverted>
                <Loader>Loading</Loader>
            </Dimmer>
            <Divider hidden></Divider>
            <Header as='h1'>Fruit Recognizer</Header>
            <Divider hidden></Divider>
            <Image src={fruit} size='small' centered rounded/>
            <Header as='h4'>A simple fruit recognizer using a neural network. Currently, it can recognize apples, bananas and lemons.</Header>
            <Divider hidden></Divider>
            <Button onClick={openCamera}>Open camera</Button>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="camera"
                style={{display: 'none'}}
                onChange={handleFileSelect}
            />
            <Divider hidden></Divider>
            {responseText &&
                <Message success>
                    <Message.Header>Image successfully predicted</Message.Header>
                    <p>The predicted fruit is: <strong>{responseText}</strong></p>
                </Message>
            }
            {error &&
                <Message error>
                    <Message.Header>Error</Message.Header>
                    <p>{error}</p>
                </Message>
            }
        </Container>
    );
}

export default CameraPage;
