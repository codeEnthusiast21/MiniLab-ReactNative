import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useAudioPlayer } from "expo-audio";

export default function MusicScreen() {
  const audioSource = require("../../../assets/music/Samjho_Na.mp3");
  const player = useAudioPlayer(audioSource);

  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);

  // Poll player status (expo-audio is event-light by design)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!player) return;

      setPosition(player.currentTime ?? 0);
      setDuration(player.duration ?? 1);
      setIsPlaying(player.playing);
    }, 300);

    return () => clearInterval(interval);
  }, [player]);

  const togglePlayback = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  const onSeek = (value: number) => {
    player.seekTo(value);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Player</Text>

      <Animatable.Image
        source={require("../../../assets/music/samjoNa.jpg")}
        style={styles.cover}
        animation="fadeIn"
        duration={500}
      />

      <Text style={styles.trackName}>Samjho Na</Text>
      <Text style={styles.artist}>Unknown Artist</Text>

      {/* Slider */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={onSeek}
        minimumTrackTintColor="#6366F1"
        maximumTrackTintColor="#334155"
        thumbTintColor="#6366F1"
      />

      {/* Time */}
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      {/* Play / Pause */}
      <TouchableOpacity
        style={styles.playButton}
        activeOpacity={0.8}
        onPress={togglePlayback}
      >
        <Ionicons
          name={isPlaying ? "pause" : "play"}
          size={32}
          color="#FFF"
        />
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
    marginBottom: 24,
  },

  cover: {
    width: 260,
    height: 260,
    borderRadius: 16,
    marginBottom: 24,
  },

  trackName: {
    color: "#F8FAFC",
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },

  artist: {
    color: "#94A3B8",
    fontSize: 16,
    marginBottom: 24,
    fontFamily: "Inter_500Medium",
  },

  slider: {
    width: "100%",
    marginTop: 10,
  },

  timeRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  timeText: {
    color: "#94A3B8",
    fontSize: 14,
  },

  playButton: {
    marginTop: 30,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#6366F1",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
});
