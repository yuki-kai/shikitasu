import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Button, View, Dimensions } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import * as ImagePicker from 'expo-image-picker';
import { Canvas } from '@shopify/react-native-skia';
import { FloatingCircleItem } from '@/components/FloatingCircleItem';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { captureRef } from 'react-native-view-shot';

const FLOATING_CIRCLE_ITEMS = [
  {
    id: '1',
    x: 50,
    y: 50,
    r: 50,
    color: 'yellow',
    animationSize: 20,
    duration: 2000,
  },
] as const satisfies readonly React.ComponentProps<typeof FloatingCircleItem>[];

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState<null | string>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef<View>(null);

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
    } else {
      alert("画像が選択されていません");
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
    } catch (error) {
      console.error('保存に失敗しました', error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
    }>
      <View style={styles.imageContainer}>
        {selectedImage && (
          <View ref={imageRef} collapsable={false} style={{ position: 'relative', ...dimensions }}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.image}
            />
            <Canvas
              style={styles.canvas}
            >
              {FLOATING_CIRCLE_ITEMS.map((item) => (
                <FloatingCircleItem key={item.id} {...item} />
              ))}
            </Canvas>
          </View>
        )}
      </View>
      <Button title="写真を選択" onPress={pickImageAsync} />
      {selectedImage && (
        <>
          <Button title="写真を削除" onPress={() => setSelectedImage(null)} />
          <Button title="カメラロールに保存" onPress={() => downloadImage()} />
        </>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'contain',
  },
  canvas: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },  
});
