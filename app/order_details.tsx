import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Clock, MapPin, Phone, MessageSquare, Shield } from 'lucide-react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { router } from 'expo-router';

// Define types
type Coordinates = {
  latitude: number;
  longitude: number;
};

type DeliveryStatus = 'Preparing' | 'PickedUp' | 'OnTheWay' | 'Arriving';

type Order = {
  id: string;
  market: {
    name: string;
    address: string;
    coordinates: Coordinates;
  };
  customer: {
    name: string;
    address: string;
    coordinates: Coordinates;
  };
  rider: {
    name: string;
    phone: string;
    rating: number;
    photo: string;
    coordinates: Coordinates;
  };
  status: DeliveryStatus;
  estimatedDelivery: string;
  items: Array<{
    name: string;
    quantity: number;
  }>;
};

export default function DeliveryTrackingScreen({ route, navigation }: any) {
  // Normally this would come from route.params.orderId, but we'll hardcode for this example
  const orderId = route?.params?.orderId || 'ORD-7845';
  
  // State for the order details and rider position
  const [order, setOrder] = useState<Order>({
    id: 'ORD-7845',
    market: {
      name: 'Downtown Farmers Market',
      address: '123 Market Street, Downtown',
      coordinates: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
    customer: {
      name: 'John Doe',
      address: '456 Park Avenue, Downtown',
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
    },
    rider: {
      name: 'Michael Rodriguez',
      phone: '+1 (555) 123-4567',
      rating: 4.8,
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      coordinates: {
        latitude: 37.785834,
        longitude: -122.426,
      },
    },
    status: 'OnTheWay',
    estimatedDelivery: '30-40 minutes',
    items: [
      { name: 'Fresh Organic Strawberries', quantity: 2 },
      { name: 'Artisanal Sourdough Bread', quantity: 1 },
    ],
  });

  const [isMapReady, setIsMapReady] = useState(false);

  // Simulate rider movement
  useEffect(() => {
    const updateRiderPosition = () => {
      // Calculate a position between market and customer, moving closer to customer over time
      const marketLat = order.market.coordinates.latitude;
      const marketLng = order.market.coordinates.longitude;
      const customerLat = order.customer.coordinates.latitude;
      const customerLng = order.customer.coordinates.longitude;
      
      // Random factor to simulate slight movement variations
      const randomFactor = Math.random() * 0.0005 - 0.00025;
      
      setOrder(prevOrder => {
        const progress = Math.min(0.8, Math.random() * 0.1 + (
          (prevOrder.rider.coordinates.latitude - marketLat) / (customerLat - marketLat)
        ));
        
        const newLat = marketLat + (customerLat - marketLat) * progress;
        const newLng = marketLng + (customerLng - marketLng) * progress + randomFactor;
        
        return {
          ...prevOrder,
          rider: {
            ...prevOrder.rider,
            coordinates: {
              latitude: newLat,
              longitude: newLng,
            },
          },
          status: progress > 0.7 ? 'Arriving' : 'OnTheWay',
        };
      });
    };
    
    const interval = setInterval(updateRiderPosition, 5000);
    return () => clearInterval(interval);
  }, []);

  // Get color based on status
  const getStatusColor = (status: DeliveryStatus): string => {
    switch (status) {
      case 'Preparing':
        return '#f59e0b'; // Amber
      case 'PickedUp':
        return '#3b82f6'; // Blue
      case 'OnTheWay':
        return '#8b5cf6'; // Purple
      case 'Arriving':
        return '#10b981'; // Green
      default:
        return '#6b7280'; // Gray
    }
  };

  // Get status message
  const getStatusMessage = (status: DeliveryStatus): string => {
    switch (status) {
      case 'Preparing':
        return 'Your order is being prepared';
      case 'PickedUp':
        return 'Your order has been picked up';
      case 'OnTheWay':
        return 'Your order is on the way';
      case 'Arriving':
        return 'Your order is arriving soon';
      default:
        return '';
    }
  };

  // Calculate the region for the map to display all points
  const getMapRegion = () => {
    const { market, customer, rider } = order;
    const points = [market.coordinates, customer.coordinates, rider.coordinates];
    
    // Find min and max values
    let minLat = points[0].latitude;
    let maxLat = points[0].latitude;
    let minLng = points[0].longitude;
    let maxLng = points[0].longitude;
    
    points.forEach(point => {
      minLat = Math.min(minLat, point.latitude);
      maxLat = Math.max(maxLat, point.latitude);
      minLng = Math.min(minLng, point.longitude);
      maxLng = Math.max(maxLng, point.longitude);
    });
    
    // Add padding
    const latDelta = (maxLat - minLat) * 1.4;
    const lngDelta = (maxLng - minLng) * 1.4;
    
    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: Math.max(0.02, latDelta),
      longitudeDelta: Math.max(0.02, lngDelta),
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Delivery</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Status Section */}
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
              {getStatusMessage(order.status)}
            </Text>
          </View>
          <View style={styles.estimatedTimeContainer}>
            <Clock size={16} color="#6b7280" />
            <Text style={styles.estimatedTimeText}>
              Estimated delivery in {order.estimatedDelivery}
            </Text>
          </View>
        </View>

        {/* Map Section */}
        <View style={styles.mapContainer}>
          {isMapReady && (
            <MapView
              
              style={styles.map}
              region={getMapRegion()}
              initialRegion={getMapRegion()}
              onMapReady={() => setIsMapReady(true)}
            >
              {/* Market Marker */}
              <Marker
                coordinate={order.market.coordinates}
                title={order.market.name}
                description="Pickup location"
              >
                <View style={styles.marketMarker}>
                  <MapPin size={24} color="#ffffff" />
                </View>
              </Marker>

              {/* Customer Marker */}
              <Marker
                coordinate={order.customer.coordinates}
                title="Your location"
                description={order.customer.address}
              >
                <View style={styles.destinationMarker}>
                  <MapPin size={24} color="#ffffff" />
                </View>
              </Marker>

              {/* Rider Marker */}
              <Marker
                coordinate={order.rider.coordinates}
                title={`${order.rider.name} - Your rider`}
              >
                <View style={styles.riderMarker}>
                  <Image
                    source={{ uri: 'https://img.icons8.com/color/48/000000/motorcycle.png' }}
                    style={{ width: 32, height: 32 }}
                  />
                </View>
              </Marker>

              {/* Route Polyline */}
              <Polyline
                coordinates={[
                  order.market.coordinates,
                  order.rider.coordinates,
                  order.customer.coordinates,
                ]}
                strokeWidth={4}
                strokeColor="#10b981"
                lineDashPattern={[1, 3]}
              />
            </MapView>
          )}
        </View>

        {/* Order Info Section */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Text style={styles.infoTitle}>Order Information</Text>
            <Text style={styles.orderId}>{order.id}</Text>
          </View>
          
          <View style={styles.locationInfo}>
            <View style={styles.locationItem}>
              <View style={[styles.locationDot, { backgroundColor: '#10b981' }]} />
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationType}>Pickup</Text>
                <Text style={styles.locationName}>{order.market.name}</Text>
                <Text style={styles.locationAddress}>{order.market.address}</Text>
              </View>
            </View>
            
            <View style={styles.routeLine} />
            
            <View style={styles.locationItem}>
              <View style={[styles.locationDot, { backgroundColor: '#ef4444' }]} />
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationType}>Delivery</Text>
                <Text style={styles.locationName}>{order.customer.name}</Text>
                <Text style={styles.locationAddress}>{order.customer.address}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Order Items</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <Text style={styles.itemQuantity}>{item.quantity}x</Text>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
          ))}
        </View>

        {/* Rider Info Card */}
        <View style={styles.riderCard}>
          <View style={styles.riderInfo}>
            <Image source={{ uri: order.rider.photo }} style={styles.riderPhoto} />
            <View style={styles.riderDetails}>
              <Text style={styles.riderName}>{order.rider.name}</Text>
              <View style={styles.ratingContainer}>
                <Image 
                  source={{ uri: 'https://img.icons8.com/color/48/000000/star--v1.png' }} 
                  style={styles.starIcon} 
                />
                <Text style={styles.ratingText}>{order.rider.rating}</Text>
              </View>
            </View>
          </View>
          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.contactButton}>
              <Phone size={20} color="#16a34a" />
              <Text style={styles.contactButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <MessageSquare size={20} color="#16a34a" />
              <Text style={styles.contactButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Section */}
        <TouchableOpacity style={styles.supportButton}>
          <Shield size={18} color="#6b7280" />
          <Text style={styles.supportButtonText}>Need help with your order?</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  statusContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  estimatedTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  estimatedTimeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 6,
  },
  mapContainer: {
    height: 220,
    marginBottom: 16,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marketMarker: {
    backgroundColor: '#10b981',
    borderRadius: 20,
    padding: 8,
  },
  destinationMarker: {
    backgroundColor: '#ef4444',
    borderRadius: 20,
    padding: 8,
  },
  riderMarker: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 4,
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  orderId: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6b7280',
  },
  locationInfo: {
    marginTop: 8,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    marginRight: 12,
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: '#d1d5db',
    marginLeft: 5.5,
    marginBottom: 12,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationType: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  locationName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#111827',
    marginBottom: 2,
  },
  locationAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4b5563',
  },
  orderItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  itemQuantity: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#16a34a',
    marginRight: 8,
    width: 24,
  },
  itemName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#111827',
    flex: 1,
  },
  riderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  riderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  riderPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  riderDetails: {
    flex: 1,
  },
  riderName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  ratingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6b7280',
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 0.48,
  },
  contactButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#16a34a',
    marginLeft: 8,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  supportButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
});