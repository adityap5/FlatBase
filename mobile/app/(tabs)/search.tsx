import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, RefreshControl, Modal } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { GET_FLATS, SEARCH_FLATS } from '../../src/graphql/queries';
import { FlatCard } from '../../src/components/FlatCard';
import CardSkeleton from '../../src/components/CardSkeleton';

type SortOption = 'none' | 'price-low' | 'price-high';

export default function SearchScreen() {
  const params = useLocalSearchParams<{ location?: string }>();
  const [searchText, setSearchText] = useState('');
  const [queryLocation, setQueryLocation] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('none');
  const [showSortModal, setShowSortModal] = useState(false);

  const [loadAllFlats, { data: allFlatsData, loading: loadingAll, refetch: refetchAll }] = useLazyQuery(GET_FLATS, {
    fetchPolicy: 'network-only'
  });
  const [loadSearchFlats, { data: searchFlatsData, loading: loadingSearch, refetch: refetchSearch }] = useLazyQuery(SEARCH_FLATS, {
    fetchPolicy: 'network-only'
  });

  const handleSearch = (loc: string) => {
    setQueryLocation(loc);
    if (loc.trim() === '') {
      loadAllFlats();
    } else {
      loadSearchFlats({ variables: { location: loc } });
    }
  };

  useEffect(() => {
    if (params?.location) {
      setSearchText(params.location);
      handleSearch(params.location);
    } else {
      loadAllFlats();
    }
  }, [params?.location]);

  const rawFlats = queryLocation.trim() === '' ? (allFlatsData?.flats || []) : (searchFlatsData?.searchFlats || []);

  const getSortedFlats = () => {
    const items = [...rawFlats];
    if (sortOption === 'price-low') {
      return items.sort((a: any, b: any) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      return items.sort((a: any, b: any) => b.price - a.price);
    }
    return items;
  };

  const sortedFlats = getSortedFlats();
  const loading = loadingAll || loadingSearch;

  const onRefresh = useCallback(async () => {
    try {
      if (queryLocation.trim() === '') {
        if (refetchAll) await refetchAll();
      } else {
        if (refetchSearch) await refetchSearch({ location: queryLocation });
      }
    } catch (e) {
      console.error(e);
    }
  }, [queryLocation, refetchAll, refetchSearch]);

  const renderItem = useCallback(({ item }: { item: any }) => {
    return <FlatCard flat={item} />;
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      {/* Search Input Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-100 flex-row items-center gap-3">
        <View className="flex-1 flex-row items-center bg-gray-100 rounded-2xl px-4 py-3">
          <Ionicons name="search" size={20} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-2 text-base text-gray-800"
            placeholder="Search city/location..."
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => handleSearch(searchText)}
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => { setSearchText(''); handleSearch(''); }}>
              <Ionicons name="close-circle" size={18} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>

        {/* Sort Trigger */}
        <TouchableOpacity
          onPress={() => setShowSortModal(true)}
          className={`p-3 rounded-2xl border ${sortOption !== 'none' ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200'}`}
        >
          <Ionicons name="funnel-outline" size={20} color={sortOption !== 'none' ? '#3b82f6' : '#4b5563'} />
        </TouchableOpacity>
      </View>

      {/* Main List */}
      {loading ? (
        <View className="flex-grow px-6 pt-4">
          <CardSkeleton />
          <CardSkeleton />
        </View>
      ) : sortedFlats.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <Ionicons name="search-outline" size={64} color="#d1d5db" />
          <Text className="text-xl font-bold text-gray-800 mt-4">No results found</Text>
          <Text className="text-gray-500 text-center mt-2">
            We couldn't find any flats matching "{searchText}". Try searching for another city!
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1, minHeight: 2 }}>
          <FlashList
            data={sortedFlats}
            renderItem={renderItem}
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} colors={['#3b82f6']} />
            }
            keyExtractor={(item: any) => item._id}
          />
        </View>
      )}

      {/* Sort Option Sheet/Modal */}
      <Modal
        visible={showSortModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSortModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowSortModal(false)}
          className="flex-1 bg-black/50 justify-end"
        >
          <View className="bg-white rounded-t-[32px] p-6 pb-10">
            <View className="w-12 h-1.5 bg-gray-200 rounded-full self-center mb-6" />
            <Text className="text-xl font-bold text-gray-900 mb-4">Sort Properties</Text>

            <TouchableOpacity
              onPress={() => { setSortOption('none'); setShowSortModal(false); }}
              className="flex-row justify-between items-center py-4 border-b border-gray-100"
            >
              <Text className={`text-base ${sortOption === 'none' ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>Default</Text>
              {sortOption === 'none' && <Ionicons name="checkmark" size={20} color="#3b82f6" />}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { setSortOption('price-low'); setShowSortModal(false); }}
              className="flex-row justify-between items-center py-4 border-b border-gray-100"
            >
              <Text className={`text-base ${sortOption === 'price-low' ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>Price: Low to High</Text>
              {sortOption === 'price-low' && <Ionicons name="checkmark" size={20} color="#3b82f6" />}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { setSortOption('price-high'); setShowSortModal(false); }}
              className="flex-row justify-between items-center py-4"
            >
              <Text className={`text-base ${sortOption === 'price-high' ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>Price: High to Low</Text>
              {sortOption === 'price-high' && <Ionicons name="checkmark" size={20} color="#3b82f6" />}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
