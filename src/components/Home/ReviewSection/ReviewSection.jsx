import React from 'react'
import styles from './reviewSection.module.scss'
import CustomerCards from './CustomerCards'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { reviews } from '../../../constants/data';

const ReviewSection = () => {
  SwiperCore.use([Autoplay, Pagination, Navigation]);

  return (
  <section className={styles.section}>  
    <h2 className={styles.title}>
        What they say about us 
    </h2>

    <Swiper
      className={"review-slider"}
      slidesPerGroup={1}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 1700,
        waitForTransition: true,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={750}
      navigation
      pagination={{
        clickable: true,
      }}
    > 
    {
      reviews.map(el => ( 
        <SwiperSlide key={el.key}>
        <CustomerCards el={el}/>
      </SwiperSlide>
      ))
    }
    </Swiper>

  </section>
  )
}

export default ReviewSection