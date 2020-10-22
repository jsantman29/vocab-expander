import React, { useEffect, useState } from 'react';
import { countCharacters, countWords } from '../js/vocabulary_expander_library';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button } from '@material-ui/core';

const VocabularyExpanderToolTipButton = ({text}) => {

    const [ wordCount, setWordCount ] = useState(0);
    const [ characterCount, setCharacterCount ] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect( () => {
        setCharacterCount(countCharacters(text));
        setWordCount(countWords(text));
    }, [text]);

    const useToolTipStyles = makeStyles((theme) => ({
        tooltip: {
                backgroundColor: theme.palette.primary.dark,
                color: 'rgba(0, 0, 0, 0.87)',
                maxWidth: 220,
                border: '1px solid #535353',
                fontSize: theme.typography.pxToRem(14),
            }
    }));

    const useButtonStyles = makeStyles((theme) => ({
        button: {
            color: '#0d0d0d',
            background: theme.palette.primary.main,
            boxShadow: '-3px 3px 5px #dcdcdc, 3px -3px 5px #ffffff',
        }
    }));

    const toolTipStyles = useToolTipStyles();
    const buttonStyles = useButtonStyles();

    const handleTooltipClose = () => {
      setOpen(false);
    };
  
    const handleTooltipOpen = () => {
      setOpen(true);
    };

    const renderTooltip = () => {
        return (
            <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
                        classes={toolTipStyles}
                        title={renderTooltipText()}
                        open={open}
                        onClose={handleTooltipClose}
                        placement='top'
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener>
                            <Button
                            className={buttonStyles.button}
                                onClick={handleTooltipOpen}
                                size='large'>
                                    <Typography>
                                        INFO
                                    </Typography>
                                </Button>
                        </Tooltip>
                    </ClickAwayListener>
                    
        )
    }

    const renderTooltipText = () => {
        return (
            <>
            <Typography color="inherit">Text Information</Typography>
            Character Count: {characterCount} <br/>
            Word Count: {wordCount}
            </>
        )
    }

    return (
        <>
        {renderTooltip()}
        </>
    )
}

export default VocabularyExpanderToolTipButton;