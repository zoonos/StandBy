import {useState, useEffect} from "react";
import styles from './music.module.css';
import useInterval from "../../hooks/useInterval";

function Music() {

    const [list, setList] = useState<any[]>([]);
  	const [nowIdx, setNowIdx] = useState(0);

    useEffect(() => {
        const fetchData = async() => {
            const res = await fetch('https://www.googleapis.com/youtube/v3/playlistItems?playlistId=PLFgquLnL59alGJcdc0BEZJb2p7IgkL0Oe&part=snippet&maxResults=10&key=AIzaSyCcdfK8HnLp6hk0YndzM70EUw05O-dFwRk');
            const result = res.json();
            // console.log(result)
            return result;
        }
      
        fetchData().then(res => {
            console.log(res.items[0].snippet)
            setList(res.items)
        });
  }, []);

  useEffect(() => {},[nowIdx])

    return(
        <div className='itemWrap'>
            <div className={styles.wrap}>
                <div className={styles.playerTop}>
                    <div className={styles.record}>
                        <div className={styles.recordImg}>
                            {
                                list.length !== 0 ?
                                <>
                                    {/* <img src={list[nowIdx].snippet.thumbnails.standard.url}/> */}
                                    {/* <iframe src="https://www.youtube.com/embed/VsJHVonN3T0?si=CFbJqVM1sifnq5oj" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}
                                    {/* <iframe src="https://www.youtube.com/embed/VsJHVonN3T0?si=mNl8Hjtff5bV_AuX&amp;controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}
                                    <iframe src={`https://www.youtube.com/embed/${list[nowIdx].snippet.resourceId.videoId}?autoplay=1&mute=1&controls=0`}></iframe>
                                </>
                                :<></>
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.playerBottom}>
                    <div className={styles.info}>
                        {
                            list.length !== 0?
                            <>
                                <div className={styles.title}>{list[nowIdx].snippet.title}</div>
                                <div className={styles.singer}>{(list[nowIdx].snippet.videoOwnerChannelTitle).split('-')[0]}</div>
                            </>
                            : <></>
                        }
                    </div>
                    <div className={styles.player}>
                        <div>◁</div>
                        <div>II</div>
                        <div>▷</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Music;