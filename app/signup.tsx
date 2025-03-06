import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../hooks/useAuth"; // Update the path as necessary
import { Image } from "react-native";
import { Link } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";

const roles = ["Faculty", "Student", "Bridge"];

export default function SignUpPage() {
  const { signUp } = useAuth(); // Access the signUp function from useAuth
  const [FullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); // User's role (e.g., "ADMINISTRATOR", "DEFAULT", etc.)
  const [customschools, setcustomSchools] = useState("");
  const [school, setSchool] = useState("");
  const [Studentid, setstudentid] = useState("");
  const [error, setError] = useState("");
  const schools = [
    "School of Business",
    "School of Technology",
    "School of Sciences",
    "School of Arts and Design",
    "School of Architecture and Planning",
    "School of Liberal Arts and Humanities",
    "School of Laws",
  ];
  const handleSignUp = async () => {
    if (!FullName || !password || !email || !role || !Studentid || !school) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const success = await signUp(
        FullName,
        Studentid,
        password,
        email,
        role,
        school
      );
      if (success) {
        alert("Signup successful!");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Image
              source={require("../assets/images/auth.avif")}
              style={styles.logo}
            />
            <Text style={styles.title}>Welcome to TaskSense</Text>

            {/* Signup form */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="FullName"
                value={FullName}
                onChangeText={setFullName}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Id</Text>
              <TextInput
                style={styles.input}
                placeholder="Studentid"
                value={Studentid}
                onChangeText={setstudentid}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                textContentType="emailAddress"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Role</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={role}
                  onValueChange={(itemValue) => setRole(itemValue)}
                  style={styles.picker}
                  itemStyle={{ height: 200 }} // Helps adjust for iOS
                >
                  <Picker.Item label="Select your role" value="" />
                  {roles.map((role, index) => (
                    <Picker.Item key={index} label={role} value={role} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>School</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={school}
                  onValueChange={(itemValue) => setSchool(itemValue)}
                  style={styles.picker}
                >
                  {schools.map((schoolName, index) => (
                    <Picker.Item
                      key={index}
                      label={schoolName}
                      value={schoolName}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSignUp}
            >
              <Text style={styles.submitButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text>Already have an account? </Text>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.signupLink}>Sign in</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: "#6097ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupLink: {
    color: "#6097ff",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  pickerContainer: {
    borderWidth: 0.25,
    borderColor: "black",
    borderRadius: 8,
  },
  picker: {
    backgroundColor: "transparent",
  },
});
