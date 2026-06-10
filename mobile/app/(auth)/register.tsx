import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';
import { register } from '../../src/graphql/queries';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default role
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore(state => state.setAuth);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const { data } = await register({ name, email, password, role });
      if (data.register.token) {
        setAuth(data.register.token, data.register.user);
        router.replace('/(tabs)/');
      }
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6 justify-center">
        <View className="mb-8 items-center">
          <Text className="text-4xl font-bold text-gray-900 mb-2">Create Account</Text>
          <Text className="text-gray-500 text-lg">Join Flatbase today</Text>
        </View>

        <View className="space-y-4 mb-6">
          <View>
            <Text className="text-gray-700 font-medium mb-1">Full Name</Text>
            <TextInput
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View className="mt-4">
            <Text className="text-gray-700 font-medium mb-1">Email</Text>
            <TextInput
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View className="mt-4">
            <Text className="text-gray-700 font-medium mb-1">Password</Text>
            <TextInput
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Role Selection */}
          <View className="mt-4">
            <Text className="text-gray-700 font-medium mb-2">I want to...</Text>
            <View className="flex-row gap-4">
              <TouchableOpacity
                onPress={() => setRole('customer')}
                className={`flex-1 py-3 rounded-xl border ${role === 'customer' ? 'bg-blue-50 border-blue-600' : 'bg-gray-50 border-gray-200'}`}
              >
                <Text className={`text-center font-medium ${role === 'customer' ? 'text-blue-600' : 'text-gray-500'}`}>Book Flats</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setRole('seller')}
                className={`flex-1 py-3 rounded-xl border ${role === 'seller' ? 'bg-blue-50 border-blue-600' : 'bg-gray-50 border-gray-200'}`}
              >
                <Text className={`text-center font-medium ${role === 'seller' ? 'text-blue-600' : 'text-gray-500'}`}>List Flats</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          className="w-full bg-blue-600 rounded-xl py-4 items-center mt-2 mb-4"
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Register</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-2">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className="text-blue-600 font-bold">Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
