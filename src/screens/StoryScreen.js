// src/screens/StoryScreen.js

import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { APP_COLORS, FONTS } from '../utils/constants';
import StoryGenerator from '../services/StoryGenerator';

export default function StoryScreen({ navigation, route }) {
  const { selectedCharacter, selectedTheme } = route.params;
  const [scene, setScene] = useState(null);

  useEffect(() => {
    StoryGenerator.generateStory(selectedCharacter, selectedTheme).then(setScene);
  }, [selectedCharacter, selectedTheme]);

  const handleChoice = (choiceId) => {
    if (choiceId === 'ending') {
      navigation.popToTop();
    } else {
      StoryGenerator.choose(choiceId).then(setScene);
    }
  };

  if (!scene) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading story...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Story</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        {scene.image && (
          <Image source={scene.image} style={styles.image} resizeMode="cover" />
        )}
        <View style={styles.storyBox}>
          <Text style={styles.storyText}>{scene.text}</Text>
          <View style={styles.choices}>
            {scene.choices.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={styles.choiceBtn}
                onPress={() => handleChoice(c.id)}
              >
                <Text style={styles.choiceText}>{c.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.background
  },
  loadingText: {
    marginTop: 40,
    textAlign: 'center',
    fontFamily: FONTS.regular,
    fontSize: 18,
    color: APP_COLORS.text
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: APP_COLORS.primary,
    textAlign: 'center',
    marginVertical: 12,
  },
  scroll: {
    padding: 16,
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  storyBox: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    elevation: 3,
  },
  storyText: {
    color: APP_COLORS.text,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  choices: {
    alignItems: 'center'
  },
  choiceBtn: {
    backgroundColor: APP_COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 6,
  },
  choiceText: {
    fontFamily: FONTS.bold,
    color: APP_COLORS.white,
    fontSize: 16,
  },
});
