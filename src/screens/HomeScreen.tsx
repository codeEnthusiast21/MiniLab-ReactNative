import { View, Text, StyleSheet } from "react-native";
import AppCard from "../components/AppCard";
import { useNavigation } from "@react-navigation/native";


export default function HomeScreen() {


    const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
       <AppCard title="Password Generator" onPress={() => navigation.navigate("Password")} />
<AppCard title="Background Changer" onPress={() => navigation.navigate("Background")} />
<AppCard title="Roll Dice" onPress={() => navigation.navigate("Dice")} />
<AppCard title="Currency Converter" onPress={() => navigation.navigate("Currency")} />
<AppCard title="Tic Tac Toe" onPress={() => navigation.navigate("TicTacToe")} />
<AppCard title="Music Player" onPress={() => navigation.navigate("Music")} />

    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0F172A",
  },
  title: {
    fontSize: 32,
    color: "#F8FAFC",
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#94A3B8",
  },
  grid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  marginTop: 32,
},

});
