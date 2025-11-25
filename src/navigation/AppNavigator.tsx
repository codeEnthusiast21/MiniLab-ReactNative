import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PasswordScreen from "../screens/Password/PasswordScreen";
import BackgroundScreen from "../screens/Background/BackgroundScreen";
import DiceScreen from "../screens/Dice/DiceScreen";
import CurrencyScreen from "../screens/Currency/CurrencyScreen";
import TicTacToeScreen from "../screens/TicTacToe/TicTacToeScreen";
import MusicScreen from "../screens/Music/MusicScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Password" component={PasswordScreen} />
      <Stack.Screen name="Background" component={BackgroundScreen} />
      <Stack.Screen name="Dice" component={DiceScreen} />
      <Stack.Screen name="Currency" component={CurrencyScreen} />
      <Stack.Screen name="TicTacToe" component={TicTacToeScreen} />
      <Stack.Screen name="Music" component={MusicScreen} />
    </Stack.Navigator>
  );
}
