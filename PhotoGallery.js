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

export const PhotoGallery = (props) => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch('https://immersive-monitoring-monolith.herokuapp.com/', {
      method: 'GET',
    })
      .then(async (response) => {
        console.log(response);
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          setData(data.resources.map((item) => item.url));
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .catch((error) => {
        console.log('upload error', error);
        alert('Upload failed!');
      });
  }, []);

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
          <Button title="Back" onPress={props.back} />
        </View>
        {data.map((item) => (
          <View
            key={item}
            style={{
              paddingTop: 40,
              paddingBottom: 20,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={{uri: item}} style={{width: 300, height: 300}} />
            <Button title="Select" onPress={() => props.select(item)} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
