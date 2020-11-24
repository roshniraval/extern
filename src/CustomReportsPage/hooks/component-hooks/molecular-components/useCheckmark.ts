import { useState, useCallback } from 'react';

type Slaves = {
    setAllSlaves: (master: boolean) => void
}

export const useMasterCheckmark = (slaves: Slaves, init: boolean = false) => {
    const [state, setStateTo] = useState(init);

    const toggle = () => {
        setStateTo(!state);
        slaves.setAllSlaves(!state);
    }

    return {
        state,
        toggle
    }
}

export const useMultipleCheckmarkSlaves = (numberOfSlaves: number, init: boolean = false) => {
    const [checkmarkSlaves, setSlaveArrayTo] = useState(
        Array<Boolean>(numberOfSlaves).fill(init)
    );
    
    const setAllSlaves = useCallback((masterState: boolean) => {
        setSlaveArrayTo(Array<boolean>(checkmarkSlaves.length).fill(masterState));
    }, []);

    const toggleSlave = useCallback((slaveIndex: number) => {
        let arr = [...checkmarkSlaves];
        arr[slaveIndex] = !checkmarkSlaves[slaveIndex]
        setSlaveArrayTo(arr);
    }, [checkmarkSlaves]);
    
    return {
        checkmarkSlaves,
        setAllSlaves,
        toggleSlave,
        slave: (id: number) => {
            // console.log('slave', id);
            return checkmarkSlaves[id].valueOf()
        }
    }
}