import {StyleSheet, View, Image, ImageStyle, ImageProps} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import {SCREEN_WIDTH} from '../../utility/constants';

// interface LayoutProperties<
//   T extends undefined | number,
//   K extends undefined | number,
// > {
//   fixedWidth: T;
//   fixedHeight: K;
// }

// interface FixedLayoutProperties extends LayoutProperties<number, number> {}

interface ImageLayout {
  width?: number;
  height?: number;
}

interface LayoutProperties {
  isFixedWidth: boolean;
  fixedWidth?: number;
  fixedHeight?: number;
}

interface FleggedImageProps extends LayoutProperties, Partial<ImageProps> {
  image: string;
}

export default function FleggedImage({
  image,
  isFixedWidth,
  fixedHeight,
  fixedWidth,
  source,
  ...props
}: FleggedImageProps) {
  const [loader, setLoader] = useState(true);
  const [imageLayout, setImageLayout] = useState<ImageLayout>({
    width: 1,
    height: 1,
  });

  const style: ImageStyle = useMemo(
    () => ({
      width: isFixedWidth ? fixedWidth : undefined,
      height: !isFixedWidth ? fixedHeight : undefined,
      aspectRatio: isFixedWidth
        ? imageLayout.width! / imageLayout.height!
        : imageLayout.height! / imageLayout.width!,
    }),
    [imageLayout, isFixedWidth],
  );

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

  return (
    <Image {...props} style={[styles.container, style]} source={{uri: image}} />
  );
}

const styles = StyleSheet.create({
  container: {},
});
