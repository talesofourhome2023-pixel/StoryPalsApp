import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { APP_COLORS, FONTS, STORY_THEMES, BOOK_STYLES } from '../utils/constants';
import StoryGenerator from '../services/StoryGenerator';

const { width } = Dimensions.get('window');

const ThemeScreen = ({ route, navigation }) => {
  const { selectedCharacter } = route.params;
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(BOOK_STYLES[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCreateStory = async () => {
    if (!selectedTheme) return;
    setIsGenerating(true);
    const story = await StoryGenerator.generateStory(
      selectedCharacter,
      selectedTheme,
      selectedStyle.id
    );
    setIsGenerating(false);
    navigation.navigate('Story', { story, selectedCharacter, selectedTheme, selectedStyle });
  };

  const renderTheme = ({ item }) => {
    const isSelected = selectedTheme?.id === item.id;
    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected, { borderColor: item.color }]}
        onPress={() => setSelectedTheme(item)}
      >
        <Text style={styles.icon}>{item.icon}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[APP_COLORS.background, APP_COLORS.secondary + '10']} style={styles.bg}>
        <Text style={styles.header}>Choose a Theme</Text>
        <FlatList
          data={STORY_THEMES}
          renderItem={renderTheme}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
        <TouchableOpacity
          style={[styles.button, !selectedTheme && styles.buttonDisabled]}
          onPress={handleCreateStory}
          disabled={!selectedTheme}
        >
          <Text style={styles.buttonText}>
            {isGenerating ? 'Creating...' : 'Create Story'}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  bg: { flex: 1, padding: 20 },
  header: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: APP_COLORS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  list: { alignItems: 'center' },
  card: {
    backgroundColor: APP_COLORS.white,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 15,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    width: (width - 80) / 2,
  },
  cardSelected: {
    borderColor: APP_COLORS.primary,
  },
  icon: { fontSize: 32 },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: APP_COLORS.text,
  },
  button: {
    backgroundColor: APP_COLORS.accent,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: APP_COLORS.textLight,
  },
  buttonText: {
    color: APP_COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 18,
  },
});

export default ThemeScreen;
