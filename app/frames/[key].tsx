import React, { useContext, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Dimensions, TouchableOpacity, useColorScheme } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FrameContext } from '@/contexts/FrameContext';
import { Frames } from '@/constants/Frames';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { captureRef } from 'react-native-view-shot';

export default function FrameScreen() {
  const router = useRouter();
  const { key }: { key: keyof typeof Frames } = useLocalSearchParams();
  const { getFrame } = useContext(FrameContext);
  const frame = getFrame(key);
  const imageRef = useRef<View>(null);

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
        setDimensions({ width: screenWidth, height: scaledHeight });
      }, (error) => {
        console.error('Failed to get image size:', error);
      });
    }
  };

  const downloadImage = async () => {
    try {
      const imageUri = await captureRef(imageRef, { quality: 1 });
      if (!imageUri) {
        throw new Error('画像が選択されていません');
      }
      await MediaLibrary.saveToLibraryAsync(imageUri);
      setSelectedImage(null);
      alert('カメラロールに保存しました');
      // TODO: 保存した画像を表示して遷移したい
      router.back();
    } catch (error) {
      console.error('保存に失敗しました', error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        ref={imageRef}
        collapsable={false}
        style={selectedImage
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

      {selectedImage && (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={pickImageAsync}
              style={styles.button}
            >
              <Text style={styles.buttonText}>写真を変える</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedImage(null)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>写真を消す</Text>
            </TouchableOpacity>
          </View>
          <Button title="カメラロールに保存" onPress={() => downloadImage()} />
        </>
      )}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    width: '40%',
    borderWidth: 1,
    borderColor: '#A1CEDC',
    backgroundColor: '#A1CEDC',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
  },
});
