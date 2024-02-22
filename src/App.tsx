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

function App() {  

  const [screen, setScreen] = useState('');

  let screenSensor = () => {
    if (window.matchMedia('(orientation: portrait)').matches) {
      // Portrait 모드일 때 실행할 스크립트
      // 폭과 높이가 같으면 Portrait 모드로 인식돼요
      setScreen('portrait');
    } else {
      // Landscape 모드일 때 실행할 스크립트
      setScreen('landscape');
    }
  }

  // 가져오기 성공
function getSuccess(position:PositionCallback) {
  // 위도
  // const lat = position.coords.latitude;
  // 경도
  // const lng = position.coords.longitude;

  const {lat, lng} = position.coord;
  // 위도 경도 오차(m)
  const accuracy = Math.floor(position.coords.accuracy);

  console.log(lat, lng, accuracy)
}

// 가지오기 실패(거부)
function getError() {
  alert('Geolocation Error'); 
}

	useEffect(()=>{
    screenSensor();
    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(getSuccess, getError);
  },[]);

  // 창의 사이즈가 바뀔때마다 검사하여 스크립트 실행
  window.addEventListener('resize', function () {
    screenSensor();
  });

  return (
    <div className="App">
      <div className='objWrap'>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          direction={screen === 'portrait' ? 'horizontal' : 'vertical'}
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
      <div className='objWrap'>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          direction={screen === 'portrait' ? 'horizontal' : 'vertical'}
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
