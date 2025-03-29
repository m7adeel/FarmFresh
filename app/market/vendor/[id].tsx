import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import useCartStore from '@/store/useCartStore';
import { CartItem } from '@/types';

export default function VendorDetailScreen() {
  const { id, marketId } = useLocalSearchParams();
  const { cart, addItemToCart } = useCartStore();
  
  // Mock data - in a real app, fetch based on vendor ID
  const vendor = {
    id: '1',
    name: "Smith's Organic Produce",
    specialty: "Fresh vegetables and fruits",
    stallNumber: "A12",
    description: "We specialize in locally grown, organic produce harvested fresh daily from our family farm.",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9",
    items: [
      {
        id: '1',
        name: 'Organic Tomatoes',
        price: 4.99,
        description: 'Fresh, locally grown organic tomatoes',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea',
        category: 'Vegetables',
        inStock: true,
        itemId: 'i-4'
      },
      {
        id: '2',
        name: 'Fresh Lettuce',
        price: 2.99,
        description: 'Crisp, organic lettuce',
        image: 'https://images.unsplash.com/photo-1622206151246-71f91e07211f',
        category: 'Vegetables',
        inStock: true,
        itemId: 'i-5'
      }
    ]
  };

  const addToCart = (item: CartItem) => {
    addItemToCart(item)
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: vendor.image }} style={styles.headerImage} />
        
        <View style={styles.content}>
          <Text style={styles.vendorName}>{vendor.name}</Text>
          <Text style={styles.stallNumber}>Stall {vendor.stallNumber}</Text>
          <Text style={styles.specialty}>{vendor.specialty}</Text>
          <Text style={styles.description}>{vendor.description}</Text>

          <Text style={styles.sectionTitle}>Available Products</Text>
          {vendor.items.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.productCard}
              onPress={() => router.push(`/market/product/${item.id}`)}
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <View style={styles.productHeader}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                </View>
                <Text style={styles.productDescription}>{item.description}</Text>
                <TouchableOpacity 
                  style={styles.addToCartButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                >
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {cart.length > 0 && (
          <View style={styles.cartPreview}>
            <Text style={styles.cartTitle}>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</Text>
            <TouchableOpacity 
              style={styles.viewCartButton}
              onPress={() => router.push('/cart')}
            >
              <Text style={styles.viewCartText}>View Cart</Text>
            </TouchableOpacity>
          </View>
        )}
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
  vendorName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  stallNumber: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 8,
  },
  specialty: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#4b5563',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: 120,
    height: 120,
  },
  productInfo: {
    flex: 1,
    padding: 12,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    flex: 1,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#16a34a',
    marginLeft: 8,
  },
  productDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 12,
  },
  addToCartButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  cartPreview: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cartTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  viewCartButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  viewCartText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
}); 