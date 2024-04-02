import React, { useEffect, useState } from 'react';
import './App.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import ClockA from './components/clockA/clockA';
import ClockD from './components/clockD/clockD';
import ClockD2 from './components/clockD2/clockD2';
import Calendar from './components/calendar/calendar';
import Photo from './components/photo/photo';
import Music from './components/music/music';

type ScreenModeType = 'vertical' | 'horizontal';

function App() {
    const [screenMode, setScreenModeType] =
        useState<ScreenModeType>('vertical');
    const isPortrait = screenMode === 'vertical';

    const screenSensor = () => {
        setScreenModeType(
            window.matchMedia('(orientation: portrait)').matches
                ? 'horizontal'
                : 'vertical',
        );
    };

    useEffect(() => {
        screenSensor();
    }, []);

    // 창의 사이즈가 바뀔때마다 검사하여 스크립트 실행
    window.addEventListener('resize', function () {
        screenSensor();
    });

    return (
        <div className="App">
            <div className="objWrap">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    direction={screenMode}
                    pagination={true}
                    modules={[Pagination]}
                >
                    <SwiperSlide>
                        <ClockA />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ClockD />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ClockD2 />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="objWrap">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    direction={screenMode}
                    pagination={true}
                    modules={[Pagination]}
                >
                    <SwiperSlide>
                        <Calendar />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Photo />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Music />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}

export default App;
