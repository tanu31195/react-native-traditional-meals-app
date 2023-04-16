import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function FareCalculatorScreen() {
  // <PdfReader url="https://www.ntc.gov.lk/Bus_info/bus_fares.php" />
  const PdfReader = ({ url: uri }) => <WebView style={{ flex: 1 }} source={{ uri }} />
  return (
    <>
    <View style={styles.container}>
        <PdfReader url="https://www.ntc.gov.lk/bus_fare/2023/March/Normal%20Section%20350.pdf" />
      </View>
    <WebView
      style={styles.container}
      source={{ uri: "https://www.taxiautofare.com/lk/Default.aspx" }}
    />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
