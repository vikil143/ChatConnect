import React, {useState, useRef} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {MainRouteScreenProps} from '../../routes/types';
import Header from './components/Header';
import {commonStyles} from '../../utility/commonStyles';
import MessageBox from './components/MessageBox';
import {isBothAreMatchedDates} from '../../utility/helpers';
import TypeBox from './components/TypeBox';
import {MessageData} from './types';
import ImageModal from './components/ImageModal';

interface ChatRoomScreenProps extends MainRouteScreenProps<'ChatRoom'> {}

const initData: MessageData[] = [
  {date: new Date(2023, 5, 26), message: 'ok', userId: 1},
  {date: new Date(2023, 5, 26), message: 'k', userId: 1},
  {
    date: new Date(2023, 5, 26),
    message: 'Hey that great looking awsome, what are going to talk about',
    userId: 2,
  },
  {date: new Date(2023, 5, 26), message: 'okok', userId: 2},
  {
    date: new Date(2023, 5, 26),
    message: 'Hey that great looking awsome, what are going to talk about',
    userId: 1,
  },
  {date: new Date(2023, 5, 26), message: 'Fine', userId: 1},
  {date: new Date(2023, 5, 24), message: 'and you?', userId: 2},
  {date: new Date(2023, 5, 24), message: 'Im fine', userId: 2},
  {date: new Date(2023, 5, 24), message: 'How r u?', userId: 1},
  {date: new Date(2023, 5, 24), message: 'Hello buddy', userId: 2},
  {date: new Date(2023, 5, 24), message: 'Hello guyz', userId: 1},
  {date: new Date(2023, 5, 23), message: 'Hey', userId: 2},
  {date: new Date(2023, 5, 22), message: 'Hey', userId: 1},
  {date: new Date(2023, 5, 21), message: 'Hey', userId: 2},
  // {date: new Date(2023, 5, 20), message: 'Hey', userId: 1},
  // {date: new Date(2023, 5, 19), message: 'Hey', userId: 2},
  // {date: new Date(2023, 5, 18), message: 'Hey', userId: 1},
  // {date: new Date(2023, 5, 17), message: 'Hey', userId: 2},
  // {date: new Date()},
];

function ChatRoomScreen({route, navigation}: ChatRoomScreenProps) {
  let date = useRef(new Date());
  const [data, setData] = useState([...initData]);
  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState<{
    uri: string;
    width: number;
    height: number;
  }>({
    uri: '',
    width: 1,
    height: 1,
  });
  const {color, username} = route.params;

  const goBack = () => navigation.goBack();

  const sendMessage = (msgObj: MessageData) => setData([msgObj, ...data]);

  const handleShowImage = (image: {
    uri: string;
    width: number;
    height: number;
  }) => {
    setModalImage(image);
    setModal(true);
  };

  const hideModal = () => setModal(false);

  return (
    <View style={[commonStyles.flexOne]}>
      <Header {...{color, navigation, username}} onPress={goBack} />
      <View style={[commonStyles.flexOne]}>
        <FlatList
          data={data}
          inverted
          renderItem={({item, index}) => {
            // Just rewrite this to know coder very well
            let isSameDate = isBothAreMatchedDates(item.date, date.current);
            date.current = !isSameDate ? item.date : date.current;
            return (
              <MessageBox
                index={index}
                data={data}
                color={color}
                message={item.message}
                image={item.image}
                userId={item.userId}
                date={item.date}
                isCurrentUser={item.userId === 1}
                isShowDate={!isSameDate}
                isLastDate={data.length - 1 === index}
                isNotFirst={index !== 0}
                showImage={handleShowImage}
              />
            );
          }}
        />
        <TypeBox color={color} sendMessage={sendMessage} />
      </View>
      <ImageModal image={modalImage!} show={modal} hide={hideModal} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default ChatRoomScreen;
