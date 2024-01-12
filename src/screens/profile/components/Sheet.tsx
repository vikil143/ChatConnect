import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomSheet from '../../../components/modal/BottomSheet';
import PrimaryOpacityButton from '../../../components/buttons/PrimaryOpacity';
import {commonStyles} from '../../../utility/commonStyles';
import Input from '../../../components/input/Input';
import Spacing from '../../../components/spacing/Spacing';

interface SheetProps {
  show: boolean;
  name: string;
  setName: (name: string) => void;
  hide: () => void;
}

export default function Sheet({show, name, setName, hide}: SheetProps) {
  const [value, setValue] = useState(name);

  useEffect(() => {
    setValue(name);
  }, [name]);

  const handleChange = () => {
    setName(value);
    hide();
  };

  return (
    <BottomSheet show={show} hide={hide}>
      <View style={[styles.container]}>
        <Spacing />
        <View style={[commonStyles.pA10]}>
          <Input value={value} onChangeText={setValue} />
        </View>
        <View style={[commonStyles.pA10]}>
          <PrimaryOpacityButton title="Save" onPress={handleChange} />
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {},
});
