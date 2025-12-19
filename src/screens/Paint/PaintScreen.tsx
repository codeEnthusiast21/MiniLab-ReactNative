import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  GestureResponderEvent,
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

  const currentStrokeRef = useRef<Stroke | null>(null);
  const viewShotRef = useRef<ViewShot>(null);

  const handleTouchStart = (e: GestureResponderEvent) => {
    const { locationX, locationY } = e.nativeEvent;
    
    const color = isEraser ? "#020617" : currentColor;
    const width = isEraser ? brushWidth * 2 : brushWidth;
    
    currentStrokeRef.current = {
      path: `M ${locationX} ${locationY}`,
      color: color,
      width: width,
    };

    setStrokes((prev) => [...prev, currentStrokeRef.current!]);
    setRedoStack([]);
  };

  const handleTouchMove = (e: GestureResponderEvent) => {
    if (!currentStrokeRef.current) return;

    const { locationX, locationY } = e.nativeEvent;
    currentStrokeRef.current.path += ` L ${locationX} ${locationY}`;

    setStrokes((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = { ...currentStrokeRef.current! };
      return updated;
    });
  };

  const handleTouchEnd = () => {
    currentStrokeRef.current = null;
  };

  const undo = () => {
    if (strokes.length === 0) return;
    const last = strokes[strokes.length - 1];
    setRedoStack((prev) => [...prev, last]);
    setStrokes((prev) => prev.slice(0, -1));
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const last = redoStack[redoStack.length - 1];
    setStrokes((prev) => [...prev, last]);
    setRedoStack((prev) => prev.slice(0, -1));
  };

  const clear = () => {
    setStrokes([]);
    setRedoStack([]);
  };

  const saveImage = async () => {
    try {
      // Pass false to NOT request audio permissions
      const { status } = await MediaLibrary.requestPermissionsAsync(false);
      
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant photo library access to save your artwork"
        );
        return;
      }

      const uri = await viewShotRef.current?.capture?.();
      if (uri) {
        await MediaLibrary.createAssetAsync(uri);
        Alert.alert("Success!", "Your artwork has been saved to gallery");
      }
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Error", "Failed to save image. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paint</Text>

      {/* CANVAS */}
      <ViewShot 
        ref={viewShotRef} 
        style={styles.canvas} 
        options={{ format: "png", quality: 1 }}
      >
        <View
          style={StyleSheet.absoluteFill}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
          onResponderGrant={handleTouchStart}
          onResponderMove={handleTouchMove}
          onResponderRelease={handleTouchEnd}
          onResponderTerminate={handleTouchEnd}
        >
          <Svg style={StyleSheet.absoluteFill}>
            {strokes.map((stroke, index) => (
              <Path
                key={`stroke-${index}`}
                d={stroke.path}
                stroke={stroke.color}
                strokeWidth={stroke.width}
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
        {COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorButton,
              {
                backgroundColor: color,
                borderWidth: currentColor === color && !isEraser ? 4 : 2,
                borderColor: currentColor === color && !isEraser ? "#6366F1" : "#475569",
              },
            ]}
            onPress={() => {
              setCurrentColor(color);
              setIsEraser(false);
            }}
          />
        ))}
      </View>

      {/* TOOLS */}
      <View style={styles.tools}>
        <Tool 
          label="Undo" 
          onPress={undo} 
          disabled={strokes.length === 0} 
        />
        <Tool 
          label="Redo" 
          onPress={redo} 
          disabled={redoStack.length === 0} 
        />
        <Tool
          label={isEraser ? "✓ Eraser" : "Eraser"}
          active={isEraser}
          onPress={() => setIsEraser(!isEraser)}
        />
        <Tool 
          label="Save" 
          onPress={saveImage} 
        />
        <Tool 
          label="Clear" 
          onPress={clear} 
          disabled={strokes.length === 0} 
        />
      </View>

      {/* BRUSH SIZES */}
      <View style={styles.brushRow}>
        <Text style={styles.brushLabel}>
          {isEraser ? "Eraser" : "Brush"} Size:
        </Text>
        {[2, 4, 6, 8].map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.brushContainer,
              brushWidth === size && styles.brushContainerActive,
            ]}
            onPress={() => setBrushWidth(size)}
          >
            <View
              style={[
                styles.brushDot,
                {
                  width: size * 3,
                  height: size * 3,
                  backgroundColor: brushWidth === size ? "#6366F1" : "#94A3B8",
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* COLOR INDICATOR */}
      {!isEraser && (
        <View style={styles.currentColorRow}>
          <Text style={styles.currentColorLabel}>Current Color:</Text>
          <View style={[styles.currentColorBox, { backgroundColor: currentColor }]} />
        </View>
      )}
    </View>
  );
}

function Tool({
  label,
  onPress,
  active,
  disabled,
}: {
  label: string;
  onPress: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.toolBtn,
        active && styles.toolBtnActive,
        disabled && styles.toolBtnDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.toolText, disabled && styles.toolTextDisabled]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    color: "#F8FAFC",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  canvas: {
    flex: 1,
    backgroundColor: "#020617",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#1E293B",
    overflow: "hidden",
    marginBottom: 16,
  },
  palette: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  colorButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  tools: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 8,
  },
  toolBtn: {
    backgroundColor: "#1E293B",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#334155",
  },
  toolBtnActive: {
    backgroundColor: "#334155",
    borderColor: "#6366F1",
  },
  toolBtnDisabled: {
    opacity: 0.4,
  },
  toolText: {
    color: "#F8FAFC",
    fontSize: 14,
    fontWeight: "600",
  },
  toolTextDisabled: {
    color: "#64748B",
  },
  brushRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  brushLabel: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
  },
  brushContainer: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  brushContainerActive: {
    borderColor: "#6366F1",
    backgroundColor: "#1E293B",
  },
  brushDot: {
    borderRadius: 999,
  },
  currentColorRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  currentColorLabel: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
  },
  currentColorBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#475569",
  },
});