import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { useAuthStore } from '../../src/store/authStore';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GET_SELLER_ANALYTICS } from '../../src/graphql/queries';

type ReportType = 'revenue' | 'bookings';

export default function SellerAnalyticsScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [reportType, setReportType] = useState<ReportType>('revenue');
  const [refreshing, setRefreshing] = useState(false);

  const { data, loading, refetch, error } = useQuery(GET_SELLER_ANALYTICS, {
    variables: { sellerId: user?._id },
    skip: !user?._id,
    fetchPolicy: 'network-only'
  });

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

  if (loading && !refreshing) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error || !data?.sellerAnalytics) {
    return (
      <View className="flex-1 bg-white justify-center items-center px-6">
        <Ionicons name="alert-circle-outline" size={60} color="#dc2626" />
        <Text className="text-xl font-bold mt-4">Error loading analytics</Text>
        <Text className="text-gray-500 text-center mt-2">{error?.message || 'Failed to retrieve data.'}</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-6 bg-blue-600 px-6 py-3 rounded-xl">
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const analytics = data.sellerAnalytics;
  const monthlyData = analytics.monthlyData || [];

  const maxVal = Math.max(...monthlyData.map((d: any) => d[reportType]), 1);

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <View className="px-6 py-4 bg-white border-b border-gray-100 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">Analytics</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 24 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#3b82f6']} />}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-lg font-bold text-gray-950">Trend Report</Text>
            <Text className="text-gray-400 text-xs mt-0.5">Last 6 months data</Text>
          </View>
          <View className="bg-gray-100 p-1 rounded-2xl flex-row">
            <TouchableOpacity
              onPress={() => setReportType('revenue')}
              className={`px-4 py-2 rounded-xl ${reportType === 'revenue' ? 'bg-blue-600' : 'bg-transparent'}`}
            >
              <Text className={`font-bold text-xs ${reportType === 'revenue' ? 'text-white' : 'text-gray-500'}`}>Revenue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setReportType('bookings')}
              className={`px-4 py-2 rounded-xl ${reportType === 'bookings' ? 'bg-blue-600' : 'bg-transparent'}`}
            >
              <Text className={`font-bold text-xs ${reportType === 'bookings' ? 'text-white' : 'text-gray-500'}`}>Bookings</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mb-6 items-center">
          <View className="flex-row justify-between items-end w-full h-48 px-2 pt-6">
            {monthlyData.map((d: any) => {
              const value = d[reportType];
              const barHeight = (value / maxVal) * 120; 
              return (
                <View key={d.month} className="items-center w-[14%]">
                  <Text className="text-gray-700 font-extrabold text-[10px] mb-1.5" numberOfLines={1}>
                    {reportType === 'revenue' ? `₹${(value / 1000).toFixed(0)}k` : value}
                  </Text>
                  <View className="w-6 bg-gray-50 rounded-full h-[120px] justify-end overflow-hidden border border-gray-100">
                    <View style={{ height: barHeight }} className="bg-blue-600 rounded-full" />
                  </View>
                  <Text className="text-gray-400 text-xs font-bold mt-2">{d.month}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View className="flex-row justify-between gap-4 mb-6">
          <View className="flex-1 bg-emerald-50 border border-emerald-100 rounded-3xl p-5">
            <Ionicons name="cash-outline" size={24} color="#059669" />
            <Text className="text-emerald-800 text-[10px] font-bold uppercase mt-3 tracking-wider">Total Revenue</Text>
            <Text className="text-emerald-600 font-extrabold text-lg mt-1">₹{analytics.totalRevenue?.toLocaleString()}</Text>
          </View>
          <View className="flex-1 bg-purple-50 border border-purple-100 rounded-3xl p-5">
            <Ionicons name="star" size={24} color="#7c3aed" />
            <Text className="text-purple-800 text-[10px] font-bold uppercase mt-3 tracking-wider">Average Rating</Text>
            <Text className="text-purple-600 font-extrabold text-lg mt-1">
              {analytics.avgRating > 0 ? analytics.avgRating.toFixed(1) : 'N/A'}
            </Text>
          </View>
        </View>

        <View className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
          <Text className="text-base font-bold text-gray-950 mb-4">Monthly Breakdown</Text>
          {monthlyData.map((d: any, idx: number) => (
            <View
              key={d.month}
              className={`flex-row justify-between items-center py-3.5 ${idx !== monthlyData.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <Text className="text-gray-900 font-bold text-sm">{d.month}</Text>
              <View className="items-end">
                <Text className="text-gray-900 font-extrabold text-sm">₹{d.revenue?.toLocaleString()}</Text>
                <Text className="text-gray-400 text-xs mt-0.5">{d.bookings} bookings</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
