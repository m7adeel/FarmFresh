import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, CreditCard, Truck, Clock, Check } from 'lucide-react-native';
import { useState } from 'react';
import useCartStore, { CartStore } from '@/store/useCartStore';
import { router } from 'expo-router';
import SuccessModal from '@/components/modals/success_modal';
import Map from '@/components/maps/map';

export default function CheckoutScreen() {
  const { cart, emptyCart } = useCartStore() as CartStore;
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [deliveryOption, setDeliveryOption] = useState('standard');
  
  // Form state
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [successModalVisible, setSuccessModalVisible] = useState(false)

  const handleChangeText = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  // Calculate total from cart
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const deliveryFee = deliveryOption === 'express' ? 9.99 : 4.99;
  const total = subtotal + tax + deliveryFee;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.title}>Checkout</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content}>
            {/* Map */}
            <View style={styles.mapContainer}>
                <Map />
            </View>

          {/* Delivery Address Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={form.fullName}
                onChangeText={(text) => handleChangeText('fullName', text)}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="(555) 555-5555"
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(text) => handleChangeText('phone', text)}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Street Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter street address"
                value={form.address}
                onChangeText={(text) => handleChangeText('address', text)}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Apartment, suite, etc. (optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Apartment or unit number"
                value={form.apartment}
                onChangeText={(text) => handleChangeText('apartment', text)}
              />
            </View>
            
            <View style={styles.row}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  style={styles.input}
                  placeholder="City"
                  value={form.city}
                  onChangeText={(text) => handleChangeText('city', text)}
                />
              </View>
              
              <View style={[styles.formGroup, { width: 80, marginRight: 8 }]}>
                <Text style={styles.label}>State</Text>
                <TextInput
                  style={styles.input}
                  placeholder="State"
                  value={form.state}
                  onChangeText={(text) => handleChangeText('state', text)}
                />
              </View>
              
              <View style={[styles.formGroup, { width: 100 }]}>
                <Text style={styles.label}>Zip Code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Zip code"
                  keyboardType="numeric"
                  value={form.zipCode}
                  onChangeText={(text) => handleChangeText('zipCode', text)}
                />
              </View>
            </View>
          </View>
          
          {/* Delivery Options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Options</Text>
            
            <TouchableOpacity 
              style={[
                styles.optionCard, 
                deliveryOption === 'standard' && styles.selectedOption
              ]}
              onPress={() => setDeliveryOption('standard')}
            >
              <View style={styles.optionIconContainer}>
                <Truck size={24} color={deliveryOption === 'standard' ? "#16a34a" : "#6b7280"} />
              </View>
              <View style={styles.optionDetails}>
                <Text style={styles.optionTitle}>Standard Delivery</Text>
                <Text style={styles.optionDescription}>Delivery in 2-3 days</Text>
              </View>
              <Text style={styles.optionPrice}>$4.99</Text>
              {deliveryOption === 'standard' && (
                <View style={styles.checkmark}>
                  <Check size={18} color="#ffffff" />
                </View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.optionCard, 
                deliveryOption === 'express' && styles.selectedOption
              ]}
              onPress={() => setDeliveryOption('express')}
            >
              <View style={styles.optionIconContainer}>
                <Clock size={24} color={deliveryOption === 'express' ? "#16a34a" : "#6b7280"} />
              </View>
              <View style={styles.optionDetails}>
                <Text style={styles.optionTitle}>Express Delivery</Text>
                <Text style={styles.optionDescription}>Delivery today</Text>
              </View>
              <Text style={styles.optionPrice}>$9.99</Text>
              {deliveryOption === 'express' && (
                <View style={styles.checkmark}>
                  <Check size={18} color="#ffffff" />
                </View>
              )}
            </TouchableOpacity>
          </View>
          
          {/* Payment Method */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            
            <TouchableOpacity 
              style={[
                styles.optionCard, 
                paymentMethod === 'credit' && styles.selectedOption
              ]}
              onPress={() => setPaymentMethod('credit')}
            >
              <View style={styles.optionIconContainer}>
                <CreditCard size={24} color={paymentMethod === 'credit' ? "#16a34a" : "#6b7280"} />
              </View>
              <View style={styles.optionDetails}>
                <Text style={styles.optionTitle}>Credit / Debit Card</Text>
                <Text style={styles.optionDescription}>Pay with Visa, Mastercard, etc.</Text>
              </View>
              {paymentMethod === 'credit' && (
                <View style={styles.checkmark}>
                  <Check size={18} color="#ffffff" />
                </View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.optionCard, 
                paymentMethod === 'paypal' && styles.selectedOption
              ]}
              onPress={() => setPaymentMethod('paypal')}
            >
              <View style={[styles.optionIconContainer, { backgroundColor: '#003087' }]}>
                <Text style={{ color: '#ffffff', fontFamily: 'Inter-Bold', fontSize: 16 }}>P</Text>
              </View>
              <View style={styles.optionDetails}>
                <Text style={styles.optionTitle}>PayPal</Text>
                <Text style={styles.optionDescription}>Fast and secure checkout</Text>
              </View>
              {paymentMethod === 'paypal' && (
                <View style={styles.checkmark}>
                  <Check size={18} color="#ffffff" />
                </View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.optionCard, 
                paymentMethod === 'applepay' && styles.selectedOption
              ]}
              onPress={() => setPaymentMethod('applepay')}
            >
              <View style={[styles.optionIconContainer, { backgroundColor: '#000000' }]}>
                <Text style={{ color: '#ffffff', fontFamily: 'Inter-Bold', fontSize: 16 }}>A</Text>
              </View>
              <View style={styles.optionDetails}>
                <Text style={styles.optionTitle}>Apple Pay</Text>
                <Text style={styles.optionDescription}>Quick payment with Apple Pay</Text>
              </View>
              {paymentMethod === 'applepay' && (
                <View style={styles.checkmark}>
                  <Check size={18} color="#ffffff" />
                </View>
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax (8%)</Text>
              <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
          <View style={{height:20, width: '100%'}}/>
        </ScrollView>
        
        <View style={styles.footer}>
          <TouchableOpacity style={styles.placeOrderButton} onPress={() => {
            setSuccessModalVisible(true);
          }}>
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>

        <SuccessModal 
            isVisible={successModalVisible}
            onClose={() => {
                emptyCart();
                setSuccessModalVisible(false);
            }}
            orderNumber="o-13124"
        />
      </KeyboardAvoidingView>
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
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  row: {
    flexDirection: 'row',
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  selectedOption: {
    borderColor: '#16a34a',
    backgroundColor: '#f0fdf4',
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionDetails: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  optionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6b7280',
  },
  optionPrice: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#16a34a',
    marginRight: 8,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4b5563',
  },
  summaryValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#111827',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
  },
  totalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#16a34a',
  },
  footer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  placeOrderButton: {
    backgroundColor: '#16a34a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#ffffff',
  },
  mapContainer: {
    height: 300,
    marginBottom: 16,
    overflow: 'hidden',
  },
});