import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Modal
} from 'react-native';
import { APP_COLORS, FONTS } from '../utils/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const ParentalGate = ({ visible, onGrantAccess, onCancel }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const correctAnswer = '9'; // Example: 7 + 2

  const checkAnswer = () => {
    if (answer.trim() === correctAnswer) {
      setError('');
      onGrantAccess();
      setAnswer('');
    } else {
      setError('Oops! Try again.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onCancel}
    >
      <SafeAreaView style={styles.backdrop}>
        <View style={styles.modal}>
          <Text style={styles.title}>Parent Verification</Text>
          <Text style={styles.instruction}>
            Solve to continue: {'\n'}
            <Text style={styles.math}>7 + 2 = ?</Text>
          </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={answer}
            onChangeText={setAnswer}
            placeholder="Your answer"
            maxLength={2}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.row}>
            <TouchableOpacity style={styles.cancel} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submit} onPress={checkAnswer}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 15,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: APP_COLORS.primary,
    marginBottom: 10,
  },
  instruction: {
    fontSize: 18,
    fontFamily: FONTS.regular,
    textAlign: 'center',
    marginBottom: 15,
    color: APP_COLORS.text,
  },
  math: {
    fontSize: 26,
    fontWeight: 'bold',
    color: APP_COLORS.accent,
  },
  input: {
    borderWidth: 1.5,
    borderColor: APP_COLORS.primary,
    borderRadius: 10,
    width: '60%',
    height: 45,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    color: APP_COLORS.text,
  },
  error: {
    color: APP_COLORS.danger,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  cancel: {
    backgroundColor: APP_COLORS.textLight,
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  cancelText: {
    color: APP_COLORS.white,
    fontFamily: FONTS.bold,
  },
  submit: {
    backgroundColor: APP_COLORS.primary,
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  submitText: {
    color: APP_COLORS.white,
    fontFamily: FONTS.bold,
  },
});

export default ParentalGate;
