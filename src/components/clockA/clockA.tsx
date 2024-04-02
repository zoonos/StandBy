import React from 'react';
import styles from './clockA.module.css';
import { useClock } from '../../hooks/useClock';

function ClockA() {
    const { time } = useClock({ analog: true });
    const { hour, minute, second } = time;

    return (
        <div className="itemWrap">
            <div className={styles.clock}>
                <div className={styles.hour}>
                    <div
                        className={styles.hr}
                        style={{
                            transform: `rotateZ(${hour + minute / 12}deg)`,
                        }}
                    />
                </div>
                <div className={styles.min}>
                    <div
                        className={styles.mn}
                        style={{ transform: `rotateZ(${minute}deg)` }}
                    />
                </div>
                <div className={styles.sec}>
                    <div
                        className={styles.sc}
                        style={{ transform: `rotateZ(${second}deg)` }}
                    />
                </div>
            </div>
        </div>
    );
}
export default ClockA;
