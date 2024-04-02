import React from 'react';
import styles from './clockD2.module.css';
import { useClock } from '../../hooks/useClock';
import { useDateInfo } from '../../hooks/useDate';
import { useWeather } from '../../hooks/useWeather';

function ClockD2() {
    const { time } = useClock({});
    const { hour, minute, second } = time;

    const { dateInfo } = useDateInfo();
    const { month, date, day } = dateInfo;

    const { weather } = useWeather();
    const { temp, sky } = weather;

    return (
        <div className="itemWrap">
            <div className={styles.clock}>
                <div className={styles.ampm}>{hour >= 12 ? 'PM' : 'AM'}</div>
                <div className={styles.time}>
                    {hour % 12 ? hour % 12 : 12} :{' '}
                    {minute < 10 ? '0' + minute : minute} :{' '}
                    {second < 10 ? '0' + second : second}
                </div>
                <div className={styles.info}>
                    <div>
                        {month + 1} / {date}
                    </div>
                    <div>{day}</div>
                    <div>{sky}</div>
                    <div>{temp}°C</div>
                </div>
            </div>
        </div>
    );
}
export default ClockD2;
