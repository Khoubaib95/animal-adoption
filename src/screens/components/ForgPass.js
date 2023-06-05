import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import * as utils from "../../utils/";
import { useAuthApi } from "../../hooks/mutateApi";

function ForgPass({ navigation }) {
  const [email, setEmail] = useState("");
  const { isLoading, data, error, mutate } = useAuthApi();

  useEffect(() => {
    if (data?.message == "success") {
      Toast.show({
        type: "success",
        text1: "Ckeck your mail box",
        visibilityTime: 6000,
      });
    }
    if (data?.error) {
      Toast.show({
        type: "error",
        text1: data.error,
        visibilityTime: 6000,
      });
    }
  }, [data]);

  const submitRequest = () => {
    mutate("request-reset-password", {
      email,
    });
  };

  return (
    <View style={styles.containerImage}>
      <View>
        <Image style={styles.image} source={utils.Images.email} />
      </View>
      <Text style={styles.Text}> Entre your Email :</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor={utils.Color.font_color}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={submitRequest}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Text style={styles.loginText}>Envoyer</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          navigation.navigate("ResetPass");
        }}
      >
        <Text style={styles.loginText}>Reset Password</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  containerImage: {
    flex: 1,
    backgroundColor: "#F3EFE0",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    height: 250,
    width: 350,
    marginBottom: 20,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#f4f5f3",
    borderRadius: 25,
    height: 50,

    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  Text: {
    color: "#000",
    fontSize: 20,
    textAlign: "left",
    marginBottom: 30,
    fontWeight: "bold",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#3E5BAF",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 1,
  },
  loginText_1: {
    color: "#000",
  },
  loginText: {
    color: "white",
  },
});
export default ForgPass;
