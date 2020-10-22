import React from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';

const VocabularyExpanderHeader = () => {

    const title = "Vocabulary Expander";

    const useBoxStyles = makeStyles((theme) => ({
        textContainer: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            paddingBottom: theme.spacing(2),
        },
    }));

    const boxStyles = useBoxStyles();

    const renderHeader = () => {
        return (
            <Box className={boxStyles.textContainer}>
                <Typography
                    align='center'
                    variant='h3'>
                    <b>{title}</b>
                </Typography>
            </Box>
        )
    }

    return (
        <>
        {renderHeader()}
        </>
    );
}

export default VocabularyExpanderHeader;