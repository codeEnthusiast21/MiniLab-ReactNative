import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const RATES: Record<string, number> = {
  USD: 1,
  INR: 83,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 151.5,
};


export default function CurrencyScreen() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");

  function convert() {
    const num = parseFloat(amount) || 0;
    const usdValue = num / RATES[from];
    const converted = usdValue * RATES[to];
    return converted.toFixed(2);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      {/* INPUT CARD */}
      <View style={styles.card}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount"
          placeholderTextColor="#64748B"
        />

        <Text style={[styles.label, { marginTop: 20 }]}>From</Text>
        <Picker
          selectedValue={from}
          onValueChange={(v) => setFrom(v)}
          style={styles.picker}
          dropdownIconColor="#F8FAFC"
        >
          {Object.keys(RATES).map((k) => (
            <Picker.Item label={k} value={k} key={k} color="#000" />
          ))}
        </Picker>

        <Text style={[styles.label, { marginTop: 20 }]}>To</Text>
        <Picker
          selectedValue={to}
          onValueChange={(v) => setTo(v)}
          style={styles.picker}
          dropdownIconColor="#F8FAFC"
        >
          {Object.keys(RATES).map((k) => (
            <Picker.Item label={k} value={k} key={k} color="#000" />
          ))}
        </Picker>
      </View>

      {/* RESULT CARD */}
      <View style={styles.resultCard}>
        <Text style={styles.resultText}>
          {amount} {from} =  
        </Text>
        <Text style={styles.converted}>
          {convert()} {to}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    color: "#F8FAFC",
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#1E293B",
    padding: 18,
    borderRadius: 14,
  },
  label: {
    color: "#d6d7d8ff",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#334155",
    color: "#F8FAFC",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  picker: {
    backgroundColor: "#334155",
    borderRadius: 10,
    color: "#F8FAFC",
    marginTop: -5,
  },
  resultCard: {
    marginTop: 30,
    backgroundColor: "#1E293B",
    padding: 18,
    borderRadius: 14,
  },
  resultText: {
    color: "#94A3B8",
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
  converted: {
    color: "#F8FAFC",
    fontSize: 22,
    marginTop: 4,
    fontFamily: "Inter_700Bold",
  },
});
