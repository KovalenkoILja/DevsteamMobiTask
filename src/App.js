import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import {MainScreen, PhotoScreen} from './Components';

export default createAppContainer(
  createStackNavigator({
    Main: {screen: MainScreen},
    ShowPhoto: {screen: PhotoScreen},
  }),
);
