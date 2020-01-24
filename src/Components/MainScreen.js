import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';
import {url} from '../config';
import {styles} from './Styles';

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Unsplash Gallery',
    headerStyle: styles.headerStyle,
    headerTintColor: styles.headerTintColor,
    headerTitleStyle: styles.headerTitleStyle,
  };

  constructor() {
    super();

    this.state = {
      isLoading: true,
      images: [],
    };
  }

  componentDidMount = (): void => {
    this.loadWallpapers();
  };

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.goToImageScreen(item);
        }}>
        <View style={styles.gallery_container}>
          <ImageBackground
            source={{uri: item.urls.small}}
            style={styles.gallery_img}
          />
          <View style={styles.description_container}>
            <Text style={styles.description_text}>
              {item.likes} ♥ {'\t'}
              {item.alt_description}
              {'\n'}Author: {item.user.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  goToImageScreen = item => {
    const {navigate} = this.props.navigation;
    return navigate('ShowPhoto', {item});
  };

  loadWallpapers = () => {
    axios
      .get(url)
      .then(
        function(response) {
          console.log(response);
          this.setState({images: response.data, isLoading: false});
        }.bind(this),
      )
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        console.log('Request completed successfully');
      });
  };

  render() {
    return this.state.isLoading ? (
      <View style={styles.start_background}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    ) : (
      <View style={styles.flatListStyle}>
        <FlatList
          scrollEnabled={!this.state.isImageFocused}
          pagingEnabled
          data={this.state.images}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
