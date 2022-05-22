import { Avatar, Box, Button, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { defaultImgAvatar } from 'common';
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import getCroppedImage from '../../../../common/cropImage';

interface EditAvatarBoxProps {
  value: any;
  onUploadImg: (image: any) => Promise<void>;
  loadingImg: boolean;
}

const StyledWrapper = styled.div`
  .drop-zone__container {
    outline: none;
  }
  .drop-zone {
    height: 120px;
    margin-bottom: 8px;
    border: 2px dashed #ccc;
    position: relative;
    text-align: center;
    padding: 10px 0;
    &--active {
      border-color: green;
    }
  }
`;

export default function EditAvatarBox({ value, onUploadImg, loadingImg }: EditAvatarBoxProps) {
  const [editMode, setEditMode] = React.useState(false);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<null | Area>(null);
  const [zoom, setZoom] = React.useState(1);

  const onDrop = React.useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      setEditMode(true);
      onUploadImg(file);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop,
    noClick: true,
  });

  const onPressDone = React.useCallback(() => {
    async function cropImage() {
      setEditMode(false);
      const imageURL = value instanceof Blob ? URL.createObjectURL(value) : value;
      const image = await getCroppedImage(imageURL, croppedAreaPixels as Area);
      onUploadImg(image);
    }
    cropImage();
  }, [croppedAreaPixels]);

  const image: any = value ? value : defaultImgAvatar;

  const imageUrl = image instanceof Blob ? URL.createObjectURL(image) : image;

  return (
    <StyledWrapper>
      <div className={`drop-zone__container ${editMode ? 'w-full' : 'w-8/12 mx-auto'}`} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={`drop-zone ${isDragActive && 'drop-zone--active'}`}>
          {editMode ? (
            <Cropper
              image={imageUrl}
              aspect={1}
              crop={crop}
              zoom={zoom}
              onCropChange={setCrop}
              onCropComplete={(croppedArea, croppedAreaPixels) => {
                setCroppedAreaPixels(croppedAreaPixels);
              }}
            />
          ) : (
            <Avatar size="xl" borderRadius="0px" src={imageUrl} objectFit="cover" background="transparent" />
          )}
        </div>
      </div>
      {editMode && (
        <Slider min={1} max={3} step={0.1} value={zoom} onChange={val => setZoom(val)}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb bgColor={'blue.400'} />
        </Slider>
      )}
      <Box fontSize={'sm'} mt={2} color={'white'} px={5} display={'flex'} justifyContent="center">
        <Button
          type="button"
          textTransform={'capitalize'}
          borderRadius={0}
          fontSize={'sm'}
          height={'1.5rem'}
          onClick={open}
          mr={5}
          mx={`${editMode ? '' : 'auto'}`}
          isLoading={loadingImg}
        >
          Upload New
        </Button>

        {editMode ? (
          <Button
            type="button"
            textTransform={'capitalize'}
            borderRadius={0}
            fontSize={'sm'}
            height={'1.5rem'}
            onClick={onPressDone}
            disabled={loadingImg}
          >
            Done
          </Button>
        ) : (
          !!value &&
          value instanceof Blob && (
            <Button
              type="button"
              textTransform={'capitalize'}
              borderRadius={0}
              fontSize={'sm'}
              height={'1.5rem'}
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
          )
        )}
      </Box>
    </StyledWrapper>
  );
}
