import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import he from "he";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function Swiper2({ data }) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [currplaying, setCurrplaying] = useState(0);

  const playSong = (index) => {
    setCurrplaying(index);
  };
  const decodeEntities = (str) => {
    return he.decode(str);
  };
  return (
    <>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >

        {data !== null &&
          data !== undefined &&
          data.map((element, index) => (
            <div key={index} className="song" onClick={() => playSong(index)}>
            <SwiperSlide  >
              <img src={element.img} height={"70%"} alt={element.name} onClick={() => playSong(index)} />
              <p onClick={() => playSong(index)}>{decodeEntities(element.name)}</p>
            </SwiperSlide>
            </div>
            
          ))}
      </Swiper>
    </>
  );
}
