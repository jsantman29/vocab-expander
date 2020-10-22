import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { List, ListItem, ListItemText } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import '../VocabularyExpander.css';

function VocabularyExpanderWordFrequencyList({wordFrequencies, setSelectedWord, setWordModalOpen}) {

    const [selectedIndex, setSelectedIndex] = useState(-1);

    const useListStyles = makeStyles((theme) => ({
        container: {
            overflow: 'auto',
            height: '100%',
            width: '100%',
            textAlign: 'center',
            borderRadius: '25px',
            boxShadow: 'inset 5px 5px 10px #e3e3e3, inset -5px -5px 10px #ffffff',
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        emptyText: {
            color: '#E0E0E0',
        },
        listItem: {
            borderBottom: '2px #E0E0E0 solid',
        },
    }));

    const listStyles = useListStyles();

    const formatListItem = (wordFrequency, index) => {
        return (
            <ListItem
                button
                className={listStyles.listItem}
                wordFrequency = {wordFrequency}
                onClick= {(event) => handleListItemClick(event, index, wordFrequency)}
            >
                <ListItemText className="wordFrequencyListItem">
                    {wordFrequency.word}, {wordFrequency.count}
                </ListItemText>
            </ListItem>
        );
    };

    const handleListItemClick = (event, index, wordFrequency) => {
        setSelectedIndex(index);
        setSelectedWord(wordFrequency);
        setWordModalOpen(true);
    };

    const buildListItems = (wordFrequencyArray) => {
        const items = [];
        wordFrequencyArray.forEach((wordFrequency, index) => {
            items.push(formatListItem(wordFrequency, index));
        });
        return items;
    };

    const renderEmptyList = () => {
        return (
            <div
                className="wordFrequencyEmptyText">
                <Typography
                    variant='h3'
                    className={listStyles.emptyText}>
                                Empty
                </Typography>
            </div>
        );
    };

    const renderList = () => {
        const listItems = buildListItems(wordFrequencies);

        if(listItems.length > 0) {
            return (
                <List
                    disablePadding={true}>
                    {listItems}
                </List>
            );
        } else {
            return renderEmptyList();
        }
    };

    return (
        <Box
            className={listStyles.container}>
            {renderList()}
        </Box>
    );
}

export default VocabularyExpanderWordFrequencyList;