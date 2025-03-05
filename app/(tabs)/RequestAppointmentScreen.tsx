import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { requestAppointment } from "@/services/api";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RequestAppointmentScreen() {
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(true);
  const [studentEmail, setStudentEmail] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [facultyEmail, setFacultyEmail] = useState("");
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const router = useRouter();
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setStudentName(user.name);
          setStudentEmail(user.email);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleSubmit = async () => {
    const appointmentData = {
      studentName,
      studentEmail,
      facultyName,
      facultyEmail,
      title,
      description,
      date,
      time,
    };
    const response = await requestAppointment(appointmentData);

    if (response) {
      Alert.alert("Success", "Appointment request submitted successfully!");
    } else {
      Alert.alert("Error", "Failed to submit appointment request.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request an Appointment</Text>
      <TextInput
        label="Your Name"
        value={studentName}
        onChangeText={setStudentName}
        editable={false}
        style={styles.textinput}
      />
      <TextInput
        label="Your Email"
        value={studentEmail}
        onChangeText={setStudentEmail}
        keyboardType="email-address"
        editable={false}
        style={styles.textinput}
      />
      <TextInput
        label="Faculty Name"
        value={facultyName}
        onChangeText={setFacultyName}
        style={styles.textinput}
      />
      <TextInput
        label="Faculty Email"
        value={facultyEmail}
        onChangeText={setFacultyEmail}
        keyboardType="email-address"
        style={styles.textinput}
      />
      <TextInput
        label="Title"
        value={title}
        onChangeText={settitle}
        multiline
        style={styles.textinput}
      />
      <TextInput
        label="Decription"
        value={description}
        onChangeText={setdescription}
        multiline
        style={styles.textinput}
      />
      <TextInput
        label="Date"
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        style={styles.textinput}
      />
      <TextInput
        label="Time"
        value={time}
        onChangeText={setTime}
        placeholder="HH:MM AM/PM"
        style={styles.textinput}
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Submit Request
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  textinput: { backgroundColor: "#6097ff", marginBottom: 10, color: "#fff" },
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, color: "#333" },
  button: { marginTop: 20, backgroundColor: "#6097ff" },
});
