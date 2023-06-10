import React, { ReactNode } from "react";
import useEmblaCarousel, { type EmblaOptionsType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ImageByIndex from "./ImageByIndex";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

export const ImageSlider: React.FC<PropType> = (props) => {
  const { options, slides } = props;
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((index) => (
          <div className="embla__slide" key={index}>
            <img
              className="h-full w-full rounded-xl object-cover lg:h-full lg:w-full"
              src={ImageByIndex(index)}
              alt="Extreme sport photo"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
