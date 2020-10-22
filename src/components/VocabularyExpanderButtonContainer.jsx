import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import '../VocabularyExpander.css';
import { makeStyles } from '@material-ui/core/styles';
import { getWordFrequencies, getWords, isEmpty } from '../js/vocabulary_expander_library';
import { postFilteredText } from '../js/textAPI_library';
import VocabularyExpanderToolTipButton from './VocabularyExpanderToolTipButton';

const VocabularyExpanderButtonContainer = ({text, setWordFrequencies, handleClear}) => {

    const [ submitButtonDisabled, setSubmitButtonDisabled ] = useState(true);

    useEffect( () => {
        if (isEmpty(text) === true) {
            setSubmitButtonDisabled(true);
        } else {
            setSubmitButtonDisabled(false);
        }
    }, [text]);

    const useButtonStyles = makeStyles((theme) => ({
        buttonContainer: {
            display: 'flex',
            justifyContent: 'center',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        button: {
            background: theme.palette.primary.main,
            height: '100%',
            boxShadow: '-3px 3px 5px #dcdcdc, 3px -3px 5px #ffffff',
        },
    }));

    const generateWordFrequencies = () => {
        let words = [];
        postFilteredText(text)
            .then((response) => {
                return response.json();
            })
            .then(responseJson => {
                words = getWords(responseJson.body);
                setWordFrequencies(getWordFrequencies(words));
            });
    };

    const buttonStyles = useButtonStyles();

    return (
        <Box className={buttonStyles.buttonContainer}>
            <div className="textButtons">
                <div id="leftButtonCell" className='veButtonCell'>
                    <VocabularyExpanderToolTipButton
                        text={text}/>
                </div>
                <div id="middleButtonCell" className='veButtonCell'>
                    <Button 
                        size='large' 
                        className={buttonStyles.button}
                        onClick={generateWordFrequencies}
                        disabled={submitButtonDisabled}
                    >
                        PROCESS
                    </Button>
                </div>
                <div id="rightButtonCell" className='veButtonCell'>
                    <Button 
                        size='large' 
                        className={buttonStyles.button}
                        onClick={handleClear}
                    >
                        CLEAR
                    </Button>
                </div>
            </div>
        </Box>
    );
}

export default VocabularyExpanderButtonContainer;