import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  //ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { useAuthApi } from "../../hooks/mutateApi";
import { setUser } from "../../redux/actions/userAction";
import * as utils from "../../utils/";
import styles from "../../styles/Styles";

//import { connect, useDispatch } from "react-redux";
//import { login } from "../../redux/actions/userAction";
//import { useForm, Controller } from "react-hook-form";
/*import {
  LOGIN_USER_SUCCESS,
  TOGGLE_LOADER,
} from "../../redux/actions/actionTypes";
*/
function Login({ navigation }) {
  const { isLoading, data, error, mutate } = useAuthApi();
  const dispatch = useDispatch();
  /*const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});*/
  //const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const sigup = () => {
    mutate("signin", {
      email,
      password,
    });
  };

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
      navigation.navigate("BottomTab");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error.data.message,
        visibilityTime: 6000,
      });
      //console.log("error", error.data.message);
    }
  }, [error]);
  /*useEffect(() => {
    console.log("accesstoken", props.accessToken);
  }, []);

  /*const loginRequest = (data) => {
    // dispatch({type: TOGGLE_LOADER, payload: true});
    console.log("data", data);
    props.loginRequest(
      data,
      (response) => {
        console.log("response api", response);
        //dispatch({type: TOGGLE_LOADER, payload: false});

        navigation.navigate("BottomTab");
      },
      (err) => {
        //dispatch({type: TOGGLE_LOADER, payload: false});

        console.log("error api", err);
      }
    );
  };*/

  return (
    <ImageBackground source={utils.Images.page} style={styles.backgroundImage}>
      <ScrollView>
        <Text style={styles.text}> Connexion </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor={utils.Color.font_color}
            onChangeText={(text) => {
              setEmail(text);
            }}
            //defaultValue={value}
            //value={value}
          />
          {/* <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
              
              );
            }}
            name="email"
            rules={{
              required: { value: true, message: "obligatoire" },
            }}
            defaultValue=""
          />*/}
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Mot de passe...."
            placeholderTextColor={utils.Color.font_color}
            onChangeText={(text) => {
              setPasword(text);
            }}
            //defaultValue={value}
            //value={value}
          />
          {/*<Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
               
              );
            }}
            name="password"
            rules={{
              required: { value: true, message: "obligatoire" },
            }}
            defaultValue=""
          />*/}
        </View>
        <TouchableOpacity>
          <Text
            style={styles.forgot}
            onPress={() => navigation.navigate("ForgPass")}
          >
            Mot de passe oublié ?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={sigup}>
          <Text style={styles.loginText}>
            {isLoading ? "Loading ..." : "Connexion"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.loginBtn}
            onPress={() => navigation.navigate("SignUp")}
          >
            S'inscrire
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Toast />
    </ImageBackground>
  );
}

export default Login;
