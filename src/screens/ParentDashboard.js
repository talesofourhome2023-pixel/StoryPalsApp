import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { APP_COLORS, FONTS } from '../utils/constants';

export default function ParentDashboard({ navigation }) {
  const [screenTimeEnabled, setScreenTimeEnabled] = useState(false);
  const [restrictedThemes, setRestrictedThemes] = useState({
    adventure: false,
    friendship: false,
    bedtime: false,
    helping: false,
  });

  const toggleTheme = (theme) => {
    setRestrictedThemes((prev) => ({ ...prev, [theme]: !prev[theme] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Parental Controls</Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Screen Time Limit</Text>
          <View style={styles.row}>
            <Switch
              value={screenTimeEnabled}
              onValueChange={setScreenTimeEnabled}
              trackColor={{ false: '#767577', true: APP_COLORS.primary }}
              thumbColor={screenTimeEnabled ? APP_COLORS.accent : '#f4f3f4'}
            />
            <Text style={styles.text}>
              {screenTimeEnabled ? 'Enabled' : 'Disabled'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Restrict Story Themes</Text>
          {Object.keys(restrictedThemes).map((theme) => (
            <View key={theme} style={styles.row}>
              <Text style={styles.text}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </Text>
              <Switch
                value={restrictedThemes[theme]}
                onValueChange={() => toggleTheme(theme)}
                trackColor={{ false: '#767577', true: APP_COLORS.primary }}
                thumbColor={restrictedThemes[theme] ? APP_COLORS.accent : '#f4f3f4'}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.closeText}>Close Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: APP_COLORS.white },
  content: { padding: 20 },
  title: {
    fontFamily: FONTS.title,
    fontSize: 28,
    color: APP_COLORS.primary,
    marginBottom: 30,
  },
  section: { marginBottom: 30 },
  subtitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: APP_COLORS.accent,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: APP_COLORS.text,
  },
  closeBtn: {
    backgroundColor: APP_COLORS.primary,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  closeText: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: APP_COLORS.white,
  },
});
