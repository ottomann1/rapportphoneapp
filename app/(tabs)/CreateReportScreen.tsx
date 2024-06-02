import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreateReportScreenProps, Question } from '../types';

export default function CreateReportScreen({ navigation }: CreateReportScreenProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const savedToken = await AsyncStorage.getItem('token');
      if (savedToken) {
        setToken(savedToken);
      } else {
        navigation.navigate('Login'); // Redirect to login if no token is found
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get('http://your-backend-url/api/get-template-questions/1/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setQuestions(response.data);
        })
        .catch((error) => {
          Alert.alert('Error', 'Failed to load questions.');
          console.error(error);
        });
    }
  }, [token]);

  const handleSubmit = () => {
    axios
      .post(
        'http://your-backend-url/api/reports/',
        {
          answers: answers,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        navigation.navigate('Home'); // Navigate to the home screen
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to submit report.');
        console.error(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text>{question.text}</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setAnswers({ ...answers, [question.id]: text })}
          />
        </View>
      ))}
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  questionContainer: {
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 8,
  },
});