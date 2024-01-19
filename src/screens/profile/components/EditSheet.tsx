import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ReAnimModal from '../../../components/modal/ReAnimModal';
import {commonStyles} from '../../../utility/commonStyles';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../utility/constants';
import {Colors} from '../../../utility/Colors';
import FleggedImage from '../../../components/image/FleggedImage';
import Spacing from '../../../components/spacing/Spacing';
import EditSquare from './EditSquare';

interface FooterProps {
  onCancel: () => void;
  onSave: () => void;
}

function Footer({onCancel, onSave}: FooterProps) {
  return (
    <View style={[styles.footer]}>
      <Spacing />
      <Text style={[styles.cancel]} onPress={onCancel}>
        Cancel
      </Text>
      <View style={[commonStyles.flexOne]} />
      <Text style={[styles.save]} onPress={onSave}>
        Save
      </Text>
      <Spacing />
    </View>
  );
}

interface EditSheetProps {
  show: boolean;
  image: string;
  hide: () => void;
  onSave: (
    width: number,
    height: number,
    actaulWidth: number,
    actualHeight: number,
    x: number,
    y: number,
  ) => void;
}

export default function EditSheet({show, image, hide, onSave}: EditSheetProps) {
  const [clampedValued, setClampedValued] = useState({
    width: 0,
    height: 0,
  });

  const [saveValues, setSavedValues] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const onGestureStop = (width: number, height: number, x: number, y: number) =>
    setSavedValues({width, height, x, y});

  const handleOnSave = () =>
    onSave(
      saveValues.width,
      saveValues.height,
      clampedValued.width,
      clampedValued.height,
      saveValues.x,
      saveValues.y,
    );

  return (
    <ReAnimModal
      show={show}
      hide={hide}
      containerStyle={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT, flex: 1}}
      style={{flex: 1}}>
      <View style={[commonStyles.flexOne, styles.modalContainer]}>
        <View style={[commonStyles.alignCenter]}>
          <FleggedImage
            isFixedWidth
            fixedWidth={SCREEN_WIDTH - 20}
            image={image}
            onLayout={e =>
              setClampedValued({
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height,
              })
            }
          />
          {/* Added because to get clamped value first */}
          {!!clampedValued.height && (
            <EditSquare
              imageWidth={clampedValued.width}
              imageHeight={clampedValued.height}
              size={SCREEN_WIDTH - 20}
              onStop={onGestureStop}
            />
          )}
        </View>
        <Footer onCancel={hide} onSave={handleOnSave} />
      </View>
    </ReAnimModal>
  );
}

const styles = StyleSheet.create({
  save: {
    color: '#fff',
    fontWeight: '800',
  },
  cancel: {
    color: '#fff',
    fontWeight: '800',
  },
  footer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  image: {
    // width: SCREEN_WIDTH,
    // aspectRatio: 1,
  },
  modalContainer: {
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
