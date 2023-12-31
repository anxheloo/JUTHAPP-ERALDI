import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Registration = ({ navigation }) => {
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPhoneNumberFocused, setIsPhoneNumberFocused] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+355 6");

  const [firstNameChecker, setFirstNameChecker] = useState(false);
  const [lastNameChecker, setLastnNameChecker] = useState(false);
  const [emailChecker, setEmailChecker] = useState(false);
  const [passwordChecker, setPasswordChecker] = useState(false);
  const [phoneNumberChecker, setPhoneNumberChecker] = useState(false);
  const [loader, setLoader] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const insets = useSafeAreaInsets();

  const registerUser = async () => {
    if (firstName.length === 0) {
      setFirstNameChecker(true);
      return;
    }

    if (lastName.length === 0) {
      setLastnNameChecker(true);
      return;
    }

    if (email.length === 0) {
      setEmailChecker(true);
      return;
    }

    if (password.length < 6) {
      setPasswordChecker(true);
      return;
    }

    if (!phoneNumber.startsWith("+355") || phoneNumber.length < 13) {
      setPhoneNumberChecker(true);
      return;
    }

    setLoader(true);

    const formattedPhoneNumber = phoneNumber.replace(/\s/g, "");

    try {
      const endpoint = "http://192.168.1.236:3000/api/register";
      const data = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        phonenumber: formattedPhoneNumber,
      };
      const response = await axios.post(endpoint, data);

      if (response.status === 201) {
        setLoader(false);
        setFirstNameChecker(false);
        setLastnNameChecker(false);
        setEmailChecker(false);
        setPhoneNumberChecker(false);
        setPasswordChecker(false);
        console.log(response.data);
        // Show success message popup
        Alert.alert(
          "Register Successfully!",
          "You have successfully registered the user.",
          [
            {
              text: "Ok",
              onPress: () => navigation.replace("Login"),
            },
          ]
        );
      } else {
        Alert.alert("Error Registering", "Please try again!", [
          {
            text: "Cancel",
            onPress: () => console.log(),
          },
          {
            text: "Continue",
            onPress: () => console.log(),
          },
          // { defaultIndex: 1 },
        ]);
      }
    } catch (error) {
      // console.log(error);
      Alert.alert("Error", "Oops, Error registering, try again", [
        {
          text: "Cancel",
          onPress: () => console.log(),
        },
        {
          text: "Continue",
          onPress: () => console.log(),
        },
        // { defaultIndex: 1 },
      ]);
    } finally {
      setLoader(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <LinearGradient
        style={(styles.container, { paddingTop: insets.top })}
        colors={[
          "#55e1ce",
          "#00cfe0",
          "#00bbf2",
          "#00a2fc",
          "#0083f4",
          "#4775ee",
          "#6964e5",
          "#8451d7",
          "#9952db",
          "#d555e1",
        ]}
      >
        <StatusBar style="auto"></StatusBar>

        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.headerTextLeft}
            onPress={() => {
              navigation.replace("Login");
            }}
          >
            <AntDesign name="left" size={24} color="white" />
            <Text style={styles.gigamarketText}>Kthehu</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ marginBottom: 50 }}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/images/unnamed.png")}
            ></Image>
          </View>

          <View style={{ paddingHorizontal: 25 }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.label}>Firstname</Text>
              <View
                style={styles.textInputContainer(
                  isFirstNameFocused ? "blue" : "gray"
                )}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Enter your firstname"
                  onFocus={() => {
                    setIsFirstNameFocused(true);
                    setFirstNameChecker(false);
                  }}
                  onBlur={() => setIsFirstNameFocused(false)}
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                ></TextInput>
              </View>
              {firstNameChecker && <Text>Shkruaj emrin</Text>}
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={styles.label}>Lastname</Text>
              <View
                style={styles.textInputContainer(
                  isLastNameFocused ? "blue" : "gray"
                )}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Enter your lastname"
                  onFocus={() => {
                    setIsLastNameFocused(true);
                    setLastnNameChecker(false);
                  }}
                  onBlur={() => setIsLastNameFocused(false)}
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                ></TextInput>
              </View>
              {lastNameChecker && <Text>Shkruaj mbiemrin</Text>}
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={styles.label}>Email</Text>
              <View
                style={styles.textInputContainer(
                  isEmailFocused ? "blue" : "gray"
                )}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  onFocus={() => {
                    setIsEmailFocused(true);
                    setEmailChecker(false);
                  }}
                  onBlur={() => setIsEmailFocused(false)}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                ></TextInput>
              </View>
              {emailChecker && <Text>Shkruaj Email-in</Text>}
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={styles.label}>Password</Text>
              <View
                style={styles.textInputContainer(
                  isPasswordFocused ? "blue" : "gray"
                )}
              >
                <TextInput
                  secureTextEntry={secureText}
                  style={styles.input}
                  placeholder="Enter your password"
                  onFocus={() => {
                    setIsPasswordFocused(true);
                    setPasswordChecker(false);
                  }}
                  onBlur={() => setIsPasswordFocused(false)}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                ></TextInput>

                <TouchableOpacity
                  onPress={() => {
                    setSecureText(!secureText);
                  }}
                >
                  <MaterialCommunityIcons
                    name={secureText ? "eye-off-outline" : "eye-outline"}
                    size={18}
                  ></MaterialCommunityIcons>
                </TouchableOpacity>
              </View>
              {passwordChecker && (
                <Text>Passwordi duhet te kete me shume se 6 karaktere</Text>
              )}
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={styles.label}>Phonenumber</Text>
              <View
                style={styles.textInputContainer(
                  isPhoneNumberFocused ? "blue" : "gray"
                )}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phonenumber"
                  onFocus={() => setIsPhoneNumberFocused(true)}
                  onBlur={() => setIsPhoneNumberFocused(false)}
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text)}
                  maxLength={14}
                ></TextInput>
              </View>
              {phoneNumberChecker && (
                <Text>Numri shume i shkurter ose format jo i sakte</Text>
              )}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                registerUser();
              }}
            >
              {loader ? (
                <ActivityIndicator></ActivityIndicator>
              ) : (
                <Text style={styles.btnText}>REGJISTROHU</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logoContainer: {
    height: windowHeight / 2,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  textInputContainer: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: "white",
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  }),

  label: {
    fontWeight: "regular",
    fontSize: 13,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: "right",
    color: "#FFF",
  },

  input: {
    flex: 1,
    height: "100%",
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: windowHeight * 0.05,
    width: windowWidth,
  },

  btn: {
    backgroundColor: "#25a8dd", // Set your desired button background color
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 16,
    width: windowWidth / 2,
  },

  btnText: {
    color: "#FFF",
    fontSize: 19,
    fontWeight: "bold",
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
    height: 50,
  },

  headerTextLeft: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
  },

  gigamarketText: {
    color: "white",
    fontSize: 23,
  },
});

export default Registration;
