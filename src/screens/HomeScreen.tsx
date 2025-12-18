import { View, Text, StyleSheet, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import AppCard from "../components/AppCard";

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const screenOpacity = useRef(new Animated.Value(0)).current;
  const screenTranslate = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(screenOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(screenTranslate, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: screenOpacity,
          transform: [{ translateY: screenTranslate }],
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>MiniLab</Text>
        <Text style={styles.subtitle}>
          Small experiments. Clean architecture.
        </Text>
      </View>

      {/* Grid */}
      <View style={styles.grid}>
        <AppCard
          title="Password Generator"
          icon={<Ionicons name="key-outline" size={32} color="#38BDF8" />}
          onPress={() => navigation.navigate("Password")}
          delay={0}
        />

        <AppCard
          title="Paint Your Ideas"
          icon={<MaterialCommunityIcons name="palette-outline" size={32} color="#A78BFA" />}
          onPress={() => navigation.navigate("Paint")}
          delay={80}
        />

        <AppCard
          title="Roll Dice"
          icon={<FontAwesome5 name="dice" size={30} color="#FACC15" />}
          onPress={() => navigation.navigate("Dice")}
          delay={160}
        />

        <AppCard
          title="Currency Converter"
          icon={<Ionicons name="cash-outline" size={32} color="#4ADE80" />}
          onPress={() => navigation.navigate("Currency")}
          delay={240}
        />

        <AppCard
          title="Tic Tac Toe"
          icon={<MaterialCommunityIcons name="grid" size={32} color="#FB7185" />}
          onPress={() => navigation.navigate("TicTacToe")}
          delay={320}
        />

        <AppCard
          title="Music Player"
          icon={<Ionicons name="musical-notes-outline" size={32} color="#F472B6" />}
          onPress={() => navigation.navigate("Music")}
          delay={400}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingTop: 64,
  },

  header: {
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 34,
    color: "#F8FAFC",
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#94A3B8",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    rowGap: 16,
  },
});
