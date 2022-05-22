import { Avatar as ChakraAvatar, AvatarProps } from '@chakra-ui/react';
import getImageUrl from 'utils/getImageUrl';

const Avatar: React.FC<AvatarProps> = ({ src, name, size, boxSize, objectFit, borderRadius, mr, ...rest }) => {
  return (
    <ChakraAvatar
      src={getImageUrl(src as string)}
      name={name}
      {...rest}
      size={size ?? 'md'}
      boxSize={boxSize ?? '32px'}
      objectFit={objectFit ?? 'cover'}
      mr={mr ?? 1}
      borderRadius={borderRadius ?? '10px'}
    />
  );
};
export default Avatar;
