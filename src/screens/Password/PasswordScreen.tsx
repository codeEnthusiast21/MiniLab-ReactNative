import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import * as Clipboard from "expo-clipboard";
import * as Animatable from "react-native-animatable";

export default function PasswordScreen() {
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");

  function generatePassword() {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}";

    if (chars.length === 0) return;

    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  }

  function copyPassword() {
    if (password.length > 0) {
      Clipboard.setStringAsync(password);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Generator</Text>

      {/* LENGTH */}
      <View style={styles.section}>
        <Text style={styles.label}>Length: {length}</Text>
        <Slider
          minimumValue={4}
          maximumValue={32}
          step={1}
          value={length}
          onValueChange={(v) => setLength(v)}
          minimumTrackTintColor="#6366F1"
          thumbTintColor="#6366F1"
        />
      </View>

      {/* TOGGLES */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Uppercase</Text>
          <Switch value={uppercase} onValueChange={setUppercase} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Lowercase</Text>
          <Switch value={lowercase} onValueChange={setLowercase} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Numbers</Text>
          <Switch value={numbers} onValueChange={setNumbers} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Symbols</Text>
          <Switch value={symbols} onValueChange={setSymbols} />
        </View>
      </View>

      {/* GENERATE BUTTON */}
      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Generate</Text>
      </TouchableOpacity>

      {/* RESULT */}
      {password.length > 0 && (
        <Animatable.View 
          key={password}
          animation="fadeInUp"
          duration={600}
          style={styles.resultBox}
        >
          <TouchableOpacity onPress={copyPassword} activeOpacity={0.8}>
            <Text style={styles.password}>{password}</Text>
            <Text style={styles.copyHint}>Tap to copy</Text>
          </TouchableOpacity>
        </Animatable.View>
      )}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 20,
  },
  title: {
    color: "#F8FAFC",
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    color: "#E2E8F0",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#6366F1",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  resultBox: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  password: {
    color: "#F8FAFC",
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  copyHint: {
  marginTop: 6,
  color: "#94A3B8",
  fontSize: 12,
  fontFamily: "Inter_400Regular",
},

});
