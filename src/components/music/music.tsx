import React, { useEffect, useState } from 'react';
import styles from './music.module.css';
import { useMusic } from '../../hooks/useMusic';
import useInterval from '../../hooks/useInterval';

function Music() {
    const {
        playState,
        isPlay,
        setIsPlay,
        setNowIdx,
        nowIdx,
        id,
        title,
        singer,
    } = useMusic();

    return (
        <div className="itemWrap">
            <div className={styles.wrap}>
                <div className={styles.playerTop}>
                    <div
                        className={`${styles.record} ${isPlay ? styles.play : ''}`}
                    >
                        <div className={styles.recordImg}>
                            {/* <img src={list[nowIdx].snippet.thumbnails.standard.url}/> */}
                            <iframe
                                src={`https://www.youtube.com/embed/${id}?autoplay=1&&controls=0`}
                            ></iframe>
                        </div>
                    </div>
                </div>
                <div className={styles.playerMiddle}>
                    <div className={styles.bar}></div>
                    <div
                        className={styles.dot}
                        style={{ left: `${playState}%` }}
                    ></div>
                </div>
                <div className={styles.playerBottom}>
                    <div className={styles.info}>
                        <div className={styles.title}>{title}</div>
                        <div className={styles.singer}>{singer}</div>
                    </div>
                    <div className={styles.player}>
                        {nowIdx !== 0 ? (
                            <div onClick={() => setNowIdx(nowIdx - 1)}>◁◁</div>
                        ) : (
                            <div></div>
                        )}
                        <div onClick={() => setIsPlay(!isPlay)}>
                            {isPlay ? 'II' : '▷'}
                        </div>
                        {nowIdx !== 49 ? (
                            <div onClick={() => setNowIdx(nowIdx + 1)}>▷▷</div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Music;
