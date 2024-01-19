import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
} from 'react-native';
import React from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {commonStyles} from '../../../utility/commonStyles';
import {SCREEN_WIDTH} from '../../../utility/constants';
import {useBackHandler} from '../../../hooks/useBackHandler';
import Zoomer from '../../../components/zoomable/Zoomer';

interface HeaderProps {}

function Header({}: HeaderProps) {
  return (
    <View>
      <Text>Header</Text>
    </View>
  );
}

interface ImageModalProps {
  show: boolean;
  hide: () => void;
  image: {
    uri: string;
    width: number;
    height: number;
  };
}

export default function ImageModal({show, image, hide}: ImageModalProps) {
  useBackHandler(show, hide);
  return (
    <View
      style={[StyleSheet.absoluteFillObject, styles.container]}
      pointerEvents="box-none">
      {show && (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
          {/* Please complete this header */}
          {/* <Header /> */}
          <TouchableWithoutFeedback onPress={hide}>
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              style={[
                StyleSheet.absoluteFillObject,
                commonStyles.flexOne,
                styles.backDrop,
              ]}
            />
          </TouchableWithoutFeedback>
          <Animated.View style={[styles.box]}>
            <View style={[styles.otherPart]}>
              <Zoomer>
                <Image
                  onLayout={e =>
                    console.log('Image width height', e.nativeEvent.layout)
                  }
                  source={{uri: image.uri}}
                  style={[
                    styles.image,
                    {aspectRatio: image.width / image.height},
                  ]}
                  resizeMode="contain"
                />
              </Zoomer>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH,
  },
  otherPart: {},
  box: {},
  backDrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
