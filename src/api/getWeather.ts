import axios, { AxiosResponse } from 'axios';

type WeatherDTO = {
    baseDate: string;
    baseTime: string;
    category: string;
    fcstDate: string;
    fcstTime: string;
    fcstValue: string;
    nx: number;
    ny: number;
};
type APIResponse<T> = {
    response: {
        header:{
            resultCode:string;
        };
        body?: {
            items: {
                item: T;
            };
        };
    };
};

type GetWeatherResponse = AxiosResponse<APIResponse<WeatherDTO[]>>;

export const getWeather = async (
    baseDate: string,
    baseTime: string,
    lat: number,
    lng: number,
) => {
    const res: GetWeatherResponse = await axios({
        url: 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst',
        method: 'get',
        params: {
            serviceKey:
                'CWeri4G/zeEjLF1RvP1oGYMGn3wjCZTGWirI1jbrDsDUuKYq2JDrjKr8DJc6qPKcNDCLEZdRWCemlqiqcdP3vA==',
            pageNo: '1',
            numOfRows: '1000',
            dataType: 'JSON',
            base_date: baseDate,
            base_time: baseTime,
            nx: Math.round(lat),
            ny: Math.round(lng),
        },
    });
    return res;
};
