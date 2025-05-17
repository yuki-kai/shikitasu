import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Dimensions, TouchableOpacity, useColorScheme } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { FrameContext } from '@/contexts/FrameContext';
import { Frames } from '@/constants/Frames';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function FrameScreen() {
  const { key }: { key: keyof typeof Frames } = useLocalSearchParams();
  const { getFrame } = useContext(FrameContext);
  const frame = getFrame(key);

  const [selectedImage, setSelectedImage] = useState<null | string>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });
 
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      Image.getSize(result.assets[0].uri, (width, height) => {
        // 画面の幅に合わせて高さを調整し、アスペクト比を維持
        const screenWidth = Dimensions.get('window').width * 0.9;
        const scaleFactor = screenWidth / width;
        const scaledHeight = height * scaleFactor;
        console.log(screenWidth);
        console.log(scaledHeight);
        setDimensions({ width: screenWidth, height: scaledHeight });
      }, (error) => {
        console.error('Failed to get image size:', error);
      });
    } else {
      alert("画像が選択されていません");
    }
  };

  return (
    <View style={styles.container}>
      <View style={selectedImage
        ? {...styles.selectedImageContainer, ...dimensions}
        : {...styles.placeholderContainer}}
      >
        <View style={styles.placeholderFrame}>{frame.element}</View>
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            style={styles.image}
          />
        ) : (
          <TouchableOpacity onPress={pickImageAsync} style={styles.selectPhotoIcon}>
            <FontAwesome name="photo" size={120} color="#666" />
            <Text style={styles.placeholderText}>写真を選択してください</Text>
          </TouchableOpacity>
        )}
      </View>
      {selectedImage && (<Button title="写真を削除" onPress={() => setSelectedImage(null)} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  selectedImageContainer: {
    position: 'relative',
  },
  image: {
    position: 'absolute',
    resizeMode: 'contain',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  placeholderContainer: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 8,
    height: 264,
    width: 396,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderFrame: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,
    pointerEvents: 'none',
  },
  selectPhotoIcon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    marginTop: 10,
    color: '#666',
  },
});
