import {useEffect, useState} from "react";
import styles from './clockD2.module.css';
import useInterval from "../../hooks/useInterval";
import axios from "axios";
import dayjs from "dayjs";

interface IWeather {
    baseDate: string,
    baseTime: string,
    category: string,
    fcstDate: string,
    fcstTime: string,
    fcstValue: string,
    nx: number,
    ny: number
}

function ClockD2() {

    const dateList = ["일","MON","TUE","WED","THU","FRI","SAT"];
    const ptyList = ['없음', '비', '비/눈', '눈', '', '빗방울', '빗방울눈날림', '눈날림'];
    const skyList = ['','맑음', '', '구름많음', '흐림'];

    const startDay = dayjs();
    const [hr, setHr] = useState(startDay.hour());
    const [mn, setMn] = useState(startDay.minute());
    const [sc, setSc] = useState(startDay.second());

    const [month, setMonth] = useState(startDay.month());
    const [date, setDate] = useState(startDay.date());
    const [day, setDay] = useState(startDay.day());

    const [lat, setLat] = useState(0); // 위도
    const [lng, setLng] = useState(0); // 경도
    const [baseDate, setBaseDate] = useState('');
    const [baseTime, setBaseTime] = useState('');

    const [temp, setTemp] = useState('');
    const [weather, setWeather] = useState('');

    useEffect(() => {
        // 현재 위치 가져오기
        navigator.geolocation.getCurrentPosition(
            // 현재 위치를 불러오는데 성공
            (position) => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);

                // 현재 시간의 1시간 전 예보를 조회
                let oneHourAgo = startDay.subtract(1, 'hour');
                setBaseDate(oneHourAgo.format('YYYYMMDD'));
                setBaseTime(oneHourAgo.format('HH')+'00');
            },
            // 현재 위치를 불러오는데 실패
            () => {
                alert('위도 경도 조회에 실패했습니다. 권한을 승인해주세요.'); 
            }
        );
    }, []);

    useEffect(() => {
        getWeather();
    }, [lat, lng, baseDate, baseTime])

    useInterval(
        () => {
            let day = dayjs();
            setHr(day.hour());
            setMn(day.minute());
            setSc(day.second());
            
            setMonth(day.month());
            setDate(day.date());
            setDay(day.day());

            // 30분마다 베이스 시간 변경
            if(day.minute() === 0){
                // 현재 시간의 1시간 전 예보를 조회
                let oneHourAgo = day.subtract(1, 'hour');
                setBaseDate(oneHourAgo.format('YYYYMMDD'));
                setBaseTime(oneHourAgo.format('HH')+'00');
            }
        }
    ,1000);

    async function getWeather(){

        await axios({
            url:'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst',
            method:'get',
            params: {
                serviceKey: 'CWeri4G/zeEjLF1RvP1oGYMGn3wjCZTGWirI1jbrDsDUuKYq2JDrjKr8DJc6qPKcNDCLEZdRWCemlqiqcdP3vA==',
                pageNo:'1',
                numOfRows:'1000',
                dataType:'JSON',
                base_date:baseDate,
                base_time:baseTime,
                nx:Math.round(lat),
                ny:Math.round(lng)
            }
        })
        .then(res => {
            if(res.data.response.body){
                let dataArr = res.data.response.body.items.item;
                // baseTime 기준 1시간 이후의 예보만 필터링
                let fillterArr = dataArr.filter(
                    (item:IWeather) => {
                        let forecastTime = dayjs(baseDate+baseTime).add(1, "hour").format('HHmm');
                        return item.fcstTime === forecastTime;
                    }
                )
                // 그 중 기온을 나타낸 배열을 필터링 => 기온 세팅
                let tempArr = fillterArr.filter(
                    (item:IWeather) => item.category === 'T1H'
                )
                setTemp(tempArr[0].fcstValue);

                // 그 중 강수형태를 나타낸 배열을 필터링
                // 강수 코드 - 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
                let ptyArr = dataArr.filter(
                    (item:IWeather) => item.category === 'PTY'
                )
                if(ptyArr[0].fcstValue === '0'){
                    // 강수 코드가 0이라면
                    // 하늘상태를 나타낸 배열을 필터링
                    // 하늘상태 코드 - 맑음(1), 구름많음(3), 흐림(4)
                    let skyArr = dataArr.filter(
                        (item:IWeather) => item.category === 'SKY'
                    )
                    setWeather(skyList[skyArr[0].fcstValue]);
                } else {
                    setWeather(ptyList[ptyArr[0].fcstValue]);
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

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
                    <div>{weather}</div>
                    <div>{temp}°C</div>
                </div>
            </div>
        </div>
    )
}
export default ClockD2;