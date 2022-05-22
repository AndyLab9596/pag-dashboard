import config from 'config';
import { defaultImgAvatar } from 'common';

const getImageUrl = (path?: string) => {
  return path ? (/^https?:\/\//.test(path) ? path : `${config.BASE_IMAGE_URL}${path}`) : defaultImgAvatar;
};

export default getImageUrl;
