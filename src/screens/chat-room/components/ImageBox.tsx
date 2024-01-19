import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageStyle,
  ImageResizeMode,
  ViewStyle,
} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../utility/constants';
import OpacityButton from '../../../components/touchables/OpacityButton';

interface ImageLayout {
  width: number;
  height: number;
}

interface ImageBoxProps {
  image: string;
  showImage: (image: {uri: string; width: number; height: number}) => void;
}

const ImageBox = ({image, showImage}: ImageBoxProps) => {
  const [loader, setLoader] = useState(true);
  const [imageLayout, setImageLayout] = useState<ImageLayout>({
    width: 1,
    height: 1,
  });

  // Conditions to fix width in the box
  // greater half max width

  const MAX_BOX = SCREEN_HEIGHT / 2;
  const MAX_HEIGHT = MAX_BOX * 0.8;
  const MAX_WIDTH = SCREEN_WIDTH * 0.75;
  const calculatedHeight = useMemo(
    () =>
      imageLayout.height > MAX_HEIGHT
        ? MAX_HEIGHT
        : (MAX_HEIGHT * imageLayout.width) / imageLayout.height,
    [imageLayout],
  );
  const resizeMode: ImageResizeMode =
    imageLayout.height > MAX_HEIGHT ? 'contain' : 'center';
  const imageStyle: ImageStyle = {
    height: calculatedHeight,
    width: MAX_WIDTH,
  };

  const containeStyle: ViewStyle = {
    height: calculatedHeight,
    width: MAX_WIDTH,
    borderRadius: 5,
    backgroundColor: 'black',
  };

  useEffect(() => {
    getImage();
  }, []);

  const getImage = () => {
    Image.getSize(image, (width, height) => {
      setImageLayout({
        width,
        height,
      });
      setLoader(false);
    });
  };

  const handleShowImage = () =>
    showImage({
      uri: image,
      width: imageLayout.width,
      height: imageLayout.height,
    });

  return (
    <View style={[containeStyle]}>
      <OpacityButton onPress={handleShowImage}>
        <Image
          source={{uri: image}}
          style={[styles.image, imageStyle]}
          resizeMode={resizeMode}
        />
      </OpacityButton>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {},
});

export default ImageBox;
