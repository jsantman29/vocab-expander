import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { getSynonyms } from '../js/textAPI_library';
import '../VocabularyExpander.css';

const useStyles = makeStyles((theme) => ({ 
    paper: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'auto',
    },
}));

const VocabularyExpanderWordModal = ({selectedWord, synonymsCache, setSynonymsCache, isModalOpen, handleModalClose}) => {

    const classes = useStyles();
    const [synonyms, setSynonyms] = useState(undefined);

    const makeSynonymsString = (data) => {
        let synonymsString = '';
        if (data !== undefined && data.length > 0) {
            data.forEach((value, index) => {
                if(index != data.length - 1) {
                    synonymsString += value + ', '; 
                } else {
                    synonymsString += value;
                }
            });    
        } else {
            synonymsString += 'no synonyms found';     
        }
        return synonymsString;
    };
    
    useEffect(() => {
        try {
            if(selectedWord){
                const cachedData = synonymsCache.get(selectedWord.word);
                if(cachedData) {
                    //alert("Loading from cache.");
                    setSynonyms(makeSynonymsString(cachedData));
                } else {
                    getSynonyms(selectedWord.word)
                        .then((response) => {
                            return response.json();
                        })
                        .then(responseJson => {
                        //alert(responseJson.success);
                            if(responseJson.success === false){
                                setSynonyms(`error: ${responseJson.message}`);
                            } else {
                                const data = responseJson.synonyms;
                                synonymsCache.set(selectedWord.word, data);
                                setSynonymsCache(synonymsCache);
                                setSynonyms(makeSynonymsString(data));
                            }
                        });
                }
            } else {
                setSynonyms(undefined);
            }
        } catch(e) {
            alert(e);
        }
        
    }, [selectedWord, setSynonymsCache, synonymsCache]);

    const makeCountString = () => {
        let base = '';
        if (selectedWord.count === 1) {
            base = 'time';
        } else {
            base = 'times';
        }
        return `${selectedWord.count} ${base}`;
    };

    const renderLoadingGraphic = () => {
        return (
            <div className={classes.paper}>Loading synonyms...</div>
        );
    };

    const renderSynonymsTable = () => {
        return (
            <div className={classes.paper}>
                <h2>{selectedWord.word}</h2>
                <h3>Appears {makeCountString()}</h3>
                <p>
                    <b>Synonyms</b>
                    <br></br>
                    {synonyms}
                </p>
            </div>
        );
    };

    const renderModalBody = () => {
        if(synonyms){
            return renderSynonymsTable();
        } else {
            return renderLoadingGraphic();
        }
    };

    const onModalClose = () => {
        setSynonyms(undefined);
        handleModalClose();
    };

    return (
        <Modal
            open={isModalOpen}
            onClose={onModalClose}
        >
            {renderModalBody()}
        </Modal>
    );
    
}

export default VocabularyExpanderWordModal;