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
import { fetchProfile, updateProfile } from "../../../../services/apii";

interface UserProfile {
  FullName: string;
  email: string;
  studentId: string;
  role: string;
  age: string;
  address: string;
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updatedFullName, setUpdatedFullName] = useState("");
  const [updatedAge, setUpdatedAge] = useState("");
  const [updatedAddress, setUpdatedAddress] = useState("");

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
        setUpdatedAge(user.age || "");
        setUpdatedAddress(user.address || "");

        // Fetch updated profile from API
        const data = await fetchProfile(user.token);
        if (data) {
          setProfile(data);
          await AsyncStorage.setItem("user", JSON.stringify(data)); // Update stored user info
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    try {
      const storedUserr = await AsyncStorage.getItem("user");
      if (storedUserr) {
        const user = JSON.parse(storedUserr);
        const token = user.token;
        if (!token) {
          Alert.alert("Error", "Authentication token missing");
          return;
        }

        const response = await fetch("http://192.168.2.118:5000/api/users", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            FullName: updatedFullName,
            age: updatedAge,
            address: updatedAddress,
          }),
        });

        const textResponse = await response.text(); // Read response as text first
        console.log("Raw API Response:", textResponse);

        // Ensure response is valid JSON
        const jsonResponse = JSON.parse(textResponse);
        console.log("Parsed JSON:", jsonResponse);

        if (jsonResponse.updatedUser) {
          setProfile(jsonResponse.updatedUser);
          setEditing(false);
          Alert.alert("Success", "Profile updated successfully");

          // Save updated profile details in AsyncStorage
          await AsyncStorage.setItem(
            "profile",
            JSON.stringify(jsonResponse.updatedUser)
          );
        } else {
          Alert.alert("Error", "Failed to update profile");
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  if (loading)
    return (
      <ActivityIndicator size="large" color="#5D5FEF" style={styles.loader} />
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {!editing ? (
        <>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.text}>{profile?.FullName}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{profile?.email}</Text>

          <Text style={styles.label}>Student ID:</Text>
          <Text style={styles.text}>{profile?.studentId}</Text>

          <Text style={styles.label}>Role:</Text>
          <Text style={styles.text}>{profile?.role}</Text>

          <Text style={styles.label}>Age:</Text>
          <Text style={styles.text}>{profile?.age}</Text>

          <Text style={styles.label}>Address:</Text>
          <Text style={styles.text}>{profile?.address}</Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditing(true)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Full Name:</Text>
          <TextInput
            style={styles.input}
            value={updatedFullName}
            onChangeText={setUpdatedFullName}
          />

          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={styles.input}
            value={updatedAge}
            onChangeText={setUpdatedAge}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Address:</Text>
          <TextInput
            style={styles.input}
            value={updatedAddress}
            onChangeText={setUpdatedAddress}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setEditing(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2D2E6E",
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
    color: "#A8A9FF",
    alignSelf: "flex-start",
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: "#FFF",
    marginBottom: 10,
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
