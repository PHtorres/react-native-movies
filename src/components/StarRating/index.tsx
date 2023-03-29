import { ReactNode } from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, sizes } from '../../shared/styles';
import { styles } from './styles';

interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  function getStars() {
    const stars: ReactNode[] = [];
    const roundedRating = Math.round(rating) / 2;
    for (let index = 0; index < 5; index++) {
      if (roundedRating > index && roundedRating < index + 1) {
        stars.push(<HalfStar key={index} />);
        continue;
      }

      if (roundedRating > index) {
        stars.push(<Star key={index} />);
        continue;
      }

      if (roundedRating <= index) {
        stars.push(<EmptyStar key={index} />);
        continue;
      }
    }
    return stars;
  }

  return <View style={styles.container}>{getStars().map(star => star)}</View>;
}

const starIconProps = {
  color: colors.primary,
  size: sizes.xl,
};

function Star() {
  return <Ionicons name="star" {...starIconProps} />;
}

function HalfStar() {
  return <Ionicons name="star-half" {...starIconProps} />;
}

function EmptyStar() {
  return <Ionicons name="star-outline" {...starIconProps} />;
}
