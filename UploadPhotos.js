import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const photos = [
  {text: 'Front photo', key: 'photo1'},
  {text: 'Back photo', key: 'photo3'},
  {text: 'Left photo', key: 'photo4'},
  {text: 'Right photo', key: 'photo2'},
];

export class UploadPhotos extends React.Component {
  state = {
    photo1: null,
    photo2: null,
    photo3: null,
    photo4: null,
  };

  createFormData = (photos) => {
    const data = new FormData();
    photos.map((item, index) => {
      data.append('image' + (index + 1), {
        name: item.fileName,
        type: item.type,
        uri:
          Platform.OS === 'android'
            ? item.uri
            : item.uri.replace('file://', ''),
      });
    });

    return data;
  };

  handleChoosePhoto = (photo) => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({[photo]: response});
      }
    });
  };
  handleUploadPhoto = () => {
    console.log(
      this.createFormData([
        this.state.photo1,
        this.state.photo2,
        this.state.photo3,
        this.state.photo4,
      ]),
    );
    fetch('https://immersive-monitoring-monolith.herokuapp.com/', {
      method: 'POST',
      body: this.createFormData([
        this.state.photo1,
        this.state.photo2,
        this.state.photo3,
        this.state.photo4,
      ]),
    })
      .then(async (response) => {
        console.log(response);
        if (response.status === 200) {
          const data = await response.json();
          console.log('upload succes', data);
          Alert.alert(
            'Upload success',
            'Prepare prisma',
            [{text: 'OK', onPress: () => this.props.success(data.url)}],
            {cancelable: false},
          );
          this.setState({photo: null});
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .catch((error) => {
        console.log('upload error', error);
        alert('Upload failed!');
      });
  };

  render() {
    return (
      <ScrollView>
        <View
          style={{
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
            <Button title="Back" onPress={this.props.back} />
          </View>
          {photos.map((item) => (
            <View
              key={item.key}
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontWeight: '600', fontSize: 20}}>{item.text}</Text>
              {this.state[item.key] && (
                <>
                  <Image
                    source={{uri: this.state[item.key].uri}}
                    style={{width: 300, height: 300}}
                  />
                </>
              )}
              <Button
                title="Choose Photo"
                onPress={() => this.handleChoosePhoto(item.key)}
              />
            </View>
          ))}
          {this.state.photo1 &&
            this.state.photo2 &&
            this.state.photo3 &&
            this.state.photo4 && (
              <Button title="Upload Photo" onPress={this.handleUploadPhoto} />
            )}
        </View>
      </ScrollView>
    );
  }
}
