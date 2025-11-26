import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import * as Animatable from "react-native-animatable";

export default function MusicScreen() {
  const sound = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);

  async function loadAudio() {
    const { sound: playbackObj } = await Audio.Sound.createAsync(
      require("../../../assets/music/Samjho_Na.mp3"),
      { shouldPlay: false },
      updateStatus
    );
    sound.current = playbackObj;
  }

  function updateStatus(status: any) {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
    }
  }

  async function togglePlay() {
    if (!sound.current) return;

    if (isPlaying) {
      await sound.current.pauseAsync();
    } else {
      await sound.current.playAsync();
    }
  }

  async function handleSeek(value: number) {
    if (sound.current) {
      await sound.current.setPositionAsync(value);
    }
  }

  useEffect(() => {
    loadAudio();
    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Player</Text>

      <Animatable.Image
        source={require("../../../assets/music/samjoNa.jpg")}
        style={styles.cover}
        animation="fadeIn"
        duration={500}
      />

      <Text style={styles.trackName}>Sample Track</Text>
      <Text style={styles.artist}>Artist Name</Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="#6366F1"
        thumbTintColor="#6366F1"
        onSlidingComplete={handleSeek}
      />

      <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
        <Text style={styles.playButtonText}>
          {isPlaying ? "Pause" : "Play"}
        </Text>
      </TouchableOpacity>
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
