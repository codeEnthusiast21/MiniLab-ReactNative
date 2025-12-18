import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PasswordScreen from "../screens/Password/PasswordScreen";
import DiceScreen from "../screens/Dice/DiceScreen";
import CurrencyScreen from "../screens/Currency/CurrencyScreen";
import TicTacToeScreen from "../screens/TicTacToe/TicTacToeScreen";
import MusicScreen from "../screens/Music/MusicScreen";
import { NavigationContainer } from "@react-navigation/native";
import PaintScreen from "../screens/Paint/PaintScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator
     screenOptions={{ 
      headerShown: false,}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Password" component={PasswordScreen} />
      <Stack.Screen name="Dice" component={DiceScreen} />
      <Stack.Screen name="Currency" component={CurrencyScreen} />
      <Stack.Screen name="TicTacToe" component={TicTacToeScreen} />
      <Stack.Screen name="Music" component={MusicScreen} />
      <Stack.Screen name="Paint" component={PaintScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
