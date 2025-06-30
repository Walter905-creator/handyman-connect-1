import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👷 Welcome Pro!</Text>
      <Text style={styles.subtitle}>Join our network of trusted professionals</Text>
      
      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitItem}>✅ Unlimited leads for $59.99/month</Text>
        <Text style={styles.benefitItem}>✅ Direct client connections</Text>
        <Text style={styles.benefitItem}>✅ Instant push notifications</Text>
        <Text style={styles.benefitItem}>✅ Professional profile & reviews</Text>
        <Text style={styles.benefitItem}>✅ Payment protection</Text>
      </View>

      <TouchableOpacity 
        style={styles.signupButton}
        onPress={() => navigation.navigate('Pro Signup')}
      >
        <Text style={styles.signupButtonText}>Sign Up as Pro - $59.99/month</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Already a member? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 30
  },
  benefitsContainer: {
    marginBottom: 40
  },
  benefitItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
    paddingLeft: 10
  },
  signupButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  loginButton: {
    paddingVertical: 15,
    alignItems: 'center'
  },
  loginButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600'
  }
});
