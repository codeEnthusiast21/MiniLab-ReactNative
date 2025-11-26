import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

type Player = "X" | "O" | "";

export default function TicTacToeScreen() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(""));
  const [player, setPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "DRAW" | "">("");

  function handlePress(index: number) {
    if (board[index] !== "" || winner) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    checkWinner(newBoard);

    setPlayer((prev) => (prev === "X" ? "O" : "X"));
  }

  function checkWinner(b: Player[]) {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b1, c] of wins) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        setWinner(b[a]);
        return;
      }
    }

    if (b.every((cell) => cell !== "")) {
      setWinner("DRAW");
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(""));
    setWinner("");
    setPlayer("X");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={styles.turn}>
        {winner
          ? winner === "DRAW"
            ? "Game Draw!"
            : `${winner} Wins!`
          : `Turn: ${player}`}
      </Text>

      <View style={styles.grid}>
        {board.map((value, i) => (
          <TouchableOpacity
            key={i}
            style={styles.cell}
            onPress={() => handlePress(i)}
            activeOpacity={0.7}
          >
            <Animatable.Text
              animation={value ? "zoomIn" : undefined}
              duration={300}
              style={[
                styles.cellText,
                value === "X" ? styles.xColor : styles.oColor,
              ]}
            >
              {value}
            </Animatable.Text>
          </TouchableOpacity>
        ))}
      </View>

      {winner ? (
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    color: "#F8FAFC",
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    marginBottom: 10,
  },
  turn: {
    color: "#CBD5E1",
    fontSize: 18,
    fontFamily: "Inter_500Medium",
    marginBottom: 30,
  },
  grid: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 4,
    borderColor: "#1E293B",
    borderRadius: 12,
  },
  cell: {
    width: "33.33%",
    height: "33.33%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  cellText: {
    fontSize: 48,
    fontFamily: "Inter_700Bold",
  },
  xColor: {
    color: "#F87171",
  },
  oColor: {
    color: "#60A5FA",
  },
  button: {
    backgroundColor: "#6366F1",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
});
