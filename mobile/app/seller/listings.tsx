import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { useAuthStore } from '../../src/store/authStore';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { GET_FLATS, DELETE_FLAT } from '../../src/graphql/queries';

export default function SellerListingsScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);

  const { data, loading, refetch } = useQuery(GET_FLATS, {
    fetchPolicy: 'network-only'
  });

  const [deleteListingMutation] = useMutation(DELETE_FLAT);

  const myListings = useMemo(() => {
    if (!data?.flats || !user?._id) return [];
    return data.flats.filter((flat: any) => flat.seller?._id === user._id);
  }, [data, user?._id]);

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Listing',
      'Are you sure you want to delete this property? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteListingMutation({ variables: { id } });
              Alert.alert('Success', 'Listing deleted successfully');
              refetch();
            } catch (err: any) {
              Alert.alert('Error', err.message || 'Failed to delete listing');
            }
          }
        }
      ]
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <View className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm mb-5 p-4 flex-row gap-4">
        <Image
          source={{ uri: item.images }}
          style={{ width: 90, height: 90, borderRadius: 18 }}
          contentFit="cover"
        />
        <View className="flex-1 justify-between py-1">
          <View>
            <Text className="text-gray-950 font-bold text-base" numberOfLines={1}>
              {item.name}
            </Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="location-outline" size={12} color="#3b82f6" />
              <Text className="text-gray-500 text-xs ml-1">{item.location}</Text>
            </View>
            <Text className="text-blue-600 font-bold text-sm mt-1">
              ₹{item.price?.toLocaleString()} <Text className="text-gray-400 font-normal text-xs">/ mo</Text>
            </Text>
          </View>

          {/* Action buttons */}
          <View className="flex-row gap-2 mt-2">
            <TouchableOpacity
              onPress={() => router.push(`/seller/update/${item._id}`)}
              className="bg-blue-50 px-3 py-1.5 rounded-xl flex-row items-center gap-1"
            >
              <Ionicons name="create-outline" size={14} color="#3b82f6" />
              <Text className="text-blue-600 font-bold text-xs">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item._id)}
              className="bg-red-50 px-3 py-1.5 rounded-xl flex-row items-center gap-1"
            >
              <Ionicons name="trash-outline" size={14} color="#dc2626" />
              <Text className="text-red-600 font-bold text-xs">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-100 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">My Listings</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/seller/add-flat')}
          className="bg-blue-600 p-2.5 rounded-full shadow-sm shadow-blue-600/30"
        >
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* List */}
      {loading && !refreshing ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : myListings.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <Ionicons name="business-outline" size={64} color="#d1d5db" />
          <Text className="text-xl font-bold text-gray-800 mt-4">No Listings Yet</Text>
          <Text className="text-gray-500 text-center mt-2 mb-6">
            You haven't listed any flats for rent yet. Tap the + icon to add your first property!
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/seller/add-flat')}
            className="bg-blue-600 rounded-2xl px-6 py-3.5"
          >
            <Text className="text-white font-bold text-base">Add Property</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1, minHeight: 2 }}>
          <FlashList
            data={myListings}
            renderItem={renderItem}
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}
            refreshing={refreshing}
            onRefresh={onRefresh}
            keyExtractor={(item: any) => item._id}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
