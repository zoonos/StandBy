import { useState } from 'react';
import useInterval from '../hooks/useInterval';
import dayjs from 'dayjs';

type useClockProps = {
    analog?: boolean;
};

type Time = {
    hour: number;
    minute: number;
    second: number;
};

export const useClock = ({ analog }: useClockProps) => {
    const getDate = () => dayjs();

    const day = getDate();

    const calculateHr = (val: number) => {
        return val * (analog ? 60 : 1);
    };

    const calculateMnSc = (val: number) => {
        return val * (analog ? 6 : 1);
    };

    const [time, setTime] = useState<Time>({
        hour: calculateHr(day.hour()),
        minute: calculateMnSc(day.minute()),
        second: calculateMnSc(day.second()),
    });

    useInterval(() => {
        const day = getDate();
        setTime({
            hour: calculateHr(day.hour()),
            minute: calculateMnSc(day.minute()),
            second: calculateMnSc(day.second()),
        });
    }, 1000);

    return { time };
};
