import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Clock, Users } from 'lucide-react-native';
import { useState } from 'react';

type Market = {
  id: string;
  name: string;
  location: string;
  hours: string;
  vendorCount: number;
  isOpen: boolean;
  image: string;
  distance: string;
};

const markets: Market[] = [
  {
    id: '1',
    name: 'Downtown Farmers Market',
    location: 'Central Square, Downtown',
    hours: 'Wed & Sat 8AM-2PM',
    vendorCount: 45,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2940&auto=format&fit=crop',
    distance: '0.8 miles',
  },
  {
    id: '2',
    name: 'Riverside Fresh Market',
    location: 'Riverside Park',
    hours: 'Sat & Sun 9AM-3PM',
    vendorCount: 32,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=2940&auto=format&fit=crop',
    distance: '1.2 miles',
  },
  {
    id: '3',
    name: 'Green Valley Market',
    location: 'Valley Center',
    hours: 'Tue & Fri 10AM-4PM',
    vendorCount: 28,
    isOpen: false,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2940&auto=format&fit=crop',
    distance: '2.5 miles',
  },
  {
    id: '4',
    name: 'Harbor Side Market',
    location: 'Harbor District',
    hours: 'Mon & Thu 11AM-5PM',
    vendorCount: 35,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1535546204504-586398ee6677?q=80&w=2940&auto=format&fit=crop',
    distance: '3.1 miles',
  },
];

export default function MarketsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'open' | 'closest'>('all');

  const filteredMarkets = markets.filter(market => {
    const matchesSearch = market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         market.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'open') {
      return matchesSearch && market.isOpen;
    }
    return matchesSearch;
  });

  if (selectedFilter === 'closest') {
    filteredMarkets.sort((a, b) => 
      parseFloat(a.distance.split(' ')[0]) - parseFloat(b.distance.split(' ')[0])
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Local Markets</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search markets..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'all' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[styles.filterText, selectedFilter === 'all' && styles.filterTextActive]}>All Markets</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'open' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('open')}
          >
            <Text style={[styles.filterText, selectedFilter === 'open' && styles.filterTextActive]}>Open Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'closest' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('closest')}
          >
            <Text style={[styles.filterText, selectedFilter === 'closest' && styles.filterTextActive]}>Closest</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.marketsList}>
        {filteredMarkets.map(market => (
          <TouchableOpacity key={market.id} style={styles.marketCard}>
            <Image source={{ uri: market.image }} style={styles.marketImage} />
            <View style={styles.marketContent}>
              <View style={styles.marketHeader}>
                <Text style={styles.marketName}>{market.name}</Text>
                <View style={[styles.badge, market.isOpen ? styles.openBadge : styles.closedBadge]}>
                  <Text style={[styles.badgeText, market.isOpen ? styles.openBadgeText : styles.closedBadgeText]}>
                    {market.isOpen ? 'Open' : 'Closed'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.marketDetails}>
                <View style={styles.detailRow}>
                  <MapPin size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{market.location}</Text>
                  <Text style={styles.distance}>{market.distance}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Clock size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{market.hours}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Users size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{market.vendorCount} vendors</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#111827',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1f2937',
  },
  filtersScroll: {
    marginLeft: -4,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 4,
  },
  filterButtonActive: {
    backgroundColor: '#16a34a',
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4b5563',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  marketsList: {
    padding: 20,
  },
  marketCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  marketImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  marketContent: {
    padding: 16,
  },
  marketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  marketName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  openBadge: {
    backgroundColor: '#dcfce7',
  },
  closedBadge: {
    backgroundColor: '#fee2e2',
  },
  badgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  openBadgeText: {
    color: '#16a34a',
  },
  closedBadgeText: {
    color: '#dc2626',
  },
  marketDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4b5563',
    flex: 1,
  },
  distance: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#16a34a',
  },
});