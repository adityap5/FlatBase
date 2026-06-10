import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { GET_POPULAR_FLATS, GET_POPULAR_CITIES, GET_FLATS } from '../../src/graphql/queries';
import { FlatCard } from '../../src/components/FlatCard';
import CardSkeleton from '../../src/components/CardSkeleton';

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const { data: popularFlatsData, loading: loadingPopularFlats, refetch: refetchPopularFlats } = useQuery(GET_POPULAR_FLATS);
  const { data: popularCitiesData, loading: loadingPopularCities, refetch: refetchPopularCities } = useQuery(GET_POPULAR_CITIES);
  const { data: flatsData, loading: loadingFlats, refetch: refetchFlats } = useQuery(GET_FLATS);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchPopularFlats(), refetchPopularCities(), refetchFlats()]);
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  }, [refetchPopularFlats, refetchPopularCities, refetchFlats]);

  const popularFlats = popularFlatsData?.popularFlats || [];
  const popularCities = popularCitiesData?.popularCities || [];
  const flats = flatsData?.flats || [];

  const handleCityPress = (city: string) => {
    router.push({
      pathname: '/(tabs)/search',
      params: { location: city }
    });
  };

  const loading = loadingPopularFlats || loadingPopularCities || loadingFlats;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#3b82f6']} />}
      >
        {/* Banner / Header */}
        <View className="bg-blue-600 px-6 pt-6 pb-12 rounded-b-[36px]">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-white/80 text-sm font-medium">Find your home</Text>
              <Text className="text-white text-3xl font-extrabold">Flatbase</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} className="bg-white/20 p-2 rounded-full">
              <Ionicons name="person-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Search bar placeholder redirecting to Search screen */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/(tabs)/search')}
            className="bg-white rounded-2xl flex-row items-center px-4 py-3.5 shadow-md shadow-blue-900/20"
          >
            <Ionicons name="search" size={20} color="#9ca3af" className="mr-2" />
            <Text className="text-gray-400 text-base ml-2">Search destination, city...</Text>
          </TouchableOpacity>
        </View>

        {/* Content Container */}
        <View className="px-6 -mt-6">
          {/* Popular Cities */}
          {popularCities.length > 0 && (
            <View className="mb-8">
              <View className="flex-row items-center gap-2 mb-4">
                <Ionicons name="navigate-circle" size={24} color="#3b82f6" />
                <Text className="text-xl font-bold text-gray-900">Popular Destinations</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                {popularCities.map((item: any) => (
                  <TouchableOpacity
                    key={item.city}
                    onPress={() => handleCityPress(item.city)}
                    activeOpacity={0.8}
                    className="relative w-40 h-48 rounded-3xl overflow-hidden mr-4 shadow-sm border border-gray-100"
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{ width: '100%', height: '100%' }}
                      contentFit="cover"
                      transition={200}
                    />
                    <View className="absolute inset-0 bg-black/40 justify-end p-4">
                      <Text className="text-white font-bold text-lg">{item.city}</Text>
                      <Text className="text-white/80 text-xs">
                        {item.count} bookings
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Popular Flats */}
          {popularFlats.length > 0 && (
            <View className="mb-8">
              <View className="flex-row items-center gap-2 mb-4">
                <Ionicons name="heart" size={24} color="#ef4444" />
                <Text className="text-xl font-bold text-gray-900">Trending Flats</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                {popularFlats.map((flat: any) => (
                  <TouchableOpacity
                    key={`pop-${flat._id}`}
                    activeOpacity={0.9}
                    onPress={() => router.push(`/flat/${flat._id}`)}
                    className="w-64 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mr-4"
                  >
                    <Image
                      source={{ uri: flat.images }}
                      style={{ height: 140, width: '100%' }}
                      contentFit="cover"
                      transition={200}
                    />
                    <View className="p-4">
                      <Text className="text-gray-900 font-bold text-base" numberOfLines={1}>Rooms in {flat.location}</Text>
                      <Text className="text-blue-600 font-bold text-sm mt-1">₹{flat.price?.toLocaleString()} / mo</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Recently Added Section */}
          <View className="mb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-900">Recently Added</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
                <Text className="text-blue-600 font-bold text-sm">View All</Text>
              </TouchableOpacity>
            </View>

            {loading ? (
              <View>
                <CardSkeleton />
                <CardSkeleton />
              </View>
            ) : flats.length === 0 ? (
              <View className="items-center py-10 bg-white rounded-3xl border border-gray-100">
                <Ionicons name="file-tray-outline" size={48} color="#9ca3af" />
                <Text className="text-gray-500 mt-2">No properties available</Text>
              </View>
            ) : (
              flats.slice(0, 8).map((flat: any) => (
                <FlatCard key={flat._id} flat={flat} />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
