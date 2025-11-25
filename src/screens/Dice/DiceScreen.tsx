import { View, Text, StyleSheet } from "react-native";

export default function DiceScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Roll Dice</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F172A",
  },
  text: {
    fontSize: 22,
    color: "#F8FAFC",
  },
});
