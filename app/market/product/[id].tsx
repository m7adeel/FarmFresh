import useCartStore, { CartStore } from '@/store/useCartStore';
import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { addItemToCart } = useCartStore() as CartStore;

  // Mock data - in a real app, fetch based on product ID
  const product = {
    id: '1',
    name: 'Organic Tomatoes',
    price: 4.99,
    description: 'Fresh, locally grown organic tomatoes from our family farm. These tomatoes are picked at peak ripeness and delivered directly to the market.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea',
    category: 'Vegetables',
    vendor: "Smith's Organic Produce",
    nutritionInfo: {
      servingSize: '100g',
      calories: 18,
      protein: '0.9g',
      carbs: '3.9g',
      fiber: '1.2g'
    },
    inStock: true,
    itemId: 'i-4'
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        
        <View style={styles.content}>
          <Text style={styles.vendor}>{product.vendor}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price}</Text>
          
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
          
          <Text style={styles.sectionTitle}>Nutrition Information</Text>
          <View style={styles.nutritionInfo}>
            <Text style={styles.nutritionText}>Serving Size: {product.nutritionInfo.servingSize}</Text>
            <Text style={styles.nutritionText}>Calories: {product.nutritionInfo.calories}</Text>
            <Text style={styles.nutritionText}>Protein: {product.nutritionInfo.protein}</Text>
            <Text style={styles.nutritionText}>Carbs: {product.nutritionInfo.carbs}</Text>
            <Text style={styles.nutritionText}>Fiber: {product.nutritionInfo.fiber}</Text>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.addToCartButton,
              !product.inStock && styles.addToCartButtonDisabled
            ]}
            disabled={!product.inStock}
            onPress={() => {
              // Add to cart logic here
              addItemToCart(product)
            }}
          >
            <Text style={styles.addToCartText}>
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Text>
          </TouchableOpacity>
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
  productImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 16,
  },
  vendor: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#16a34a',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    marginBottom: 24,
    lineHeight: 24,
  },
  nutritionInfo: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  nutritionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    marginBottom: 4,
  },
  addToCartButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
}); 