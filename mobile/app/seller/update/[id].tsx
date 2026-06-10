import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useMutation } from '@apollo/client';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GET_FLAT, UPDATE_FLAT, GET_FLATS } from '../../../src/graphql/queries';

const AVAILABLE_AMENITIES = ['WiFi', 'Parking', 'Kitchen', 'AC', 'Pool', 'Security', 'Gym', 'TV'];
const LOCATIONS = ["Chandigarh", "Agra", "Jaipur", "NewDelhi", "Banglore", "Hyderabad", "Haryana", "Mathura", "Varanasi", "Shimla", "Noida"];

export default function UpdateFlatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('Chandigarh');
  const [capacity, setCapacity] = useState('');
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);

  // Query flat data
  const { data, loading: loadingQuery } = useQuery(GET_FLAT, {
    variables: { id },
    onCompleted: (flatData) => {
      if (flatData?.flat) {
        setName(flatData.flat.name || '');
        setPrice(String(flatData.flat.price || ''));
        setLocation(flatData.flat.location || 'Chandigarh');
        setCapacity(String(flatData.flat.capacity || ''));
        setDescription(flatData.flat.description || '');
        setAmenities(flatData.flat.amenities || []);
      }
    }
  });

  const [updateFlatMutation, { loading: updating }] = useMutation(UPDATE_FLAT, {
    refetchQueries: [{ query: GET_FLATS }, { query: GET_FLAT, variables: { id } }]
  });

  const handleAmenityToggle = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(prev => prev.filter(a => a !== amenity));
    } else {
      setAmenities(prev => [...prev, amenity]);
    }
  };

  const handleUpdate = async () => {
    if (!name || !price || !capacity || !description) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      await updateFlatMutation({
        variables: {
          id,
          name,
          price: parseFloat(price),
          location,
          capacity: parseInt(capacity),
          description,
          amenities
        }
      });
      Alert.alert('Success', 'Property updated successfully! 🎉', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to update property');
    }
  };

  if (loadingQuery) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">Edit Flat</Text>
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
        </View>

        {/* Submit */}
        <TouchableOpacity
          onPress={handleUpdate}
          disabled={updating}
          className="w-full bg-blue-600 rounded-2xl py-4 items-center flex-row justify-center gap-2 shadow-lg shadow-blue-600/30 mt-4"
        >
          {updating ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="checkmark" size={20} color="white" />
              <Text className="text-white font-extrabold text-lg">Update Listing</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
