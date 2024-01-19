import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

import {commonStyles} from '../../utility/commonStyles';
import {Colors} from '../../utility/Colors';
import Card from './components/Card';
import Item from './components/Item';
import Line from '../../components/line/Line';
import OnlineCard from './components/OnlineCard';
import BackButton from './components/BackButton';
import Spacing from '../../components/spacing/Spacing';
import {MainRouteScreenProps} from '../../routes/types';
import ReAnimModal from '../../components/modal/ReAnimModal';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utility/constants';
import EditSheet from './components/EditSheet';

interface ProfileScrenProps extends MainRouteScreenProps<'Profile'> {}

export default function ProfileMainScreen({navigation}: ProfileScrenProps) {
  const [open, setOpen] = useState(false);
  const [editImage, setEditImage] = useState('');
  const [passOnImage, setPassOnImage] = useState<{
    uri?: string;
    width: number;
    height: number;
    actaulWidth: number;
    actualHeight: number;
    x: number;
    y: number;
  }>({
    uri: undefined,
    width: 0,
    height: 0,
    actaulWidth: 0,
    actualHeight: 0,
    x: 0,
    y: 0,
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const onSaveHandler = (
    width: number,
    height: number,
    actaulWidth: number,
    actualHeight: number,
    x: number,
    y: number,
  ) => {
    handleClose();
    setPassOnImage({
      ...passOnImage,
      uri: editImage,
      width,
      height,
      actaulWidth,
      actualHeight,
      x,
      y,
    });
  };

  const openImagePicker = async () => {
    try {
      const option: ImageLibraryOptions = {
        mediaType: 'photo',
      };
      const imageRes: ImagePickerResponse = await launchImageLibrary(option);
      setEditImage(imageRes.assets![0].uri!);
      handleOpen();
    } catch (error) {
      // console.log('Error message', error.message);
    }
  };

  return (
    <View style={[commonStyles.flexOne]}>
      <View style={[commonStyles.flexOne, styles.container]}>
        <Card
          image={passOnImage}
          navigation={navigation}
          openImagePicker={openImagePicker}
        />
        <Item name="Vikil25" />
        <Line />
        <OnlineCard />
        <Line />
        <Item name="Busy" />
        <Line />
        <View style={[commonStyles.flexOne]} />
        <BackButton navigation={navigation} />
        <Spacing size={5} />
      </View>
      <EditSheet
        image={editImage}
        show={open}
        hide={handleClose}
        onSave={onSaveHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
