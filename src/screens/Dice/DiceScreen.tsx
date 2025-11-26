import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";

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

  function rollDice() {
    const random = Math.floor(Math.random() * 6) + 1;
    setValue(random);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roll Dice</Text>

      <Animatable.View
        key={value}                     
        animation="shake"               
        duration={600}
        easing="ease-out"
        style={styles.diceWrapper}
      >
        <Image source={diceImages[value]} style={styles.dice} />
      </Animatable.View>

      <TouchableOpacity style={styles.button} onPress={rollDice}>
        <Text style={styles.buttonText}>Roll</Text>
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
    marginBottom: 40,
  },
  diceWrapper: {
    marginBottom: 30,
  },
  dice: {
    width: 150,
    height: 150,
    resizeMode: "contain",
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
