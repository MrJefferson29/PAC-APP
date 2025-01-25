// GoogleAIComponent.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

const ChatScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAIResponse = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http:192.168.64.100:5000/generate-response', {
        prompt: prompt,
      });

      setResponseText(response.data.response);
    } catch (err) {
      console.error('Error fetching AI response:', err);
      setError('Failed to fetch response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your prompt"
        value={prompt}
        onChangeText={setPrompt}
      />
      <Button title="Generate Response" onPress={fetchAIResponse} />
      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {responseText && <Text style={styles.responseText}>{responseText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingLeft: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  responseText: {
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default ChatScreen;
