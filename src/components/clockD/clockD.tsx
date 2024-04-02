import React from 'react';
import styles from './clockD.module.css';
import { useClock } from '../../hooks/useClock';

function ClockD() {
    const { time } = useClock({});
    const { hour, minute, second } = time;

    return (
        <div className="itemWrap">
            <div className={styles.clock}>
                <div className={styles.ampm}>{hour >= 12 ? 'PM' : 'AM'}</div>
                <div className={styles.time}>
                    {hour % 12 ? hour % 12 : 12} :{' '}
                    {minute < 10 ? '0' + minute : minute}
                </div>
                <div className={styles.sec}>
                    {second < 10 ? '0' + second : second}
                </div>
            </div>
        </div>
    );
}
export default ClockD;
