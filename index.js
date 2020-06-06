import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { Provider as PaperProvider, Appbar } from 'react-native-paper';

import AlbumList from './src/components/AlbumList';
import PhotoList from './src/components/PhotoList';
import CommentList from './src/components/CommentList';

import {Router, Scene, Stack} from 'react-native-router-flux';
import { useTheme } from 'react-native-paper';

const App = () => {

  const { colors } = useTheme();

  const navigationBarStyle = {
    backgroundColor: colors.primary
  };

  const titleStyle =  {
    color: colors.background
  };

  return (
    <PaperProvider>
      <Router navigationBarStyle={navigationBarStyle} titleStyle={titleStyle} tintColor={colors.background}>
        <Stack key="root">
          <Scene
            key="albumList"
            component={AlbumList}
            title="Albums"
            initial={true}
          />
          <Scene key="photoList" component={PhotoList} title="Photos" />
          <Scene key="commentList" component={CommentList} title="Comments" />
        </Stack>
      </Router>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => App);
