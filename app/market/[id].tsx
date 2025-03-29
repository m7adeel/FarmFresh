import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface VendorItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

interface Vendor {
  id: string;
  name: string;
  specialty: string;
  stallNumber: string;
  items: VendorItem[];
}

interface MarketDetail {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  hours: {
    [key: string]: string;
  };
  vendors: Vendor[];
}

export default function MarketDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // In a real app, you would fetch this data from an API
  // This is mock data for demonstration
  const marketDetail: MarketDetail = {
    id: '1',
    name: 'Downtown Farmers Market',
    location: 'Central Square, 123 Main St',
    description: 'The largest farmers market in the downtown area featuring local produce, artisanal goods, and fresh foods.',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2940&auto=format&fit=crop',
    hours: {
      monday: 'Closed',
      tuesday: '8:00 AM - 2:00 PM',
      wednesday: '8:00 AM - 2:00 PM',
      thursday: 'Closed',
      friday: '8:00 AM - 2:00 PM',
      saturday: '7:00 AM - 3:00 PM',
      sunday: 'Closed'
    },
    vendors: [
      {
        id: '1',
        name: "Smith's Organic Produce",
        specialty: "Fresh vegetables and fruits",
        stallNumber: "A12",
        items: [
          {
            id: '1',
            name: 'Organic Tomatoes',
            price: '$4.99/lb',
            description: 'Fresh, locally grown organic tomatoes',
            image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea'
          },
          {
            id: '2',
            name: 'Fresh Lettuce',
            price: '$2.99/head',
            description: 'Crisp, organic lettuce',
            image: 'https://images.unsplash.com/photo-1622206151246-71f91e07211f'
          }
        ]
      },
      {
        id: '2',
        name: "Baker's Delight",
        specialty: "Artisanal breads and pastries",
        stallNumber: "B03",
        items: [
          {
            id: '3',
            name: 'Sourdough Bread',
            price: '$6.99/loaf',
            description: 'Freshly baked artisanal sourdough',
            image: 'https://images.unsplash.com/photo-1585478259715-4aa2a5f12b8f'
          }
        ]
      }
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: marketDetail.image }} style={styles.headerImage} />
        
        <View style={styles.content}>
          <Text style={styles.title}>{marketDetail.name}</Text>
          <Text style={styles.location}>{marketDetail.location}</Text>
          <Text style={styles.description}>{marketDetail.description}</Text>

          <View style={styles.hoursContainer}>
            <Text style={styles.sectionTitle}>Hours</Text>
            {Object.entries(marketDetail.hours).map(([day, hours]) => (
              <Text key={day} style={styles.hoursText}>
                {day.charAt(0).toUpperCase() + day.slice(1)}: {hours}
              </Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Vendors</Text>
          {marketDetail.vendors.map((vendor) => (
            <TouchableOpacity
              key={vendor.id}
              style={styles.vendorCard}
              onPress={() => router.push({
                pathname: `/market/vendor/${vendor.id}`,
                params: { marketId: id }
              })}
            >
              <View style={styles.vendorHeader}>
                <Text style={styles.vendorName}>{vendor.name}</Text>
                <Text style={styles.stallNumber}>Stall {vendor.stallNumber}</Text>
              </View>
              <Text style={styles.specialty}>{vendor.specialty}</Text>
              
              <Text style={styles.itemsTitle}>Available Items:</Text>
              {vendor.items.map((item) => (
                <View key={item.id} style={styles.itemCard}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                  </View>
                </View>
              ))}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    marginBottom: 20,
  },
  hoursContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  hoursText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    marginBottom: 4,
  },
  vendorCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  vendorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vendorName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  stallNumber: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  specialty: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    marginBottom: 16,
  },
  itemsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  itemImage: {
    width: 80,
    height: 80,
  },
  itemInfo: {
    flex: 1,
    padding: 12,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#16a34a',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
}); 