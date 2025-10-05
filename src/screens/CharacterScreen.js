// src/screens/CharacterScreen.js

import React from 'react';
import {
  Text,
  TouchableOpacity, 
  StyleSheet,
  View,
  ScrollView,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { APP_COLORS, FONTS } from '../utils/constants';

const CHARACTERS = [
  {
    id: 'owl',
    name: 'Owen the Owl',
    description: 'Wise and thoughtful, loves solving puzzles',
    image: require('../../assets/images/character_owl.png'),
    color: '#8B4513'
  },
  {
    id: 'bear',
    name: 'Benny the Bear',
    description: 'Kind and gentle, always ready to help friends',
    image: require('../../assets/images/character_bear.png'),
    color: '#CD853F'
  },
  {
    id: 'rabbit',
    name: 'Ruby the Rabbit',
    description: 'Energetic and curious, loves new adventures',
    image: require('../../assets/images/character_rabbit.png'),
    color: '#DDA0DD'
  }
];

export default function CharacterScreen({ navigation }) {
  const handleCharacterSelect = (character) => {
    navigation.navigate('ThemeScreen', { selectedCharacter: character });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose Your Character</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {CHARACTERS.map((character) => (
          <TouchableOpacity
            key={character.id}
            style={[styles.characterCard, { borderColor: character.color }]}
            onPress={() => handleCharacterSelect(character)}
          >
            <Image source={character.image} style={styles.characterImage} />
            <View style={styles.characterInfo}>
              <Text style={styles.characterName}>{character.name}</Text>
              <Text style={styles.characterDescription}>{character.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.background
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: APP_COLORS.primary,
    textAlign: 'center',
    marginVertical: 20
  },
  scrollContainer: {
    padding: 16,
    alignItems: 'center'
  },
  characterCard: {
    flexDirection: 'row',
    backgroundColor: APP_COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    borderWidth: 3,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  characterImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16
  },
  characterInfo: {
    flex: 1,
    justifyContent: 'center'
  },
  characterName: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: APP_COLORS.text,
    marginBottom: 4
  },
  characterDescription: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: APP_COLORS.textSecondary,
    lineHeight: 20
  }
});
