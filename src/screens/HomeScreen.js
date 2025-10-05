import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { APP_COLORS, FONTS, CHARACTERS } from '../utils/constants';
import ParentalGate from '../components/ParentalGate';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [showGate, setShowGate] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[APP_COLORS.primary, APP_COLORS.secondary]} style={styles.bg}>
        <View style={styles.hero}>
          <Text style={styles.title}>Welcome to StoryPals!</Text>
          <Text style={styles.subtitle}>Choose a friend and create magical stories ✨</Text>
          <View style={styles.preview}>
            {CHARACTERS.map((c) => (
              <Text key={c.id} style={styles.emoji}>{c.avatar}</Text>
            ))}
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.startBtn} onPress={() => navigation.navigate('Character')}>
            <Text style={styles.startText}>Start New Story</Text>
            <Text style={styles.emoji}>📚</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.parentBtn} onPress={() => setShowGate(true)}>
            <Text style={styles.parentText}>Parents Area</Text>
          </TouchableOpacity>
        </View>
        <ParentalGate
          visible={showGate}
          onGrantAccess={() => { setShowGate(false); navigation.navigate('Parent'); }}
          onCancel={() => setShowGate(false)}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bg: { flex: 1, justifyContent: 'space-between' },
  hero: { alignItems: 'center', marginTop: 40 },
  title: { fontSize: 32, fontFamily: FONTS.bold, color: APP_COLORS.white },
  subtitle: { fontSize: 18, fontFamily: FONTS.regular, color: APP_COLORS.white, marginVertical: 10, textAlign: 'center' },
  preview: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 },
  emoji: { fontSize: 36, margin: 8 },
  actions: { alignItems: 'center', marginBottom: 40 },
  startBtn: {
    flexDirection: 'row', backgroundColor: APP_COLORS.white,
    paddingVertical: 16, paddingHorizontal: 30, borderRadius: 25,
    alignItems: 'center', marginBottom: 20, width: width * 0.8,
    justifyContent: 'center'
  },
  startText: { fontSize: 20, fontFamily: FONTS.bold, color: APP_COLORS.primary, marginRight: 10 },
  parentBtn: { padding: 10, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 15 },
  parentText: { color: APP_COLORS.white, fontFamily: FONTS.regular },
});
