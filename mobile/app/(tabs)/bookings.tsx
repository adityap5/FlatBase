import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, Alert, Modal, TextInput } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { useAuthStore } from '../../src/store/authStore';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { GET_BOOKINGS, GET_SELLER_BOOKINGS, DELETE_BOOKING, ADD_REVIEW } from '../../src/graphql/queries';

export default function BookingsScreen() {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const isSeller = user?.role === 'seller';

  const {
    data: customerData,
    loading: loadingCustomer,
    refetch: refetchCustomer
  } = useQuery(GET_BOOKINGS, {
    variables: { userId: user?._id },
    skip: !token || isSeller || !user?._id,
    fetchPolicy: 'network-only'
  });

  const {
    data: sellerData,
    loading: loadingSeller,
    refetch: refetchSeller
  } = useQuery(GET_SELLER_BOOKINGS, {
    variables: { sellerId: user?._id },
    skip: !token || !isSeller || !user?._id,
    fetchPolicy: 'network-only'
  });

  const [cancelBooking] = useMutation(DELETE_BOOKING);
  const [submitReview, { loading: submittingReview }] = useMutation(ADD_REVIEW);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (isSeller) {
        await refetchSeller();
      } else {
        await refetchCustomer();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  }, [isSeller, refetchCustomer, refetchSeller]);

  if (!token) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center px-6">
        <Ionicons name="lock-closed-outline" size={80} color="#3b82f6" />
        <Text className="text-2xl font-bold text-gray-900 mt-6">Login Required</Text>
        <Text className="text-gray-500 text-center mt-2 mb-8">
          Please log in to manage your bookings and reservations.
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/(auth)/login')}
          className="w-full bg-blue-600 rounded-2xl py-4 items-center shadow-lg shadow-blue-600/30"
        >
          <Text className="text-white font-bold text-lg">Log In / Register</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const bookings = isSeller
    ? (sellerData?.sellerBookings || [])
    : (customerData?.myBookings || []).filter((b: any) => b.flat !== null);

  const handleCancelBooking = (bookingId: string) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              await cancelBooking({ variables: { id: bookingId } });
              Alert.alert('Success', 'Booking cancelled successfully');
              onRefresh();
            } catch (err: any) {
              Alert.alert('Error', err.message || 'Failed to cancel booking');
            }
          }
        }
      ]
    );
  };

  const handleOpenReview = (booking: any) => {
    setSelectedBooking(booking);
    setRating(5);
    setReviewText('');
    setReviewModalVisible(true);
  };

  const handleAddReview = async () => {
    if (!selectedBooking) return;
    try {
      await submitReview({
        variables: {
          flat: selectedBooking.flat._id,
          user: user._id,
          rating,
          text: reviewText
        }
      });
      Alert.alert('Success', 'Review submitted successfully!');
      setReviewModalVisible(false);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to submit review');
    }
  };

  const loading = loadingCustomer || loadingSeller;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <View className="px-6 py-4 bg-white border-b border-gray-100 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-gray-900">
          {isSeller ? 'Seller Bookings' : 'My Bookings'}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}
        refreshControl={<RefreshControl refreshing={refreshing || loading} onRefresh={onRefresh} colors={['#3b82f6']} />}
      >
        {bookings.length === 0 ? (
          <View className="items-center py-20 bg-white rounded-3xl border border-gray-100 mt-4">
            <Ionicons name="calendar-outline" size={64} color="#d1d5db" />
            <Text className="text-xl font-bold text-gray-800 mt-4">No Bookings Found</Text>
            <Text className="text-gray-500 text-center mt-2 px-6">
              {isSeller ? "No customers have booked your listings yet." : "You haven't booked any apartments yet."}
            </Text>
          </View>
        ) : (
          bookings.map((booking: any) => (
            <View key={booking._id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm mb-6">
              {!isSeller && (
                <View className="relative">
                  <Image
                    source={{ uri: booking.flat?.images }}
                    style={{ height: 160, width: '100%' }}
                    contentFit="cover"
                  />
                  <View className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full shadow-sm">
                    <Text className={`text-xs font-bold ${booking.paymentStatus === 'paid' ? 'text-emerald-600' : 'text-orange-500'}`}>
                      {booking.paymentStatus === 'paid' ? 'PAID' : 'PENDING'}
                    </Text>
                  </View>
                </View>
              )}

              <View className="p-5">
                <Text className="text-gray-950 font-bold text-lg mb-2">
                  {booking.flat?.name || 'Flat Room'}
                </Text>
                <View className="flex-row items-center mb-4">
                  <Ionicons name="location-outline" size={14} color="#3b82f6" />
                  <Text className="text-gray-500 text-xs ml-1">{booking.flat?.location}</Text>
                </View>

                {isSeller && (
                  <View className="bg-blue-50 border border-blue-100 rounded-2xl p-3 mb-4">
                    <Text className="text-blue-900 font-semibold text-xs">Customer Details</Text>
                    <Text className="text-blue-700 text-xs mt-1">Name: {booking.user?.name}</Text>
                    <Text className="text-blue-700 text-xs">Email: {booking.user?.email}</Text>
                  </View>
                )}

                <View className="bg-gray-50 rounded-2xl p-4 mb-4 flex-row justify-between items-center">
                  <View>
                    <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Duration</Text>
                    <Text className="text-gray-800 font-bold text-sm">{booking.timePeriod} months</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Total Paid</Text>
                    <Text className="text-blue-600 font-bold text-base">₹{booking.totalPrice?.toLocaleString()}</Text>
                  </View>
                </View>

                {booking.startDate && (
                  <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-gray-500 text-xs">Start: {booking.startDate}</Text>
                    <Text className="text-gray-500 text-xs">End: {booking.endDate}</Text>
                  </View>
                )}

                {!isSeller && (
                  <View className="flex-row gap-3">
                    {booking.paymentStatus === 'paid' ? (
                      <TouchableOpacity
                        onPress={() => handleOpenReview(booking)}
                        className="flex-1 bg-purple-50 border border-purple-100 rounded-xl py-3 items-center flex-row justify-center gap-2"
                      >
                        <Ionicons name="star" size={16} color="#9333ea" />
                        <Text className="text-purple-700 font-bold text-sm">Write Review</Text>
                      </TouchableOpacity>
                    ) : (
                      <>
                        <TouchableOpacity
                          onPress={() => handleCancelBooking(booking._id)}
                          className="bg-red-50 p-3 rounded-xl items-center justify-center border border-red-100"
                        >
                          <Ionicons name="trash-outline" size={18} color="#dc2626" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => router.push(`/booking/checkout?id=${booking._id}`)}
                          className="flex-1 bg-blue-600 rounded-xl py-3 items-center flex-row justify-center gap-2 shadow-sm"
                        >
                          <Ionicons name="card-outline" size={16} color="white" />
                          <Text className="text-white font-bold text-sm">Pay Now</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Review Modal */}
      <Modal visible={reviewModalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/50 justify-center p-6">
          <View className="bg-white rounded-3xl p-6 shadow-xl">
            <Text className="text-xl font-bold text-gray-900 mb-2">Rate your stay</Text>
            <Text className="text-gray-500 text-sm mb-6">How was your experience in {selectedBooking?.flat?.name}?</Text>

            <View className="flex-row justify-center gap-3 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Ionicons
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={36}
                    color={star <= rating ? '#eab308' : '#d1d5db'}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              placeholder="What did you like or dislike about this flat?"
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              numberOfLines={4}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-800 mb-6 h-28 text-left"
              style={{ textAlignVertical: 'top' }}
            />

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setReviewModalVisible(false)}
                className="flex-1 bg-gray-200 rounded-xl py-3 items-center"
              >
                <Text className="text-gray-700 font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddReview}
                disabled={submittingReview}
                className="flex-1 bg-blue-600 rounded-xl py-3 items-center shadow-sm"
              >
                <Text className="text-white font-bold">Submit Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
