import { Carousel } from "flowbite-react";
const MyCarousel = () => {
  return (
    <div className="h-56 mt-16 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img className="h-56" src="../../assets/c1.png" alt="carousel1" />
        <img src="../../assets/c2.jpg" alt="carousel2" />
        <img className="h-full" src="../../assets/c4.jpg" alt="carousel3" />
      </Carousel>
    </div>
  );
};

export default MyCarousel;
