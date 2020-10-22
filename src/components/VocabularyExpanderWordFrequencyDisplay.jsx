import React, { useState, useEffect } from 'react';
import { sortWordFrequenciesByCount, distributeArray } from '../js/vocabulary_expander_library';
import VocabularyExpanderWordFrequencyList from './VocabularyExpanderWordFrequencyList';
import '../VocabularyExpander.css';

import Hidden from '@material-ui/core/Hidden';

function VocabularyExpanderWordFrequencyDisplay({wordFrequencies, setSelectedWord, setWordModalOpen}) {

    const [ display, setDisplay ] = useState(undefined);

    useEffect( () => {
        try {
            setDisplay(renderDisplay());
        } catch {
            setDisplay(undefined);
        }
    }, [wordFrequencies]);

    const buildLists = (numOfLists) => {
        const sortedWordFrequencies = sortWordFrequenciesByCount(wordFrequencies, 'Descending');
        const wordFrequencyArrays = distributeArray(sortedWordFrequencies, numOfLists);
        const lists = [];
        for (let i = 0; i < wordFrequencyArrays.length; i++) {
            lists.push(<VocabularyExpanderWordFrequencyList 
                wordFrequencies={wordFrequencyArrays[i]}
                setSelectedWord={setSelectedWord}
                setWordModalOpen={setWordModalOpen}
            />);
        }
        return lists;
    };

    const renderDisplay = () => {
        return (
            <>
                <Hidden only={['md','lg', 'xl']}>
                    {buildLists(1)}
                </Hidden>
                <Hidden only={['xs', 'sm', 'lg', 'xl']}>
                    {buildLists(2)}
                </Hidden>
                <Hidden only={['xs', 'sm', 'md']}>
                    {buildLists(3)}
                </Hidden>
            </>
        );
    };

    return (
        <div className="wordFrequencyContainer">
            {display}
        </div>
    );
}

export default VocabularyExpanderWordFrequencyDisplay;