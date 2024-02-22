import {useState} from "react";
import styles from './clockA.module.css';
import useInterval from "../../hooks/useInterval";

function ClockA() {
    const deg = 6;
    const startDay = new Date();
    const [hr, setHr] = useState(startDay.getHours() * 30);
    const [mn, setMn] = useState(startDay.getMinutes() * deg);
    const [sc, setSc] = useState(startDay.getSeconds() * deg);

    useInterval(
        () => {
            let day = new Date();
            setHr(day.getHours() * 30);
            setMn(day.getMinutes() * deg);
            setSc(day.getSeconds() * deg);
        }
    ,1000);

    return(
        <div className="itemWrap">
            <div className={styles.clock}>
                <div className={styles.hour}>
                    <div className={styles.hr} style={{ transform: `rotateZ(${hr+(mn/12)}deg)` }}></div>
                </div>
                <div className={styles.min}>
                    <div className={styles.mn} style={{ transform: `rotateZ(${mn}deg)` }}></div>
                </div>
                <div className={styles.sec}>
                    <div className={styles.sc} style={{ transform: `rotateZ(${sc}deg)` }}></div>
                </div>
            </div>
        </div>
    )
}
export default ClockA;