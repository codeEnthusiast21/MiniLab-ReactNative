import { View, Text, StyleSheet } from "react-native";

export default function TicTacToeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tic Tac Toe</Text>
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
