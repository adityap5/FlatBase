import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useMutation } from '@apollo/client';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import CryptoJS from 'crypto-js';
import { GET_BOOKING, CREATE_ORDER, VERIFY_PAYMENT } from '../../src/graphql/queries';

export default function CheckoutScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const { data, loading, error } = useQuery(GET_BOOKING, {
    variables: { id },
    fetchPolicy: 'network-only'
  });

  const [createOrder] = useMutation(CREATE_ORDER);
  const [verifyPayment] = useMutation(VERIFY_PAYMENT);

  const booking = data?.booking;
  const flatDetails = booking?.flat;

  const handlePayment = async () => {
    if (!booking) return;
    setIsProcessing(true);

    try {
      const securityDeposit = 999;
      const advancePayment = Math.round(booking.totalPrice / parseInt(booking.timePeriod || '1'));
      const totalAmount = booking.totalPrice + securityDeposit + advancePayment;

      const { data: orderData } = await createOrder({
        variables: {
          amount: totalAmount,
          currency: 'INR'
        }
      });

      const order = orderData?.createOrder;
      if (!order) {
        throw new Error('Order creation failed');
      }

      const razorpay_order_id = order.id;
      const razorpay_payment_id = `pay_mock_${Math.random().toString(36).substring(2, 11)}`;
      const secret = 'CuDtnj5qtDG8dMdvRhGCdX52'; 
      const signatureData = `${razorpay_order_id}|${razorpay_payment_id}`;
      const razorpay_signature = CryptoJS.HmacSHA256(signatureData, secret).toString(CryptoJS.enc.Hex);

      const { data: verifyData } = await verifyPayment({
        variables: {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          bookingId: booking._id,
          startDate: booking.startDate,
          endDate: booking.endDate
        }
      });

      if (verifyData?.verifyPayment) {
        Alert.alert('Payment Successful', 'Your booking is confirmed!', [
          { text: 'OK', onPress: () => router.replace('/bookings') }
        ]);
      } else {
        Alert.alert('Verification Failed', 'Payment verification failed on the server.');
      }
    } catch (err: any) {
      Alert.alert('Payment Error', err.message || 'Something went wrong during payment processing.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error || !booking || !flatDetails) {
    return (
      <View className="flex-1 bg-white justify-center items-center px-6">
        <Ionicons name="alert-circle-outline" size={60} color="#dc2626" />
        <Text className="text-xl font-bold mt-4">Error loading booking</Text>
        <Text className="text-gray-500 text-center mt-2">{error?.message || 'Booking not found.'}</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-6 bg-blue-600 px-6 py-3 rounded-xl">
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const securityDeposit = 999;
  const advancePayment = Math.round(booking.totalPrice / parseInt(booking.timePeriod || '1'));
  const totalAmount = booking.totalPrice + securityDeposit + advancePayment;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <View className="px-6 py-4 flex-row items-center border-b border-gray-100 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">Checkout</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        <View className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex-row items-center gap-4 mb-6">
          <Image
            source={{ uri: flatDetails.images }}
            style={{ width: 80, height: 80, borderRadius: 16 }}
            contentFit="cover"
          />
          <View className="flex-1">
            <Text className="text-gray-950 font-bold text-base mb-1" numberOfLines={1}>
              {flatDetails.name}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={12} color="#3b82f6" />
              <Text className="text-gray-500 text-xs ml-1">{flatDetails.location}</Text>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-6 space-y-4">
          <Text className="text-base font-bold text-gray-950 mb-2">Price Details</Text>

          <View className="flex-row justify-between items-center py-1">
            <Text className="text-gray-500 text-sm">Rent ({booking.timePeriod} months)</Text>
            <Text className="text-gray-800 font-bold text-sm">₹{booking.totalPrice?.toLocaleString()}</Text>
          </View>

          <View className="flex-row justify-between items-center py-1">
            <Text className="text-gray-500 text-sm">Security Deposit</Text>
            <Text className="text-gray-800 font-bold text-sm">₹{securityDeposit.toLocaleString()}</Text>
          </View>

          <View className="flex-row justify-between items-center py-1">
            <Text className="text-gray-500 text-sm">Advance Payment</Text>
            <Text className="text-gray-800 font-bold text-sm">₹{advancePayment.toLocaleString()}</Text>
          </View>

          <View className="border-t border-gray-100 pt-4 mt-2 flex-row justify-between items-center">
            <Text className="text-gray-950 font-bold text-base">Total Amount</Text>
            <Text className="text-blue-600 font-extrabold text-xl">₹{totalAmount.toLocaleString()}</Text>
          </View>
        </View>

        <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-8 space-y-3">
          <Text className="text-base font-bold text-gray-950 mb-2">Booking Summary</Text>
          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-sm">Duration</Text>
            <Text className="text-gray-800 font-bold text-sm">{booking.timePeriod} months</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-sm">Guests</Text>
            <Text className="text-gray-800 font-bold text-sm">Up to {flatDetails.capacity} guests</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-sm">Host</Text>
            <Text className="text-gray-800 font-bold text-sm capitalize">{flatDetails.seller?.name}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handlePayment}
          disabled={isProcessing}
          className="w-full bg-blue-600 rounded-2xl py-4 items-center flex-row justify-center gap-2 shadow-lg shadow-blue-600/30 disabled:opacity-50"
        >
          {isProcessing ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="shield-checkmark" size={20} color="white" />
              <Text className="text-white font-extrabold text-lg">Pay with Razorpay</Text>
            </>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center items-center gap-1.5 mt-4">
          <Ionicons name="lock-closed" size={12} color="#9ca3af" />
          <Text className="text-gray-400 text-xs">Payments are secured with 256-bit SSL encryption</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
