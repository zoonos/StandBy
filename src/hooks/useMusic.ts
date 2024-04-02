import React, { useEffect, useState } from 'react';
import { getMusic } from '../api/getMusic';
import useInterval from './useInterval';

type MusicDTO = {
    snippet: {
        resourceId: {
            videoId: String;
        };
        title: String;
        videoOwnerChannelTitle: String;
    };
};

export const useMusic = () => {
    const [nowIdx, setNowIdx] = React.useState(0);
    const [isPlay, setIsPlay] = React.useState(false);
    const [playState, setPlayState] = React.useState(0);

    const [id, setId] = useState<String>('');
    const [title, setTitle] = useState<String>('');
    const [singer, setSinger] = useState<String>('');

    const [ytMusicList, setYtMusicList] = React.useState<MusicDTO[]>([]);

    useInterval(() => {
        if (isPlay) {
            if (playState !== 100) {
                setPlayState(playState + 1);
            } else {
                setPlayState(0);
            }
        }
    }, 1000);

    useEffect(() => {
        if (ytMusicList.length !== 0) {
            setId(ytMusicList[nowIdx].snippet.resourceId.videoId);
            setTitle(ytMusicList[nowIdx].snippet.title);
            setSinger(
                ytMusicList[nowIdx].snippet.videoOwnerChannelTitle.split(
                    '-',
                )[0],
            );
        }
    }, [ytMusicList, nowIdx]);

    useEffect(() => {
        handleMusic();
    }, []);

    const handleMusic = async () => {
        const data = (await getMusic()).data.items;
        setYtMusicList(data);
    };

    return {
        ytMusicList,
        isPlay,
        setIsPlay,
        setNowIdx,
        nowIdx,
        playState,
        id,
        title,
        singer,
    };
};
