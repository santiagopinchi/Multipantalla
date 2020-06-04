/**
 * @format
 */
import React from 'react';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AlbumList from './src/components/AlbumList';
import PhotoList from './src/components/PhotoList';
import CommentList from './src/components/CommentList';
import Login from './src/components/Login';
import {Router, Scene, Stack} from 'react-native-router-flux';

// Create a component
const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="login" component={Login} title="Fake Login" initial={true} />
      <Scene key="albumList" component={AlbumList} title="Albums"/>
      <Scene key="photoList" component={PhotoList} title="Photos" />
      <Scene key="commentList" component={CommentList} title="Comments" />
    </Stack>
  </Router>
);

AppRegistry.registerComponent(appName, () => App);
