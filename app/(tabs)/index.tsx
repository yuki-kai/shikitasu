import { useState } from 'react';
import { Image, StyleSheet, Button, View, Dimensions } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import * as ImagePicker from 'expo-image-picker';

export default function HomeScreen() {
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
    } else {
      alert("画像が選択されていません");
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
          <Image
            source={{ uri: selectedImage }}
            style={{
              ...dimensions,
              resizeMode: 'contain'
            }}
          />
        )}
      </View>
      <Button title="写真を選択" onPress={pickImageAsync} />
      {selectedImage && (<Button title="写真を削除" onPress={() => setSelectedImage(null)} />)}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },  
});
