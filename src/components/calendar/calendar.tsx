import {useEffect, useState} from "react";
import styles from './calendar.module.css';
import useInterval from "../../hooks/useInterval";

function Calendar() {

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const date = new Date();
    
    const [day, setDay] = useState(date.getDay());
    const [month, setMonth] = useState(date.getMonth());
    const [dateSet, setDateSet] = useState('');

    function makeDate(date:Date){
        let tempDataSet = '';
        let year = date.getFullYear();
        let month = date.getMonth();
        
        // 해당 월 1일의 요일을 받아서 빈 칸으로 채움
        let firstDate = new Date(year,month,1).getDay();
        for(let i=0; i<firstDate; i++){
            tempDataSet += `<div></div>`
        }

        // 해당 월 요일의 마지막 날짜까지 요일 랜더링
        let lastDate = new Date(year,(month+1),0).getDate();
        for(let i=0; i<lastDate; i++){
            if( (i+1) === date.getDate()){
                tempDataSet += `<div style="background:#f33d3a">${i+1}</div>`
            } else {
                tempDataSet += `<div>${i+1}</div>`
            }
            
        }
        
        setDateSet(tempDataSet);
    }

    useInterval(
        () => {
            let nowDate = new Date();
            let nowDay = nowDate.getDay();
            let nowMonth = nowDate.getMonth();
            if(day !== nowDay){
                setDay(nowDay);
                makeDate(nowDate);
                if(month !== nowMonth){
                    setMonth(nowMonth);
                }
            }
        }
    ,1000);

    useEffect(() => {
        makeDate(date);
    },[])


    return(
        <div className='itemWrap'>
            <div className={styles.sec_cal}>
                <div className={styles.year_month}>{months[month]}</div>
                <div className={styles.cal_wrap}>
                    <div className={styles.days}>
                    <div className={styles.day}>S</div>
                    <div className={styles.day}>M</div>
                    <div className={styles.day}>T</div>
                    <div className={styles.day}>W</div>
                    <div className={styles.day}>T</div>
                    <div className={styles.day}>F</div>
                    <div className={styles.day}>S</div>
                    </div>
                    <div className={styles.dates} dangerouslySetInnerHTML={{__html: dateSet}}></div>
                </div>
            </div>
        </div>
    )
}
export default Calendar;