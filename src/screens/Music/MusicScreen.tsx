import React, { useEffect, useState, useRef } from "react";
import { View,Button, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { useAudioPlayer } from 'expo-audio';


export default function MusicScreen() {

const audioSource = require('../../../assets/music/Samjho_Na.mp3');
  const player = useAudioPlayer(audioSource);

  return (
     
    <View style={styles.container}>
      <Text style={styles.title}>Music Player</Text>

      <Animatable.Image
        source={require("../../../assets/music/samjoNa.jpg")}
        style={styles.cover}
        animation="fadeIn"
        duration={500}
      />
       <Button title="Play Sound" onPress={() => player.play()} />
      <Button
        title="Replay Sound"
        onPress={() => {
          player.seekTo(0);
          player.play();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    color: "#F8FAFC",
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    marginBottom: 20,
  },
  cover: {
    width: 260,
    height: 260,
    borderRadius: 16,
    marginBottom: 20,
  },
  trackName: {
    color: "#F8FAFC",
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    marginTop: 10,
  },
  artist: {
    color: "#94A3B8",
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Inter_500Medium",
  },
  slider: {
    width: "100%",
    marginVertical: 20,
  },
  playButton: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 50,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  playButtonText: {
    color: "#FFF",
    fontFamily: "Inter_700Bold",
    fontSize: 18,
  },
});
