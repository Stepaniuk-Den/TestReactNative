import { StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ButtonGoBack = ({ path }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.arrowLeft}
      onPress={() => navigation.navigate(path)}
    >
      <AntDesign name="arrowleft" size={24} color="rgba(33, 33, 33, 0.8)" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrowLeft: {
    width: 24,
    height: 24,
    marginLeft: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ButtonGoBack;
