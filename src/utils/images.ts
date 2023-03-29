import { TMDB_IMAGE_URL } from 'react-native-dotenv';
const TMDB_IMAGE_WIDTH = 200;

export function getImageUrl(imagePath: string) {
  return [TMDB_IMAGE_URL, `/w${TMDB_IMAGE_WIDTH}`, imagePath].join("");
}
