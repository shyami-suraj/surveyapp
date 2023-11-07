import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const FileUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
      });
  
      if (!result.canceled) {
        setSelectedImage(result.uri);
      }
    };
  
    return (
      <View>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </View>
    );
  };
  
  export default FileUpload;
  