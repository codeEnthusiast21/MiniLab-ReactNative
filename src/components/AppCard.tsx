import { Pressable, Text, View, StyleSheet } from "react-native";

type Props = {
  title: string;
  onPress?: () => void;
};

export default function AppCard({ title, onPress }: Props) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    height: 120,
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 16,
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.97 }],
  },
  title: {
    color: "#F1F5F9",
    fontSize: 16,
    fontWeight: "600",
  },
});
