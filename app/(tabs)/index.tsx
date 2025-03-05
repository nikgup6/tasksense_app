import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Button, Text, Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "expo-router";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const [token, settoken] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserName(user.name);
          setUserEmail(user.email); // Extract user email
          settoken(user.token);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userEmail) return;

      try {
        if (!token) throw new Error("No authentication token found");

        const response = await fetch(
          `http://192.168.2.118:5000/api/appointments/student/${encodeURIComponent(
            userEmail
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const text = await response.text(); // Get raw response

        const data = JSON.parse(text); // Parse JSON
        setAppointments(data); // Directly set the array
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userEmail]);

  const handleSelectAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#fff", dark: "#fff" }}
      headerImage={
        <Image
          source={require("@/assets/images/auth.avif")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">TaskSense</ThemedText>
      </ThemedView>

      <View>
        <Text style={styles.title}>
          Welcome, {userName ? userName : "Guest"}!!!
        </Text>
        <ThemedText style={styles.subtitle}>
          Simplified Management Portal
        </ThemedText>
      </View>
      <View>
        <Button onPress={() => router.push("/(tabs)/RequestAppointmentScreen")}>
          Add New Appointment
        </Button>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Loading appointments...</Text>
      ) : (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              📅 Upcoming(Approved) Appointments
            </Text>
            <FlatList
              data={appointments.filter((appt) => appt.status === "upcoming")}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectAppointment(item)}>
                  <Card style={styles.card}>
                    <Card.Content>
                      <Text style={styles.appointmentTitle}>{item.title}</Text>
                      <Text style={styles.appointmentDate}>
                        {item.date} - {item.time}
                      </Text>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⏲️Pending Apointments</Text>
            <FlatList
              data={appointments.filter((appt) => appt.status === "pending")}
              keyExtractor={(item) => item._id} // Use _id instead of id
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectAppointment(item)}>
                  <Card style={styles.card}>
                    <Card.Content>
                      <Text style={styles.appointmentTitle}>{item.title}</Text>
                      <Text style={styles.appointmentDate}>
                        {new Date(item.date).toDateString()} - {item.time}
                      </Text>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔙 Past Appointments</Text>
            <FlatList
              data={appointments.filter((appt) => appt.status === "past")}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectAppointment(item)}>
                  <Card style={styles.card}>
                    <Card.Content>
                      <Text style={styles.appointmentTitle}>{item.title}</Text>
                      <Text style={styles.appointmentDate}>
                        {item.date} - {item.time}
                      </Text>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedAppointment && (
              <>
                <Text style={styles.modalTitle}>
                  {selectedAppointment.title}
                </Text>
                <Text style={styles.modalText}>
                  📅 Date: {selectedAppointment.date}
                </Text>
                <Text style={styles.modalText}>
                  ⏰ Time: {selectedAppointment.time}
                </Text>
                <Button
                  mode="contained"
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  Close
                </Button>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  reactLogo: { height: 170, width: "100%", position: "absolute" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  section: { marginVertical: 15, paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  card: { marginBottom: 10, padding: 10 },
  appointmentTitle: { fontSize: 18, fontWeight: "bold" },
  appointmentDate: { fontSize: 14, color: "#555" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  modalText: { fontSize: 18, marginBottom: 5 },
  closeButton: { marginTop: 20 },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
});
