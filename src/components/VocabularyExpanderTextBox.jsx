import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputBase from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const VocabularyExpanderTextBox = ({text, setText, isProcessing}) => {

    const useTextBoxStyles = makeStyles((theme) => ({
        root: {
            borderRadius: '25px',
            background: theme.palette.primary.main,
            boxShadow: 'inset 5px 5px 10px #e3e3e3, inset -5px -5px 10px #ffffff',
            padding: theme.spacing(3),
            position: 'relative',
            width: '100%',
        },
    }));

    const useCircularProgressStyles = makeStyles((theme) => ({
        root: {
            color: theme.palette.tertiary.main,
        }
    }));

    const useBoxStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            justifyContent: 'center',
        },
        circularProgressBox: {
            display: 'flex',
            zIndex: '1',
            margin: 'auto',
            position: 'absolute',
            width: '50%',
            justifyContent: 'center',
            alignSelf: 'center',
        }
    }));

    const textBoxStyles = useTextBoxStyles();
    const circularProgressStyles = useCircularProgressStyles();
    const boxStyles = useBoxStyles();
    
    const renderLoading = () => {
        return (
                <Box
                    class={boxStyles.circularProgressBox}>
                    <CircularProgress
                        classes={circularProgressStyles}/>
                </Box>
        );
    };

    const handleTextChange = (event) => {
        const string = event.target.value;
        setText(string);
    };

    const renderTextField = () => {
        return (
            <InputBase
                classes={textBoxStyles}
                value={text || ''}
                multiline
                rows={10}
                placeholder="Enter text here..."
                onChange={handleTextChange}/>
        );
    };


    return (
        <Box
            class={boxStyles.root}>
            {renderTextField()}
            {isProcessing && renderLoading()}
        </Box>
    );

}

export default VocabularyExpanderTextBox;