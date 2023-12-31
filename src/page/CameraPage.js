import React, {useRef, useState} from 'react';
import axios from 'axios';
import {Button, Container, Dimmer, Divider, Header, Image, Loader, Message} from 'semantic-ui-react';

import fruit from '../assets/icon/icon.png';

const CameraPage = () => {
    const fileInputRef = useRef(null);
    const [responseText, setResponseText] = useState('');
    const [responseConfidence, setResponseConfidence] = useState('');
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
            setLoading(true);
            // Create a FormData object to send the image to the API
            const formData = new FormData();
            formData.append('image', file, file.name);

            // Send the image to the API
            const response = await axios.post('https://fruit-recognizer.dev-alexis.com/api/recognize', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setLoading(false);
            setResponseText(response.data.predictedValue);
            setResponseConfidence(response.data.percent);
            setError(null);
            console.log('Response from the API: ', response);
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
            <Header as='h4'>A simple fruit recognizer using a neural network. Currently, it can recognize apples, bananas and pineapples.</Header>
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
                    <p>The predicted fruit is: <strong>{responseText}</strong> ({responseConfidence}%)</p>
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
