import { FC } from "react";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";

interface IProps {
  rating: number;
}

const Rating: FC<IProps> = ({ rating }) => {
  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < remainingStars; i++) {
      stars.push(<TiStarOutline key={`empty-${i}`} />);
    }

    if (hasHalfStar) {
      stars.push(<TiStarHalfOutline key="half" />);
    }

    for (let i = 0; i < fullStars; i++) {
      stars.push(<TiStarFullOutline key={i} />);
    }

    return stars;
  };

  return <div className="flex text-orange-500">{renderStarRating(rating)}</div>;
};

export default Rating;
