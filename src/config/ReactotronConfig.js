import Reactotron from 'reactotron-react-native';

let tron = null;

if (__DEV__ && !tron) {
  tron = Reactotron.configure()
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
