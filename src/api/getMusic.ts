import axios, { AxiosResponse } from 'axios';
import { MusicDTO } from '../types/music.type';

type APIResponse<T> = {
    items: T[];
};

type GetMusicResponse = AxiosResponse<APIResponse<MusicDTO>>;

export const getMusic = async () => {
    const res: GetMusicResponse = await axios({
        url: 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=PLFgquLnL59alGJcdc0BEZJb2p7IgkL0Oe&part=snippet&maxResults=50&key=AIzaSyCcdfK8HnLp6hk0YndzM70EUw05O-dFwRk',
        method: 'get',
    });
    console.log(res);
    return res;
};
