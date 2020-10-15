import React from 'react';
import { createUseStyles } from 'react-jss';
import { useTextInput } from '../hooks/useTextInput';

type WMEditFolderBarProps = {
    initial: string,
    onAccept: (value: string) => void,
    onCancel: () => void,

}

const WMEditFolderBar = ({
    initial,
    onAccept,
    onCancel
}: WMEditFolderBarProps) => {
    const classes = useStyles();
    const { value, setValue, bind:bindTextInput } = useTextInput(initial);
    return (
    <div className={classes.container}>
        <input className={classes.input} {...bindTextInput}></input>
        {/* replace div's below with icons */}
        <div className={classes.acceptIcon} onClick={() => onAccept(value)} ></div>
        <div className={classes.cancelIcon} onClick={onCancel} ></div>
    </div>
    )
}

const useStyles = createUseStyles({
    container: {
        height: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        top: 0,
        padding: {
            left: 4, top: 0, right: 0, bottom: 0
        },
        marginLeft:28,
        fontSize: 16,
        width: 'calc(100% - 96px)',
        height: 19,
        boxSizing: 'boarder-box',
        border: {
            width: 1,
            color: '#85B554',
            style: 'solid'
        },
        '&:focus': {
            outline: 'none'
        }
    },
    acceptIcon: {
        marginLeft: 5,
        height: 12,
        width: 12,
        borderRadius: 100,
        backgroundColor: '#85B554'
    },
    cancelIcon: {
        marginLeft: 5,
        height: 12,
        width: 12,
        borderRadius: 100,
        backgroundColor: '#333333',
    },
    
});

export default WMEditFolderBar;