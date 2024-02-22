import {useState} from "react";
import styles from './clockD2.module.css';
import useInterval from "../../hooks/useInterval";

function ClockD2() {

    const dateList = ["일","MON","TUE","WED","THU","FRI","SAT"];

    const startDay = new Date();
    const [hr, setHr] = useState(startDay.getHours());
    const [mn, setMn] = useState(startDay.getMinutes());
    const [sc, setSc] = useState(startDay.getSeconds());

    const [month, setMonth] = useState(startDay.getMonth());
    const [date, setDate] = useState(startDay.getDate());
    const [day, setDay] = useState(startDay.getDay());
    
    useInterval(
        () => {
            let day = new Date();
            setHr(day.getHours());
            setMn(day.getMinutes());
            setSc(day.getSeconds());
            setMonth(day.getMonth());
            setDate(day.getDate());
            setDay(day.getDay());
        }
    ,1000);

    return(
        <div className='itemWrap'>
            <div className={styles.clock}>
                <div className={styles.ampm}>{hr>=12 ? 'PM' : 'AM'}</div>
                <div className={styles.time}>
                    {hr % 12 ? hr % 12 : 12} : {mn < 10 ? '0'+mn : mn} : {sc < 10 ? '0'+sc : sc}
                </div>
                <div className={styles.info}>
                    <div>{month+1} / {date}</div>
                    <div>{dateList[day]}</div>
                    <div>맑음</div>
                    <div>6°C</div>
                </div>
            </div>
        </div>
    )
}
export default ClockD2;