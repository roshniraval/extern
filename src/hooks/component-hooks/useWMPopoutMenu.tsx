import { useState, useEffect, useCallback, useMemo, useRef, MutableRefObject } from 'react';
import { PopoutMenuEvent } from '../../types/PopoutMenuEvent';


// for use when importing the component
export const usePopoutMenu = () => {

    const [isOpen, setIsOpenTo] = useState(false);
    const [h, setHorizontal] = useState(0);
    const [v, setVertical] = useState(0);
    const close = useCallback(() => setIsOpenTo(false), []);
    // const menuEvent = useMemo(() => {
    //     return {h, v, isOpen, close} as PopoutMenuEvent;
    // }, [h,v, close]);

    return {
        isOpen,
        menuEvent: {h, v, isOpen, close} as PopoutMenuEvent,
        open: (e: any) => {
            setIsOpenTo(true);
            setHorizontal(e.clientX);
            setVertical(e.clientY);
        },
        close
    };
}

type UseWMPopoutMenuArgs = {
    menuEvent: PopoutMenuEvent
    padding: number
    tickPosition: number
    horizontalFix: number | null
    verticalFix: number | null
    hPosition: number
    vPosition: number
    borderColor: string
}

// for use inside the component its self 
export const useWMPopoutMenu = ({
    menuEvent,
    padding,
    tickPosition,
    horizontalFix,
    verticalFix,
    hPosition,
    vPosition,
    borderColor
}: UseWMPopoutMenuArgs) => {
    const ref = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current.contains(e.target as Node)) return;
            menuEvent.close();
        }
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
            menuEvent.close();
        }
    }, [menuEvent.close, ref]);
    
    
    const menuContainerStyle = useMemo(() => {
        const left = horizontalFix || menuEvent.h;
        const top = verticalFix || menuEvent.v;
        return {
            padding,
            left,
            top, 
            marginLeft: hPosition,
            marginTop: vPosition,
            border: `1px solid ${borderColor}`
        }

    }, [
        padding, 
        horizontalFix, 
        verticalFix, 
        menuEvent,
        hPosition,
        vPosition,
        borderColor
    ]);

    const backgroundArrowStyle = useMemo(() => {
        return {
            marginLeft: `-${padding + 6}px`,
            marginTop: 4 - padding + tickPosition,
        }
    },[padding, tickPosition]);

    const foregroundArrowStyle = useMemo(() => {
        return {
            marginLeft: `-${padding + 5}px`,
            marginTop: 4 - padding + tickPosition,
        }
    },[padding, tickPosition]);

    return {
        ref,
        menuContainerStyle,
        backgroundArrowStyle,
        foregroundArrowStyle
    }
}
