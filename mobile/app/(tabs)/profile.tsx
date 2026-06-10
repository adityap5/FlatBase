import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, TextInput } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { useAuthStore } from '../../src/store/authStore';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GET_USER, UPDATE_SELLER_PROFILE } from '../../src/graphql/queries';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, token, logout, setAuth } = useAuthStore();
  const [editModalVisible, setEditModalVisible] = useState(false);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');

  const { data, refetch } = useQuery(GET_USER, {
    variables: { id: user?._id },
    skip: !token || !user?._id,
    fetchPolicy: 'network-only',
    onCompleted: (userData) => {
      if (userData?.user) {
        setName(userData.user.name || '');
        setPhone(userData.user.phone || '');
        setBio(userData.user.bio || '');
      }
    }
  });

  const [updateProfile, { loading: updating }] = useMutation(UPDATE_SELLER_PROFILE);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/(tabs)/');
        }
      }
    ]);
  };

  const handleUpdate = async () => {
    try {
      const { data: updateData } = await updateProfile({
        variables: {
          id: user._id,
          name,
          phone,
          bio
        }
      });
      if (updateData?.updateSellerProfile) {
        setAuth(token!, {
          ...user,
          name: updateData.updateSellerProfile.name,
          phone: updateData.updateSellerProfile.phone,
          bio: updateData.updateSellerProfile.bio
        });
        Alert.alert('Success', 'Profile updated successfully!');
        setEditModalVisible(false);
        refetch();
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to update profile');
    }
  };

  if (!token) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center px-6">
        <Ionicons name="person-circle-outline" size={100} color="#3b82f6" />
        <Text className="text-2xl font-bold text-gray-900 mt-6">Your Profile</Text>
        <Text className="text-gray-500 text-center mt-2 mb-8">
          Join Flatbase to book, review and manage flats securely.
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

  const profile = data?.user || user;
  const isSeller = profile?.role === 'seller';

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <View className="px-6 py-4 bg-white border-b border-gray-100 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-gray-900">Profile</Text>
        <TouchableOpacity onPress={handleLogout} className="p-2">
          <Ionicons name="log-out-outline" size={24} color="#dc2626" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View className="bg-white px-6 py-8 items-center border-b border-gray-100 mb-6">
          <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4">
            <Text className="text-blue-600 font-extrabold text-3xl">
              {profile?.name?.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text className="text-2xl font-bold text-gray-950">{profile?.name}</Text>
          <Text className="text-gray-500 text-sm mt-1">{profile?.email}</Text>
          <View className="bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mt-3">
            <Text className="text-blue-600 font-semibold text-xs capitalize">{profile?.role || 'User'}</Text>
          </View>
        </View>

        {/* Info & Stats */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
            <Text className="text-lg font-bold text-gray-950 mb-4">Account Information</Text>

            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
              <Text className="text-gray-500 font-medium">Phone</Text>
              <Text className="text-gray-900 font-semibold">{profile?.phone || 'Not provided'}</Text>
            </View>

            <View className="py-3">
              <Text className="text-gray-500 font-medium mb-1">Bio</Text>
              <Text className="text-gray-800 leading-5">{profile?.bio || 'No bio written yet.'}</Text>
            </View>

            <TouchableOpacity
              onPress={() => setEditModalVisible(true)}
              className="mt-4 border border-blue-600 rounded-2xl py-3.5 items-center flex-row justify-center gap-2"
            >
              <Ionicons name="create-outline" size={18} color="#3b82f6" />
              <Text className="text-blue-600 font-bold text-sm">Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Seller Tools */}
        {isSeller && (
          <View className="px-6 mb-6">
            <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
              <Text className="text-lg font-bold text-gray-950 mb-4">Seller Dashboard</Text>

              <TouchableOpacity
                onPress={() => router.push('/seller/listings')}
                className="flex-row justify-between items-center py-4 border-b border-gray-100"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-blue-50 p-2.5 rounded-xl">
                    <Ionicons name="list" size={18} color="#3b82f6" />
                  </View>
                  <Text className="text-gray-800 font-semibold text-base">My Listings</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/seller/add-flat')}
                className="flex-row justify-between items-center py-4 border-b border-gray-100"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-emerald-50 p-2.5 rounded-xl">
                    <Ionicons name="add-circle" size={18} color="#10b981" />
                  </View>
                  <Text className="text-gray-800 font-semibold text-base">Add New Flat</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/seller/analytics')}
                className="flex-row justify-between items-center py-4"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-purple-50 p-2.5 rounded-xl">
                    <Ionicons name="analytics" size={18} color="#8b5cf6" />
                  </View>
                  <Text className="text-gray-800 font-semibold text-base">Seller Analytics</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={editModalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/50 justify-center p-6">
          <View className="bg-white rounded-3xl p-6 shadow-xl">
            <Text className="text-xl font-bold text-gray-900 mb-4">Edit Profile</Text>

            <View className="space-y-4 mb-6">
              <View>
                <Text className="text-gray-700 font-medium mb-1">Name</Text>
                <TextInput
                  placeholder="Your Name"
                  value={name}
                  onChangeText={setName}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800"
                />
              </View>
              <View className="mt-4">
                <Text className="text-gray-700 font-medium mb-1">Phone Number</Text>
                <TextInput
                  placeholder="Your Phone Number"
                  value={phone}
                  onChangeText={setPhone}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800"
                  keyboardType="phone-pad"
                />
              </View>
              <View className="mt-4">
                <Text className="text-gray-700 font-medium mb-1">Bio</Text>
                <TextInput
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChangeText={setBio}
                  multiline
                  numberOfLines={3}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 h-20 text-left"
                  style={{ textAlignVertical: 'top' }}
                />
              </View>
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                className="flex-1 bg-gray-200 py-3 rounded-xl items-center"
              >
                <Text className="text-gray-700 font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleUpdate}
                disabled={updating}
                className="flex-1 bg-blue-600 py-3 rounded-xl items-center shadow-sm"
              >
                <Text className="text-white font-bold">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
