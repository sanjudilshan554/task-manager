import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import { loginValidationSchema } from "../utils/validation";
import { AuthContext } from "../contexts/AuthContext";
import { login } from "../utils/api";

const LoginScreen = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);

  const handleLogin = async (values) => {
    try {
      const response = await login(values.email, values.password);
      setUser(response.data.user);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginValidationSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
          />
          {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
          <Button title="Login" onPress={handleSubmit} />
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Registration")}
          >
            Don’t have an account? Register
          </Text>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  error: { color: "red", marginBottom: 5 },
  link: { color: "blue", marginTop: 10, textAlign: "center" },
});

export default LoginScreen;
