import React, { useRef } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  Animated,
} from "react-native";

type AppCardProps = {
  title: string;
  icon?: React.ReactNode;
  onPress: () => void;
  delay?: number;
};

export default function AppCard({
  title,
  icon,
  onPress,
  delay = 0,
}: AppCardProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      <Pressable
        style={styles.card}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        {icon}
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "48%",
  },

  card: {
    backgroundColor: "#020617",
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E293B",
  },

  title: {
    marginTop: 12,
    fontSize: 14,
    color: "#E5E7EB",
    fontWeight: "600",
    textAlign: "center",
  },
});
