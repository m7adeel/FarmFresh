import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { CheckCircle, X } from 'lucide-react-native';

type SuccessModalProps = {
    isVisible: boolean;
    orderNumber: string;
    onClose: () => void
}

export default function SuccessModal({ isVisible, onClose, orderNumber }: SuccessModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
          
          <View style={styles.successIcon}>
            <CheckCircle size={64} color="#16a34a" />
          </View>
          
          <Text style={styles.title}>Order Placed!</Text>
          
          <Text style={styles.message}>
            Your order has been successfully placed and will be delivered soon.
          </Text>
          
          <View style={styles.orderInfo}>
            <Text style={styles.orderLabel}>Order Number:</Text>
            <Text style={styles.orderNumber}>{orderNumber || 'FA-2025-38619'}</Text>
          </View>
          
          <Text style={styles.subMessage}>
            You'll receive a confirmation email with your order details shortly.
          </Text>
          
          <TouchableOpacity style={styles.trackOrderButton} onPress={onClose}>
            <Text style={styles.trackOrderText}>Track Your Order</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.continueButton} onPress={onClose}>
            <Text style={styles.continueText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  successIcon: {
    marginTop: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 20,
  },
  orderInfo: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    width: '100%',
    justifyContent: 'center',
  },
  orderLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6b7280',
    marginRight: 4,
  },
  orderNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#111827',
  },
  subMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  trackOrderButton: {
    backgroundColor: '#16a34a',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  trackOrderText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#ffffff',
  },
  continueButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  continueText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#4b5563',
  },
});