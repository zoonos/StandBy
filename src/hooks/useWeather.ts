import React, { useEffect } from 'react';
import { getWeather } from '../api/getWeather';
import dayjs from 'dayjs';
import useInterval from './useInterval';

type Weather = {
    temp: string;
    sky: string;
};

interface IWeather {
    baseDate: string;
    baseTime: string;
    category: string;
    fcstDate: string;
    fcstTime: string;
    fcstValue: string;
    nx: number;
    ny: number;
}

const ptyList: Record<string, string> = {
    0: '없음',
    1: '비',
    2: '비/눈',
    3: '눈',
    4: '빗방울',
    5: '빗방울눈날림',
    6: '눈날림',
};

const skyList: Record<string, string> = {
    1: '맑음',
    3: '구름많음',
    4: '흐림',
};

export const useWeather = () => {
    const startDay = dayjs();

    const [lat, setLat] = React.useState(0); // 위도
    const [lng, setLng] = React.useState(0); // 경도
    const [baseDate, setBaseDate] = React.useState('');
    const [baseTime, setBaseTime] = React.useState('');

    const [weather, setWeather] = React.useState<Weather>({
        temp: '0',
        sky: '',
    });

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
                setBaseTime(oneHourAgo.format('HH') + '00');
            },
            // 현재 위치를 불러오는데 실패
            () => {
                alert('위도 경도 조회에 실패했습니다. 권한을 승인해주세요.');
            },
        );
    }, []);

    const handleWeather = async () => {
        const data = (await getWeather(baseDate, baseTime, lat, lng)).data
            .response;
        // console.log('!!!!!!!!!!')
        // console.log(data)

        if (data.header.resultCode === '00' && data.body) {
            let temp = '';
            let sky = '';
            const dataArr = data.body.items.item;
            // baseTime 기준 1시간 이후의 예보만 필터링
            const fillterArr = dataArr.filter((item: IWeather) => {
                const forecastTime = dayjs(baseDate + baseTime)
                    .add(1, 'hour')
                    .format('HHmm');
                return item.fcstTime === forecastTime;
            });
            // 그 중 기온을 나타낸 배열을 필터링 => 기온 세팅
            const tempArr = fillterArr.filter(
                (item: IWeather) => item.category === 'T1H',
            );

            // 기온 세팅
            temp = tempArr[0].fcstValue;

            // 그 중 강수형태를 나타낸 배열을 필터링
            // 강수 코드 - 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
            const ptyArr = dataArr.filter(
                (item: IWeather) => item.category === 'PTY',
            );
            if (ptyArr[0].fcstValue === '0') {
                // 강수 코드가 0이라면
                // 하늘상태를 나타낸 배열을 필터링
                // 하늘상태 코드 - 맑음(1), 구름많음(3), 흐림(4)
                const skyArr: IWeather[] = dataArr.filter(
                    (item: IWeather) => item.category === 'SKY',
                );
                // skyArr
                sky = skyList[skyArr[0].fcstValue];
                // sky = skyList[1]
            } else {
                sky = ptyList[ptyArr[0].fcstValue];
            }
            setWeather({
                temp: temp,
                sky: sky,
            });
        }
    };

    useEffect(() => {
        handleWeather();
    }, [lat, lng, baseDate, baseTime]);

    useInterval(() => {
        const day = dayjs();

        // 30분마다 베이스 시간 변경
        if (day.minute() === 0) {
            // 현재 시간의 1시간 전 예보를 조회
            const oneHourAgo = day.subtract(1, 'hour');
            setBaseDate(oneHourAgo.format('YYYYMMDD'));
            setBaseTime(oneHourAgo.format('HH') + '00');
        }
    }, 1000);

    return { weather };
};
