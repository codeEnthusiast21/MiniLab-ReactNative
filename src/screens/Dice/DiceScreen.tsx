import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import * as Animatable from "react-native-animatable";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";

const diceImages: Record<number, any> = {
  1: require("../../../assets/dice/dice1.png"),
  2: require("../../../assets/dice/dice2.png"),
  3: require("../../../assets/dice/dice3.png"),
  4: require("../../../assets/dice/dice4.png"),
  5: require("../../../assets/dice/dice5.png"),
  6: require("../../../assets/dice/dice6.png"),
};

export default function DiceScreen() {
  const [value, setValue] = useState(1);
  const [bet, setBet] = useState<number | null>(null);
  const [result, setResult] = useState<"WIN" | "LOSE" | null>(null);

  const spin = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  // Sound refs
  const rollSound = useRef<Audio.Sound | null>(null);
  const winSound = useRef<Audio.Sound | null>(null);
  const loseSound = useRef<Audio.Sound | null>(null);

  const playSound = async (soundRef: React.MutableRefObject<Audio.Sound | null>, source: any) => {
    if (soundRef.current) {
      await soundRef.current.replayAsync();
      return;
    }
    const { sound } = await Audio.Sound.createAsync(source);
    soundRef.current = sound;
    await sound.playAsync();
  };

  const rollDice = async () => {
    if (!bet) return;

    setResult(null);

    // Haptic on roll start
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Roll sound
    playSound(rollSound, require("../../../assets/sounds/dice-roll.mp3"));

    spin.setValue(0);
    scale.setValue(1);

    Animated.parallel([
      Animated.timing(spin, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),
    ]).start(async () => {
      const random = Math.floor(Math.random() * 6) + 1;
      setValue(random);

      if (random === bet) {
        setResult("WIN");
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        playSound(winSound, require("../../../assets/sounds/win.mp3"));
      } else {
        setResult("LOSE");
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        playSound(loseSound, require("../../../assets/sounds/lose.mp3"));
      }
    });
  };

  const rotation = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roll Dice</Text>

      {/* Dice */}
      <Animated.View
        style={[
          styles.diceWrapper,
          { transform: [{ rotate: rotation }, { scale }] },
        ]}
      >
        <Image source={diceImages[value]} style={styles.dice} />
      </Animated.View>

      {/* Number */}
      <Animatable.Text
        key={value}
        animation="fadeInUp"
        style={styles.numberText}
      >
        Rolled: {value}
      </Animatable.Text>

      {/* Bet */}
      <Text style={styles.betLabel}>Place your bet</Text>
      <View style={styles.betRow}>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <TouchableOpacity
            key={num}
            style={[
              styles.betCircle,
              bet === num && styles.betActive,
            ]}
            onPress={() => {
              setBet(num);
              Haptics.selectionAsync();
            }}
          >
            <Text style={styles.betText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Result */}
      {result && (
        <Animatable.Text
          animation="zoomIn"
          style={[
            styles.resultText,
            result === "WIN" ? styles.win : styles.lose,
          ]}
        >
          {result === "WIN" ? "🎉 You Win!" : "😕 Try Again"}
        </Animatable.Text>
      )}

      {/* Roll */}
      <TouchableOpacity
        style={[styles.button, !bet && { opacity: 0.5 }]}
        onPress={rollDice}
        disabled={!bet}
      >
        <Text style={styles.buttonText}>Roll Dice</Text>
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
  diceWrapper: {
    marginVertical: 20,
  },
  dice: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  numberText: {
    color: "#F8FAFC",
    fontSize: 18,
    marginBottom: 16,
  },
  betLabel: {
    color: "#94A3B8",
    marginBottom: 8,
    fontSize: 16,
  },
  betRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  betCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#475569",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
  },
  betActive: {
    backgroundColor: "#6366F1",
    borderColor: "#6366F1",
  },
  betText: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "600",
  },
  resultText: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: "700",
  },
  win: {
    color: "#22C55E",
  },
  lose: {
    color: "#EF4444",
  },
  button: {
    backgroundColor: "#6366F1",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
});
