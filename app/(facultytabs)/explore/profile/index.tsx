import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserProfile {
  name: string;
  email: string;
  studentId: string;
  role: string;
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");

        if (!storedUser) {
          Alert.alert("Error", "User not logged in.");
          setLoading(false);
          return;
        }

        const user = JSON.parse(storedUser);
        if (!user.token) {
          Alert.alert("Error", "Authentication token missing");
          setLoading(false);
          return;
        }

        setProfile(user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading)
    return (
      <ActivityIndicator size="large" color="#5D5FEF" style={styles.loader} />
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <Text style={styles.label}>Full Name:</Text>
      <Text style={styles.text}>{profile?.name}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>{profile?.email}</Text>

      <Text style={styles.label}>Faculty ID:</Text>
      <Text style={styles.text}>{profile?.studentId}</Text>

      <Text style={styles.label}>Role:</Text>
      <Text style={styles.text}>{profile?.role}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6097ff",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "flex-start",
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    borderColor: "fff",
  },
  input: {
    width: "100%",
    backgroundColor: "#5556A1",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#fff",
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: "#5D5FEF",
    padding: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  saveButton: {
    backgroundColor: "#00A6FB",
    padding: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: "#E63946",
    padding: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
