import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { FloatingCircleItem } from '@/components/FloatingCircleItem';

export default function HomeScreen() {
  const frames = [
    {
      id: 1,
      name: 'テスト',
      icon: '🎨',
      description: '説明',
      element: <FloatingCircleItem />
    },
    {
      id: 2,
      name: 'テスト',
      icon: '🎨',
      description: '説明',
      element: <FloatingCircleItem />
    },
    {
      id: 3,
      name: 'テスト',
      icon: '🎨',
      description: '説明',
      element: <FloatingCircleItem />
    },
  ]

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <View style={{ marginTop: 16 }}>
        {frames.map((item) => (
          <View key={item.id} style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.contentSection}
              onPress={() => alert('画面遷移')}
            >
              <View style={styles.frameIcon}>
                <Text>{item.icon}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.frameName}>{item.name}</Text>
                <Text style={styles.frameDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.previewSection}
              onPress={() => alert('プレビュー')}
            >
              <Text style={styles.previewText}>プレビュー</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  cardContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  contentSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  frameIcon: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  frameName: {
    fontSize: 16,
    fontWeight: '500',
  },
  frameDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  previewSection: {
    width: 80,
    backgroundColor: '#A1CEDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  previewText: {
    color: 'white',
  },
});
