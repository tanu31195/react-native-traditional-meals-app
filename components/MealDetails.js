import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

export default function MealDetails({
  duration,
  complexity,
  affordability,
  style,
  textStyle,
}) {
  const iconSize = 24;
  return (
    <View style={[styles.details, style]}>
      <Ionicons name='hourglass-outline' size={iconSize} color={COLORS.tertiary} />
      <Text style={[styles.detailItem, textStyle]}>{duration} mins |</Text>
      <Ionicons name='speedometer-outline' size={iconSize} color={COLORS.tertiary} />
      <Text style={[styles.detailItem, textStyle]}>
        {complexity?.toUpperCase()} |
      </Text>
      <Ionicons name='cash-outline' size={iconSize} color={COLORS.tertiary} />
      <Text style={[styles.detailItem, textStyle]}>
        {affordability?.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    color: COLORS.tertiary,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
