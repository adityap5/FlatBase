import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Flat {
  _id: string;
  name: string;
  price: number;
  description: string;
  location: string;
  capacity?: number;
  images: string;
  bookingCount?: number;
}

interface FlatCardProps {
  flat: Flat;
}

export const FlatCard = React.memo(({ flat }: FlatCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push(`/flat/${flat._id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-5"
    >
      <View className="relative">
        <Image
          source={{ uri: flat.images }}
          style={{ height: 200, width: '100%' }}
          contentFit="cover"
          transition={200}
          placeholder={require('../../assets/icon.png')} // Fallback placeholder
        />
        <View className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full shadow-sm">
          <Text className="text-gray-900 font-bold text-sm">
            ₹{flat.price?.toLocaleString()}
            <Text className="text-gray-500 font-normal text-xs">/ mo</Text>
          </Text>
        </View>
        {flat.bookingCount !== undefined && flat.bookingCount >= 3 && (
          <View className="absolute top-3 left-3 bg-emerald-500 px-3 py-1 rounded-full shadow-sm flex-row items-center gap-1">
            <Ionicons name="trending-up" size={12} color="white" />
            <Text className="text-white font-semibold text-xs">Popular</Text>
          </View>
        )}
      </View>

      <View className="p-4">
        <View className="flex-row items-center mb-2">
          <Ionicons name="location-outline" size={14} color="#3b82f6" className="mr-1" />
          <Text className="text-gray-500 font-medium text-xs ml-1">{flat.location}</Text>
        </View>

        <Text className="text-gray-900 font-bold text-lg mb-1" numberOfLines={1}>
          Rooms in {flat.location}
        </Text>

        <Text className="text-gray-500 text-sm mb-4" numberOfLines={2}>
          {flat.description}
        </Text>

        <View className="bg-blue-600 rounded-xl py-3 items-center">
          <Text className="text-white font-bold text-sm">View Details</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});
