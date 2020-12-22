import React from 'react';
import {UploadPhotos} from './UploadPhotos';
import {PhotoGallery} from './PhotoGallery';
import {View, Text, Image, Button, Platform, ScrollView} from 'react-native';

export default class App extends React.Component {
  state = {
    screen: 'main',
    url: '',
  };
  navigate(screen) {
    this.setState({screen});
  }

  getScreen() {
    switch (this.state.screen) {
      default:
      case 'main':
        return (
          <View
            style={{
              paddingTop: 40,
              paddingBottom: 40,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button
              title="Upload Photo"
              onPress={() => this.navigate('upload')}
            />
            <Button
              title="Photo gallery"
              onPress={() => this.navigate('gallery')}
            />
          </View>
        );
      case 'upload':
        return (
          <UploadPhotos
            back={() => this.navigate('main')}
            success={(url) => {
              this.setState({url});
              this.navigate('prisma');
            }}
          />
        );
      case 'prisma':
        return (
          <View
            style={{
              backgroundColor: '#000',
              paddingTop: 40,
              paddingBottom: 40,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                padding: 20,
                width: '100%',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Button title="Back" onPress={() => this.navigate('main')} />
            </View>
            <Image
              source={{uri: this.state.url}}
              style={{width: 400, height: 400}}
            />
          </View>
        );
      case 'gallery':
        return (
          <PhotoGallery
            back={() => this.navigate('main')}
            select={(url) => {
              this.setState({url});
              this.navigate('prisma');
            }}
          />
        );
    }
  }

  render() {
    return this.getScreen();
  }
}
