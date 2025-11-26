import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

const COLORS = [
  "#0F172A", 
  "#1E293B", 
  "#0EA5E9", 
  "#22C55E", 
  "#F97316", 
  "#EF4444", 
  "#A855F7", 
  "#3B82F6", 
  "#D946EF", 
];

export default function BackgroundScreen() {
  const [bg, setBg] = useState("#0F172A");

  return (
    <Animatable.View
      style={[styles.container, { backgroundColor: bg }]}
      key={bg} 
      animation="fadeIn"
      duration={400}
    >
      <Text style={styles.title}>Background Changer</Text>

     <View style={styles.paletteWrapper}>
  <View style={styles.palette}>
    {COLORS.map((color) => (
      <TouchableOpacity
        key={color}
        style={[styles.circle, { backgroundColor: color }]}
        onPress={() => setBg(color)}
        activeOpacity={0.7}
      />
    ))}
  </View>
</View>

    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#F8FAFC",
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    marginBottom: 40,
  },
 container: {
  flex: 1,
  paddingTop: 60,
  paddingHorizontal: 20,
},

paletteWrapper: {
  flex: 1,
  justifyContent: "center",   
  alignItems: "center",        
},

palette: {
  width: "100%",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-around",  
  alignItems: "center",
},

circle: {
  width: 70,
  height: 70,
  borderRadius: 35,
  marginVertical: 12,   
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowRadius: 6,
  elevation: 4,
},

});
