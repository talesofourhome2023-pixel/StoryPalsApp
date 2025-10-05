import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { CHARACTERS, APP_COLORS, FONTS } from '../utils/constants';

const { width } = Dimensions.get('window');

function CharacterScreen({ navigation }) {
  const [selected, setSelected] = useState(null);

  const handleNext = () => {
    if (selected) {
      navigation.navigate('Theme', { selectedCharacter: selected });
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = selected && selected.id === item.id;
    return (
      <TouchableOpacity
        style={[
          styles.characterCard,
          { borderColor: isSelected ? APP_COLORS.primary : 'transparent' },
        ]}
        onPress={() => setSelected(item)}
      >
        <Text style={styles.avatar}>{item.avatar}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pick Your Story Friend</Text>
      <FlatList
        data={CHARACTERS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={[styles.nextButton, !selected && styles.nextButtonDisabled]}
        onPress={handleNext}
        disabled={!selected}
      >
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: APP_COLORS.background, padding: 16 },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: APP_COLORS.primary,
    textAlign: 'center',
    marginVertical: 15,
  },
  list: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  characterCard: {
    width: width * 0.42,
    backgroundColor: APP_COLORS.white,
    borderRadius: 18,
    padding: 14,
    margin: 8,
    alignItems: 'center',
    borderWidth: 2,
    elevation: 2,
  },
  avatar: { fontSize: 38, marginBottom: 6 },
  name: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: APP_COLORS.text,
    marginBottom: 3,
  },
  description: {
    fontSize: 13,
    color: APP_COLORS.textLight,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: APP_COLORS.primary,
    borderRadius: 24,
    marginHorizontal: 50,
    alignItems: 'center',
    padding: 14,
    marginTop: 10,
  },
  nextButtonDisabled: {
    backgroundColor: APP_COLORS.textLight,
  },
  nextText: {
    fontFamily: FONTS.bold,
    color: APP_COLORS.white,
    fontSize: 17,
  }
});

export default CharacterScreen;
