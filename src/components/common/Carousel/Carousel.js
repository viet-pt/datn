import React from 'react';
import Swiper from 'react-id-swiper';

const params = {
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  loop: true
}

const Carousel = ({ list }) => {
  return (
    <Swiper {...params}>
      {list.map((item, index) => (
        <img
          src={item.img}
          alt="img"
          key={index}
        />
      ))}
    </Swiper>
  )
}

export default React.memo(Carousel);