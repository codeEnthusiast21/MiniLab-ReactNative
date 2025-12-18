import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

type Rates = {
  [key: string]: number;
};

const CurrencyScreen: React.FC = () => {
  const [amount, setAmount] = useState<string>("1");
  const [from, setFrom] = useState<string>("USD");
  const [to, setTo] = useState<string>("INR");
  const [rates, setRates] = useState<Rates>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://api.frankfurter.app/latest?from=USD"
      );
      const data = await response.json();

      if (!data.rates) {
        throw new Error("Rates missing");
      }

      setRates({
        USD: 1,        // base currency
        ...data.rates,
      });
    } catch (e) {
      setError("Failed to fetch live exchange rates");
    } finally {
      setLoading(false);
    }
  };

  const convert = (): string => {
    if (!rates[from] || !rates[to]) return "0.00";

    const value = parseFloat(amount) || 0;
    const usdValue = value / rates[from];
    const converted = usdValue * rates[to];

    return converted.toFixed(2);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  const currencies = Object.keys(rates);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

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
          onValueChange={setFrom}
          style={styles.picker}
        >
          {currencies.map((c) => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>

        <Text style={[styles.label, { marginTop: 20 }]}>To</Text>
        <Picker
          selectedValue={to}
          onValueChange={setTo}
          style={styles.picker}
        >
          {currencies.map((c) => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>
      </View>

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
};

export default CurrencyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#F8FAFC",
    fontSize: 26,
    marginBottom: 30,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#1E293B",
    padding: 18,
    borderRadius: 14,
  },
  label: {
    color: "#CBD5E1",
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#334155",
    color: "#F8FAFC",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  picker: {
    backgroundColor: "#334155",
    color: "#F8FAFC",
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
  },
  converted: {
    color: "#F8FAFC",
    fontSize: 22,
    marginTop: 4,
    fontWeight: "700",
  },
  error: {
    color: "#EF4444",
    fontSize: 16,
  },
});
