import React from 'react';
import {View, Image} from 'react-native';

import {styles} from './Styles';

export default class PhotoScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `${
      navigation.state.params.item.alt_description === null
        ? 'Image'
        : navigation.state.params.item.alt_description
    }`,
    headerStyle: styles.headerStyle,
    headerTintColor: styles.headerTintColor,
    headerTitleStyle: styles.headerTitleStyle,
  });

  render() {
    return (
      <View style={styles.photo_container}>
        <Image
          source={{uri: this.props.navigation.state.params.item.urls.regular}}
          style={styles.single_photo}
        />
      </View>
    );
  }
}
