import React, { useState } from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

import './VocabularyExpander.css';
import VocabularyExpanderTextBox from './components/VocabularyExpanderTextBox';
import VocabularyExpanderButtonContainer from './components/VocabularyExpanderButtonContainer';
import VocabularyExpanderWordFrequencyDisplay from './components/VocabularyExpanderWordFrequencyDisplay';
import VocabularyExpanderWordModal from './components/VocabularyExpanderWordModal';
import VocabularyExpanderHeader from './components/VocabularyExpanderHeader';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';

const VocabularyExpander = () => {

    const [ text, setText ] = useState('');
    const [ wordFrequencies, setWordFrequencies ] = useState([]);
    const [ selectedWord, setSelectedWord ] = useState(undefined);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ synonymsCache, setSynonymsCache ] = useState(new Map());

    const handleClear = () => {
        setText('');
        setWordFrequencies([]);
    };

    const handleModalClose = () => {
        setSelectedWord(undefined);
        setIsModalOpen(false);
    };

    const useStyles = makeStyles((theme) => ({
        box: {
            padding: theme.spacing(3),
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        grid: {
            height: '100%',
            justifyContent: 'flex-start',
        },
        gridItem: {
            flex: '1',
        },
    }));

    const classes = useStyles();

    const renderVocabularyExpander = () => {
        return (
            <Box className={classes.box}>
                <VocabularyExpanderHeader>

                </VocabularyExpanderHeader>
                <VocabularyExpanderTextBox
                    text={text}
                    setText={setText} 
                />
                <VocabularyExpanderButtonContainer
                    text={text}
                    setWordFrequencies={setWordFrequencies}
                    handleClear={handleClear}
                />
                <VocabularyExpanderWordFrequencyDisplay
                    wordFrequencies={wordFrequencies}
                    setSelectedWord={setSelectedWord}
                    setWordModalOpen={setIsModalOpen}
                />
                <VocabularyExpanderWordModal
                    selectedWord={selectedWord}
                    synonymsCache={synonymsCache}
                    setSynonymsCache={setSynonymsCache}
                    isModalOpen={isModalOpen}
                    handleModalClose={handleModalClose}
                />
            </Box>
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {renderVocabularyExpander()}
        </ThemeProvider>
        
    );
};

export default VocabularyExpander;