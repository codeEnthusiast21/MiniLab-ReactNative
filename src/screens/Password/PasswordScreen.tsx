import { View, Text, StyleSheet } from "react-native";

export default function PasswordScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Password Generator</Text>
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
