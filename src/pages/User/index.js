import React from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

export default function User(props) {
  const { navigation } = props;

  console.tron.log('console dentro do user', navigation.getParam('user'));

  return <View />;
}
