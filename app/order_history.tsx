import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Package, Clock } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

// Define types
type OrderStatus = 'Processing' | 'Shipping' | 'Delivered' | 'Completed';

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  market: string;
};

export default function OrderHistoryScreen() {
  const [currentOrders, setCurrentOrders] = useState<Order[]>([
    {
      id: 'ORD-7845',
      date: 'March 27, 2025',
      status: 'Processing',
      items: [
        {
          id: '1',
          name: 'Fresh Organic Strawberries',
          price: 4.99,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=2940&auto=format&fit=crop',
        },
        {
          id: '2',
          name: 'Artisanal Sourdough Bread',
          price: 6.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2940&auto=format&fit=crop',
        },
      ],
      total: 16.97,
      market: 'Downtown Farmers Market',
    },
    {
      id: 'ORD-7832',
      date: 'March 25, 2025',
      status: 'Shipping',
      items: [
        {
          id: '3',
          name: 'Farm Fresh Eggs (Dozen)',
          price: 5.99,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1569288052389-dac9b0ac9efd?q=80&w=2940&auto=format&fit=crop',
        },
        {
          id: '4',
          name: 'Organic Honey (16oz)',
          price: 8.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=2940&auto=format&fit=crop',
        },
      ],
      total: 20.97,
      market: 'Riverside Farmers Market',
    },
  ]);

  const [previousOrders, setPreviousOrders] = useState<Order[]>([
    {
      id: 'ORD-7756',
      date: 'March 15, 2025',
      status: 'Delivered',
      items: [
        {
          id: '5',
          name: 'Local Cheese Selection',
          price: 12.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?q=80&w=2940&auto=format&fit=crop',
        },
        {
          id: '6',
          name: 'Organic Kale Bunch',
          price: 3.49,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?q=80&w=2940&auto=format&fit=crop',
        },
      ],
      total: 19.97,
      market: 'Downtown Farmers Market',
    },
    {
      id: 'ORD-7689',
      date: 'March 8, 2025',
      status: 'Completed',
      items: [
        {
          id: '7',
          name: 'Grass-Fed Ground Beef (1lb)',
          price: 9.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2940&auto=format&fit=crop',
        },
        {
          id: '8',
          name: 'Heirloom Tomatoes (3pk)',
          price: 4.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1524593166156-312f362cada0?q=80&w=2940&auto=format&fit=crop',
        },
      ],
      total: 14.98,
      market: 'Uptown Farmers Market',
    },
    {
      id: 'ORD-7542',
      date: 'February 25, 2025',
      status: 'Completed',
      items: [
        {
          id: '9',
          name: 'Wildflower Bouquet',
          price: 15.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=2940&auto=format&fit=crop',
        },
      ],
      total: 15.99,
      market: 'Downtown Farmers Market',
    },
  ]);

  // Get status color based on order status
  const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case 'Processing':
        return '#f59e0b'; // Amber
      case 'Shipping':
        return '#3b82f6'; // Blue
      case 'Delivered':
        return '#10b981'; // Green
      case 'Completed':
        return '#6b7280'; // Gray
      default:
        return '#6b7280';
    }
  };

  // Get status icon based on order status
  const getStatusIcon = (status: OrderStatus) => {
    const color = getStatusColor(status);
    switch (status) {
      case 'Processing':
      case 'Shipping':
        return <Package size={16} color={color} />;
      case 'Delivered':
      case 'Completed':
        return <Clock size={16} color={color} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Order History</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Current Orders Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Orders</Text>
          {currentOrders.map(order => (
            <TouchableOpacity key={order.id} style={styles.orderCard} onPress={() => {
                router.push('/order_details')
            }}>
              <View style={styles.orderHeader}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                </View>
                <View style={styles.orderStatusContainer}>
                  {getStatusIcon(order.status)}
                  <Text style={[styles.orderStatus, { color: getStatusColor(order.status) }]}>
                    {order.status}
                  </Text>
                </View>
              </View>
              
              <View style={styles.orderItems}>
                {order.items.map((item, index) => (
                  <View key={item.id} style={[
                    styles.orderItemRow,
                    index < order.items.length - 1 && styles.orderItemDivider
                  ]}>
                    <Image source={{ uri: item.image }} style={styles.itemThumbnail} />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                    </View>
                    <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.orderFooter}>
                <Text style={styles.marketName}>{order.market}</Text>
                <View style={styles.totalContainer}>
                  <Text style={styles.totalLabel}>Total:</Text>
                  <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
                </View>
              </View>
              
              <View style={styles.viewDetailsRow}>
                <Text style={styles.viewDetails}>View Order Details</Text>
                <ChevronRight size={16} color="#4b5563" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Previous Orders Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Previous Orders</Text>
          {previousOrders.map(order => (
            <TouchableOpacity key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                </View>
                <View style={styles.orderStatusContainer}>
                  {getStatusIcon(order.status)}
                  <Text style={[styles.orderStatus, { color: getStatusColor(order.status) }]}>
                    {order.status}
                  </Text>
                </View>
              </View>
              
              <View style={styles.orderItems}>
                {order.items.map((item, index) => (
                  <View key={item.id} style={[
                    styles.orderItemRow,
                    index < order.items.length - 1 && styles.orderItemDivider
                  ]}>
                    <Image source={{ uri: item.image }} style={styles.itemThumbnail} />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                    </View>
                    <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.orderFooter}>
                <Text style={styles.marketName}>{order.market}</Text>
                <View style={styles.totalContainer}>
                  <Text style={styles.totalLabel}>Total:</Text>
                  <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
                </View>
              </View>
              
              <View style={styles.viewDetailsRow}>
                <Text style={styles.viewDetails}>View Order Details</Text>
                <ChevronRight size={16} color="#4b5563" />
              </View>
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
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 12,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  orderDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  orderStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  orderStatus: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  orderItems: {
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  orderItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  orderItemDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 8,
    marginBottom: 8,
  },
  itemThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#111827',
  },
  itemQuantity: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  itemPrice: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  marketName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6b7280',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6b7280',
    marginRight: 4,
  },
  totalAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#16a34a',
  },
  viewDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  viewDetails: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4b5563',
    marginRight: 4,
  },
});