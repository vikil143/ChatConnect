import {BackHandler, NativeEventSubscription} from 'react-native';
import {useEffect} from 'react';

const useBackHandler = (show: boolean, hide: () => void) => {
  useEffect(() => {
    let buttonlistner: NativeEventSubscription;
    if (show) {
      buttonlistner = BackHandler.addEventListener('hardwareBackPress', () => {
        hide();
        return true;
      });
    } else {
      buttonlistner!?.remove();
    }

    return () => {
      buttonlistner?.remove();
    };
  }, [show, hide]);
};

export {useBackHandler};
