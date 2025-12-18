import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

const COLORS = [
  "#FFFFFF",
  "#0EA5E9",
  "#22C55E",
  "#F97316",
  "#EF4444",
  "#A855F7",
  "#3B82F6",
  "#D946EF",
  "#000000",
];

type Stroke = {
  path: string;
  color: string;
  width: number;
};

export default function PaintScreen() {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[]>([]);
  const [currentColor, setCurrentColor] = useState("#FFFFFF");
  const [brushWidth, setBrushWidth] = useState(4);
  const [isEraser, setIsEraser] = useState(false);

  const currentPath = useRef("");
  const viewShotRef = useRef<ViewShot>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        currentPath.current = `M ${locationX} ${locationY}`;
      },

      onPanResponderMove: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        currentPath.current += ` L ${locationX} ${locationY}`;

        setStrokes((prev) => [
          ...prev.slice(0, -1),
          {
            path: currentPath.current,
            color: isEraser ? "#020617" : currentColor,
            width: brushWidth,
          },
        ]);
      },

      onPanResponderRelease: () => {
        if (!currentPath.current) return;

        setStrokes((prev) => [
          ...prev,
          {
            path: currentPath.current,
            color: isEraser ? "#020617" : currentColor,
            width: brushWidth,
          },
        ]);

        currentPath.current = "";
        setRedoStack([]);
      },
    })
  ).current;

  const undo = () => {
    if (!strokes.length) return;
    const last = strokes[strokes.length - 1];
    setRedoStack((r) => [...r, last]);
    setStrokes((s) => s.slice(0, -1));
  };

  const redo = () => {
    if (!redoStack.length) return;
    const last = redoStack[redoStack.length - 1];
    setRedoStack((r) => r.slice(0, -1));
    setStrokes((s) => [...s, last]);
  };

  const clear = () => {
    setStrokes([]);
    setRedoStack([]);
  };

  const saveImage = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) return;

    const uri = await viewShotRef.current?.capture?.();
    if (uri) {
      await MediaLibrary.saveToLibraryAsync(uri);
      alert("Saved to gallery");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paint</Text>

      {/* CANVAS */}
      <ViewShot ref={viewShotRef} style={styles.canvas}>
        <View style={StyleSheet.absoluteFill} {...panResponder.panHandlers}>
          <Svg style={StyleSheet.absoluteFill}>
            {strokes.map((s, i) => (
              <Path
                key={i}
                d={s.path}
                stroke={s.color}
                strokeWidth={s.width}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </Svg>
        </View>
      </ViewShot>

      {/* COLORS */}
      <View style={styles.palette}>
        {COLORS.map((c) => (
          <TouchableOpacity
            key={c}
            style={[
              styles.color,
              {
                backgroundColor: c,
                borderWidth: currentColor === c ? 3 : 1,
                borderColor: "#F8FAFC",
              },
            ]}
            onPress={() => {
              setCurrentColor(c);
              setIsEraser(false);
            }}
          />
        ))}
      </View>

      {/* TOOLS */}
      <View style={styles.tools}>
        <Tool label="Undo" onPress={undo} />
        <Tool label="Redo" onPress={redo} />
        <Tool
          label="Eraser"
          active={isEraser}
          onPress={() => setIsEraser((p) => !p)}
        />
        <Tool label="Save" onPress={saveImage} />
        <Tool label="Clear" onPress={clear} />
      </View>

      {/* BRUSH */}
      <View style={styles.brushRow}>
        {[2, 4, 6, 8].map((s) => (
          <TouchableOpacity
            key={s}
            style={[
              styles.brushDot,
              {
                width: s * 4,
                height: s * 4,
                backgroundColor:
                  brushWidth === s ? "#6366F1" : "#475569",
              },
            ]}
            onPress={() => setBrushWidth(s)}
          />
        ))}
      </View>
    </View>
  );
}

function Tool({
  label,
  onPress,
  active,
}: {
  label: string;
  onPress: () => void;
  active?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.toolBtn,
        active && { backgroundColor: "#334155" },
      ]}
      onPress={onPress}
    >
      <Text style={styles.toolText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    color: "#F8FAFC",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  canvas: {
    flex: 1,
    backgroundColor: "#020617",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1E293B",
    overflow: "hidden",
  },
  palette: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  color: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  tools: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },
  toolBtn: {
    backgroundColor: "#1E293B",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 8,
  },
  toolText: {
    color: "#F8FAFC",
    fontSize: 14,
  },
  brushRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  brushDot: {
    marginHorizontal: 10,
    borderRadius: 999,
  },
});
