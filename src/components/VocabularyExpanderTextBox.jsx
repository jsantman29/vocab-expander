import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputBase from '@material-ui/core/InputBase';

const VocabularyExpanderTextBox = ({text, setText}) => {

    const useTextBoxStyles = makeStyles((theme) => ({
        root: {
            borderRadius: '25px',
            background: theme.palette.primary.main,
            boxShadow: 'inset 5px 5px 10px #e3e3e3, inset -5px -5px 10px #ffffff',
            padding: theme.spacing(3),
        },
    }));

    const handleTextChange = (event) => {
        const string = event.target.value;
        setText(string);
    };

    const textBoxStyles = useTextBoxStyles();

    return (
        <InputBase
            classes={textBoxStyles}
            value={text || ''}
            multiline
            rows={10}
            label="Enter text here..."
            onChange={handleTextChange}
        />
    );

}

export default VocabularyExpanderTextBox;