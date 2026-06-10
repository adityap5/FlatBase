import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useMutation } from '@apollo/client';
import { useAuthStore } from '../../src/store/authStore';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { ADD_FLAT, GET_FLATS } from '../../src/graphql/queries';

const AVAILABLE_AMENITIES = ['WiFi', 'Parking', 'Kitchen', 'AC', 'Pool', 'Security', 'Gym', 'TV'];
const LOCATIONS = ["Chandigarh", "Agra", "Jaipur", "NewDelhi", "Banglore", "Hyderabad", "Haryana", "Mathura", "Varanasi", "Shimla", "Noida"];

export default function AddFlatScreen() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('Chandigarh');
  const [capacity, setCapacity] = useState('');
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const [addFlatMutation, { loading }] = useMutation(ADD_FLAT, {
    refetchQueries: [{ query: GET_FLATS }]
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to upload images!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
      base64: true
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setImageUri(result.assets[0].uri);
      setBase64Image(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(prev => prev.filter(a => a !== amenity));
    } else {
      setAmenities(prev => [...prev, amenity]);
    }
  };

  const handleSubmit = async () => {
    if (!name || !price || !capacity || !description || !base64Image) {
      Alert.alert('Error', 'Please fill in all fields and select a property image.');
      return;
    }

    try {
      await addFlatMutation({
        variables: {
          name,
          price: parseFloat(price),
          location,
          capacity: parseInt(capacity),
          description,
          amenities,
          images: base64Image,
          seller: user?._id
        }
      });
      Alert.alert('Success', 'Property added successfully! 🎉', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to add property');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">Add Flat</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        <View className="space-y-4 mb-6">
          <View>
            <Text className="text-gray-700 font-bold text-sm mb-1.5">Property Name</Text>
            <TextInput
              placeholder="e.g. Luxury Penthouse"
              value={name}
              onChangeText={setName}
              className="bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 shadow-sm"
            />
          </View>

          <View className="flex-row gap-4 mt-4">
            <View className="flex-1">
              <Text className="text-gray-700 font-bold text-sm mb-1.5">Price (₹ / mo)</Text>
              <TextInput
                placeholder="e.g. 15000"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                className="bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 shadow-sm"
              />
            </View>
            <View className="flex-1">
              <Text className="text-gray-700 font-bold text-sm mb-1.5">Capacity (Guests)</Text>
              <TextInput
                placeholder="e.g. 2"
                value={capacity}
                onChangeText={setCapacity}
                keyboardType="numeric"
                className="bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 shadow-sm"
              />
            </View>
          </View>

          {/* Location Horizontal Scroll List */}
          <View className="mt-4">
            <Text className="text-gray-700 font-bold text-sm mb-2">Location</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row py-1">
              {LOCATIONS.map(loc => (
                <TouchableOpacity
                  key={loc}
                  onPress={() => setLocation(loc)}
                  className={`px-4 py-2.5 rounded-full border mr-3 ${location === loc ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-200'}`}
                >
                  <Text className={`font-semibold text-xs ${location === loc ? 'text-white' : 'text-gray-600'}`}>{loc}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Description */}
          <View className="mt-4">
            <Text className="text-gray-700 font-bold text-sm mb-1.5">Description</Text>
            <TextInput
              placeholder="Describe your flat, rules, surroundings..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              className="bg-white border border-gray-200 rounded-2xl p-4 text-gray-800 h-28 text-left shadow-sm"
              style={{ textAlignVertical: 'top' }}
            />
          </View>

          {/* Amenities selection */}
          <View className="mt-4">
            <Text className="text-gray-700 font-bold text-sm mb-2">Amenities</Text>
            <View className="flex-row flex-wrap gap-2.5">
              {AVAILABLE_AMENITIES.map(item => {
                const isSelected = amenities.includes(item);
                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => handleAmenityToggle(item)}
                    className={`px-4 py-2.5 rounded-2xl border ${isSelected ? 'bg-blue-50 border-blue-600' : 'bg-white border-gray-200'}`}
                  >
                    <Text className={`font-semibold text-xs ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Image Picker */}
          <View className="mt-4">
            <Text className="text-gray-700 font-bold text-sm mb-2">Property Image</Text>
            {imageUri ? (
              <View className="relative w-full h-48 rounded-3xl overflow-hidden border border-gray-200">
                <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
                <TouchableOpacity
                  onPress={() => { setImageUri(null); setBase64Image(null); }}
                  className="absolute top-3 right-3 bg-red-600 p-2 rounded-full shadow-sm"
                >
                  <Ionicons name="trash" size={16} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={pickImage}
                className="w-full h-48 bg-white border-2 border-dashed border-gray-300 rounded-3xl items-center justify-center p-6 shadow-sm"
              >
                <Ionicons name="cloud-upload-outline" size={40} color="#9ca3af" />
                <Text className="text-gray-500 font-bold mt-2">Upload Image</Text>
                <Text className="text-gray-400 text-xs mt-1">JPEG, PNG up to 2MB</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 rounded-2xl py-4 items-center flex-row justify-center gap-2 shadow-lg shadow-blue-600/30 mt-4"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="checkmark" size={20} color="white" />
              <Text className="text-white font-extrabold text-lg">Add Listing</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
