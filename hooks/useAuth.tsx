import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";

// User type definition
type User = {
  name: string;
  email: string;
  role: string;
  studentId: string;
  token: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (
    FullName: string,
    Studentid: string,
    password: string,
    email: string,
    role: string,
    schools: string
  ) => Promise<boolean>;
  signOut: () => Promise<void>;
};

function useProtectedRoute(user: User | null) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (segments[0] === "signup") {
      return;
    }

    if (!user) {
      router.replace("/login");
    } else if (segments[0] !== "(tabs)") {
      router.replace("/(tabs)");
    }
  }, [user, segments]);
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useProtectedRoute(user);

  useEffect(() => {
    AsyncStorage.getItem("user").then((userString) => {
      if (userString) {
        setUser(JSON.parse(userString));
      }
    });
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(
        "http://192.168.2.118:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const newUser: User = {
          name: data["FullName"],
          email: data["email"],
          role: data["role"],
          studentId: data["studentId"],
          token: data["token"],
        };
        await AsyncStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        if (data["role"] == "Student") {
          router.replace("/(tabs)");
        }
        if (data["role"] == "Faculty") {
          router.replace("/(facultytabs)/index");
        }

        return true;
      }
    } catch (error) {
      console.error("Login error:", error);
    }
    return false;
  };

  const signUp = async (
    FullName: string,
    Studentid: string,
    password: string,
    email: string,
    role: string,
    school: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        "http://192.168.2.118:5000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FullName: FullName,
            studentId: Studentid,
            role: role,
            school: school,
            email: email,
            password: password,
          }),
        }
      );
      if (response.ok) {
        router.replace("/login");
      }
      return response.ok;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const signOut = async (): Promise<void> => {
    await AsyncStorage.removeItem("user");
    setUser(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
