import { useState } from 'react';
import useInterval from '../hooks/useInterval';
import dayjs from 'dayjs';

const dayList = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

type Date = {
    month: number;
    date: number;
    day: string;
};

export const useDateInfo = () => {
    const getDate = () => dayjs(); // 유틸함수로 뺴서 사용할 수 있음.
    // 기능을 단순화 해서 하나의 책임만 가질 수 있도록.

    const day = getDate();

    const [dateInfo, setDateInfo] = useState<Date>({
        month: day.month(),
        date: day.date(),
        day: dayList[day.day()]
    });

    useInterval(() => {
        const day = getDate();

        setDateInfo({
            month: day.month(),
            date: day.date(),
            day: dayList[day.day()]
        });
    }, 1000);

    return { dateInfo };
};
