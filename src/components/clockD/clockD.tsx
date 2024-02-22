import {useState} from "react";
import styles from './clockD.module.css';
import useInterval from "../../hooks/useInterval";

function ClockD() {
    const startDay = new Date();
    const [hr, setHr] = useState(startDay.getHours());
    const [mn, setMn] = useState(startDay.getMinutes());
    const [sc, setSc] = useState(startDay.getSeconds());
    
    useInterval(
        () => {
            let day = new Date();
            setHr(day.getHours());
            setMn(day.getMinutes());
            setSc(day.getSeconds());
        }
    ,1000);

    return(
        <div className='itemWrap'>
            <div className={styles.clock}>
                <div className={styles.ampm}>{hr>=12 ? 'PM' : 'AM'}</div>
                <div className={styles.time}>
                    {hr % 12 ? hr % 12 : 12} : {mn < 10 ? '0'+mn : mn}
                </div>
                <div className={styles.sec}>{sc < 10 ? '0'+sc : sc}</div>
            </div>
        </div>
    )
}
export default ClockD;