import { View, Text, StyleSheet } from 'react-native'
import React,{ useState } from 'react'
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';

export default function Map() {
    const [order, setOrder] = useState({
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
        <MapView
            provider={PROVIDER_DEFAULT}
            style={styles.map}
            region={getMapRegion()}
            initialRegion={getMapRegion()}
            showsUserLocation={true}
            showsMyLocationButton={true}
        ></MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})