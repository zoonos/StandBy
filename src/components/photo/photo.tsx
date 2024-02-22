import {useState} from "react";
import styles from './photo.module.css';
import useInterval from "../../hooks/useInterval";

function Photo() {

    const list = [{
        idx:1,
        src: 'https://mblogthumb-phinf.pstatic.net/MjAyMzA1MDFfMjY2/MDAxNjgyOTMxMjcxMDIw.4i57QHWWv3kZ0xtcjFeMn-L6Zbl04pvK7rsMIEg_0FQg.B3xS6fuxuDv-S7-6hbIqkrSOv_OBOyFSBHQ-tL1qW_gg.PNG.kws3128pdm/%EC%A0%9C%EB%AA%A9%EC%9D%84_%EC%9E%85%EB%A0%A5%ED%95%98%EC%84%B8%EC%9A%94_(2).png?type=w800'
    }]

    return(
        <div className='itemWrap'>
            <div className={styles.photoWrap}>
                <img src={list[0].src}/>
            </div>
        </div>
    )
}
export default Photo;