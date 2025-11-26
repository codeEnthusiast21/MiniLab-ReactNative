import * as Animatable from "react-native-animatable";
import { Pressable, Text, StyleSheet } from "react-native";

type Props = {
  title: string;
  onPress?: () => void;
};

export default function AppCard({ title, onPress }: Props) {
  return (
    <Animatable.View
      animation="fadeInUp"
      duration={500}
      easing="ease-out"
      style={styles.card}
    >
      <Pressable
        style={({ pressed }) => [styles.inner, pressed && styles.pressed]}
        onPress={onPress}
      >
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    height: 120,
    backgroundColor: "#1E293B",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  inner: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-end",
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  title: {
    color: "#F1F5F9",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
});
