import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useMutation } from '@apollo/client';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { GET_FLAT, GET_FLAT_REVIEWS, CREATE_BOOKING } from '../../src/graphql/queries';
import MonthCalendar from '../../src/components/MonthCalendar';
import { useAuthStore } from '../../src/store/authStore';

const ICON_MAP: Record<string, React.ComponentProps<typeof Ionicons>['name']> = {
  "WiFi": "wifi-outline",
  "Parking": "car-outline",
  "Kitchen": "restaurant-outline",
  "TV": "tv-outline",
  "AC": "snow-outline",
  "Pool": "water-outline",
  "Security": "shield-checkmark-outline",
  "Gym": "barbell-outline"
};

export default function FlatDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { token, user } = useAuthStore();

  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [monthsCount, setMonthsCount] = useState(0);
  const [isBooking, setIsBooking] = useState(false);

  // Queries
  const { data, loading, error } = useQuery(GET_FLAT, { variables: { id } });
  const { data: reviewsData, loading: loadingReviews } = useQuery(GET_FLAT_REVIEWS, { variables: { flatId: id } });

  // Booking Mutation
  const [createBookingMutation] = useMutation(CREATE_BOOKING);

  const flat = data?.flat;
  const reviews = reviewsData?.flatReviews || [];

  useEffect(() => {
    if (startMonth && endMonth) {
      const start = new Date(startMonth);
      const end = new Date(endMonth);
      if (end >= start) {
        const diff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
        setMonthsCount(diff);
      } else {
        setMonthsCount(0);
      }
    } else {
      setMonthsCount(0);
    }
  }, [startMonth, endMonth]);

  const checkAvailability = () => {
    if (!startMonth || !endMonth || monthsCount <= 0) return false;
    const blocked = flat?.blockedMonths || [];
    const start = new Date(startMonth);
    const end = new Date(endMonth);
    let current = new Date(start.getFullYear(), start.getMonth(), 1);

    while (current <= end) {
      const monthStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
      if (blocked.includes(monthStr)) {
        return false;
      }
      current.setMonth(current.getMonth() + 1);
    }
    return true;
  };

  const handleBooking = async () => {
    if (!token) {
      Alert.alert('Login Required', 'You must log in to book a flat.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Login', onPress: () => router.push('/(auth)/login') }
      ]);
      return;
    }

    if (user?.role !== 'customer') {
      Alert.alert('Restricted', 'Only customers can book flats. Sellers cannot make bookings.');
      return;
    }

    if (!startMonth || !endMonth || monthsCount <= 0) {
      Alert.alert('Invalid Dates', 'Please select start and end months.');
      return;
    }

    if (!checkAvailability()) {
      Alert.alert('Not Available', 'Selected dates conflict with existing bookings. Please pick other months.');
      return;
    }

    setIsBooking(true);
    try {
      const { data: bookingRes } = await createBookingMutation({
        variables: {
          flat: id,
          user: user._id,
          timePeriod: monthsCount.toString(),
          totalPrice: (flat.price || 0) * monthsCount,
          startDate: startMonth,
          endDate: endMonth
        }
      });
      if (bookingRes?.createBooking?._id) {
        router.push(`/booking/checkout?id=${bookingRes.createBooking._id}`);
      }
    } catch (err: any) {
      Alert.alert('Booking Error', err.message || 'Failed to create booking.');
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error || !flat) {
    return (
      <View className="flex-1 bg-white justify-center items-center px-6">
        <Ionicons name="alert-circle-outline" size={60} color="#dc2626" />
        <Text className="text-xl font-bold mt-4">Error loading flat</Text>
        <Text className="text-gray-500 text-center mt-2">{error?.message || 'Property not found.'}</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-6 bg-blue-600 px-6 py-3 rounded-xl">
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Custom Header */}
      <View className="px-6 py-4 flex-row items-center border-b border-gray-100 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900 flex-1 truncate" numberOfLines={1}>
          {flat.name || `Flat in ${flat.location}`}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Flat Image Banner */}
        <View className="relative">
          <Image
            source={{ uri: flat.images }}
            style={{ width: '100%', height: 260 }}
            contentFit="cover"
            transition={300}
          />
          <View className="absolute bottom-4 left-4 bg-black/60 px-4 py-2 rounded-2xl">
            <Text className="text-white font-bold text-lg">
              ₹{(flat.price || 0).toLocaleString()} <Text className="font-normal text-xs text-white/80">/ month</Text>
            </Text>
          </View>
          {flat.bookingCount >= 3 && (
            <View className="absolute top-4 left-4 bg-emerald-500 px-3 py-1 rounded-full shadow-sm flex-row items-center gap-1">
              <Ionicons name="trending-up" size={12} color="white" />
              <Text className="text-white font-semibold text-xs">Popular ({flat.bookingCount} booked)</Text>
            </View>
          )}
        </View>

        <View className="p-6 space-y-6">
          {/* Headline info */}
          <View>
            <Text className="text-2xl font-bold text-gray-950 mb-2">{flat.name}</Text>
            <View className="flex-row items-center gap-4 text-gray-500">
              <View className="flex-row items-center">
                <Ionicons name="location" size={16} color="#3b82f6" />
                <Text className="text-sm ml-1">{flat.location}</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="people" size={16} color="#3b82f6" />
                <Text className="text-sm ml-1">Up to {flat.capacity} guests</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View className="bg-gray-50 border border-gray-100 rounded-3xl p-5">
            <Text className="text-base font-bold text-gray-950 mb-2">About this space</Text>
            <Text className="text-gray-600 text-sm leading-6">{flat.description}</Text>
          </View>

          {/* Amenities Grid */}
          <View className="bg-gray-50 border border-gray-100 rounded-3xl p-5">
            <Text className="text-base font-bold text-gray-950 mb-4">Amenities</Text>
            {flat.amenities && flat.amenities.length > 0 ? (
              <View className="flex-row flex-wrap gap-2.5">
                {flat.amenities.map((item: string) => {
                  const iconName = ICON_MAP[item] || "home-outline";
                  return (
                    <View key={item} className="bg-white border border-gray-100 px-4 py-2.5 rounded-2xl flex-row items-center gap-2">
                      <Ionicons name={iconName} size={16} color="#3b82f6" />
                      <Text className="text-gray-700 text-sm font-semibold">{item}</Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <Text className="text-gray-400 italic text-sm">No amenities listed by host.</Text>
            )}
          </View>

          {/* Date Selector Panel */}
          {user?.role === 'seller' ? (
            <View className="bg-red-50 border border-red-100 p-5 rounded-3xl">
              <Text className="text-red-950 font-bold text-base mb-1">Booking Restricted</Text>
              <Text className="text-red-700 text-sm">Sellers cannot book properties. Only customers can make bookings.</Text>
            </View>
          ) : (
            <View className="bg-blue-50/50 border border-blue-100 p-5 rounded-3xl space-y-4">
              <Text className="text-base font-bold text-gray-950 flex-row items-center">
                <Ionicons name="calendar-outline" size={18} color="#3b82f6" /> Select Booking Dates
              </Text>
              <MonthCalendar
                blockedMonths={flat.blockedMonths || []}
                onDateSelect={({ start, end }) => {
                  setStartMonth(start);
                  setEndMonth(end);
                }}
              />

              <View className="bg-white rounded-2xl p-4 flex-row justify-between items-center shadow-sm border border-gray-100">
                <View>
                  <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Duration</Text>
                  <Text className="text-gray-900 font-extrabold text-lg">{monthsCount} months</Text>
                </View>
                <View className="items-end">
                  <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Total Price</Text>
                  <Text className="text-blue-600 font-extrabold text-xl">
                    ₹{((flat.price || 0) * (monthsCount > 0 ? monthsCount : 0)).toLocaleString()}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleBooking}
                disabled={isBooking || monthsCount <= 0}
                className="w-full bg-blue-600 rounded-2xl py-4 items-center flex-row justify-center gap-2 shadow-lg shadow-blue-600/30 disabled:opacity-50"
              >
                {isBooking ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Ionicons name="checkmark-circle-outline" size={20} color="white" />
                    <Text className="text-white font-extrabold text-lg">Book Now</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Host Info */}
          <View className="bg-gray-50 border border-gray-100 rounded-3xl p-5">
            <Text className="text-base font-bold text-gray-950 mb-4">About Host</Text>
            <View className="flex-row items-center gap-4">
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center">
                <Text className="text-blue-600 font-bold text-lg">
                  {(flat.seller?.name || "H")[0].toUpperCase()}
                </Text>
              </View>
              <View>
                <Text className="text-gray-900 font-bold text-base">{flat.seller?.name || 'Property Host'}</Text>
                <Text className="text-gray-500 text-xs mt-0.5">{flat.seller?.email}</Text>
              </View>
            </View>
            {flat.seller?.bio && (
              <Text className="text-gray-600 text-sm italic mt-4 border-l-2 border-blue-600 pl-3">
                {flat.seller.bio}
              </Text>
            )}
          </View>

          {/* Reviews List */}
          <View>
            <Text className="text-lg font-bold text-gray-950 mb-4">Guest Reviews</Text>
            {loadingReviews ? (
              <ActivityIndicator color="#3b82f6" />
            ) : reviews.length > 0 ? (
              <View className="space-y-4">
                {reviews.map((review: any) => (
                  <View key={review._id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                    <View className="flex-row justify-between items-start mb-2">
                      <View>
                        <Text className="text-gray-800 font-bold text-sm">{review.user?.name || 'Guest'}</Text>
                        <Text className="text-gray-400 text-[10px] mt-0.5">
                          {new Date(Number(review.createdAt)).toLocaleDateString()}
                        </Text>
                      </View>
                      <View className="flex-row gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Ionicons
                            key={star}
                            name={star <= review.rating ? "star" : "star-outline"}
                            size={12}
                            color={star <= review.rating ? "#eab308" : "#d1d5db"}
                          />
                        ))}
                      </View>
                    </View>
                    <Text className="text-gray-600 text-sm leading-5">{review.text}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View className="items-center py-6 bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
                <Ionicons name="star-outline" size={32} color="#9ca3af" />
                <Text className="text-gray-500 text-sm mt-2">No reviews yet for this listing</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
