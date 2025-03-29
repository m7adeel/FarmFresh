import { Link, router } from 'expo-router';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Fresh From Farm{'\n'}To Your Table</Text>
          <Text style={styles.heroSubtitle}>
            Discover local farmers markets and fresh produce near you
          </Text>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2940&auto=format&fit=crop' }}
            style={styles.heroImage}
          />
        </View>

        {/* How It Works Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.stepsContainer}>
            {steps.map((step, index) => (
              <View key={index} style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Featured Markets */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Markets</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredMarkets.map((market, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.marketCard}
                onPress={() => router.push(`/market/${market.id}`)}
              >
                <Image source={{ uri: market.image }} style={styles.marketImage} />
                <View style={styles.marketInfo}>
                  <Text style={styles.marketName}>{market.name}</Text>
                  <Text style={styles.marketLocation}>{market.location}</Text>
                  
                  <Text style={styles.marketSubheading}>Today's Hours:</Text>
                  <Text style={styles.marketHours}>
                    {market.hours[getCurrentDay() as keyof typeof market.hours] || 'Closed'}
                  </Text>
                  
                  <View style={styles.vendorsList}>
                    {market.featuredVendors.map((vendor, idx) => (
                      <Text key={idx} style={styles.vendorName}>• {vendor.name}</Text>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Vendors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Vendors</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredVendors.map((vendor, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.vendorCard}
                onPress={() => router.push(`/market/vendor/${vendor.id}`)}
              >
                <Image source={{ uri: vendor.image }} style={styles.vendorImage} />
                <View style={styles.vendorInfo}>
                  <Text style={styles.vendorCardName}>{vendor.name}</Text>
                  <Text style={styles.vendorSpecialty}>{vendor.specialty}</Text>
                  <View style={styles.vendorMarkets}>
                    <Text style={styles.vendorSubheading}>Markets:</Text>
                    {vendor.markets.map((market, idx) => (
                      <Text key={idx} style={styles.vendorMarketName}>• {market}</Text>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredProducts.map((product, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.productCard}
                onPress={() => router.push(`/market/product/${product.id}`)}
              >
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productBadge}>
                  <Text style={styles.productBadgeText}>{product.badge}</Text>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productVendor}>{product.vendor}</Text>
                  <Text style={styles.productName}>{product.name}</Text>
                  <View style={styles.productPriceRow}>
                    <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                    <Text style={styles.productUnit}>/ {product.unit}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Testimonials - Commented out in original code */}
        {/* <View style={[styles.section, styles.testimonials]}>
          <Text style={styles.sectionTitle}>What Our Customers Say</Text>
          {testimonials.map((testimonial, index) => (
            <View key={index} style={styles.testimonialCard}>
              <Image source={{ uri: testimonial.avatar }} style={styles.testimonialAvatar} />
              <Text style={styles.testimonialText}>{testimonial.text}</Text>
              <Text style={styles.testimonialName}>{testimonial.name}</Text>
            </View>
          ))}
        </View> */}

        {/* CTA Section - Commented out in original code */}
        {/* <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Start Shopping?</Text>
          <Text style={styles.ctaSubtitle}>Join thousands of happy customers supporting local farmers</Text>
          <Link style={styles.ctaButton} href={'/(auth)/sign-up'}>
            <Text style={styles.ctaButtonText}>Sign Up Now</Text>
          </Link>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  hero: {
    padding: 20,
    backgroundColor: '#f0fdf4',
  },
  heroTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#166534',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1f2937',
    marginBottom: 20,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  step: {
    width: '30%',
    alignItems: 'center',
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  stepTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 5,
  },
  stepDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  horizontalScroll: {
    marginLeft: -20,
  },
  marketCard: {
    width: 280,
    marginLeft: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  marketImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  marketInfo: {
    padding: 12,
  },
  marketName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 5,
  },
  marketLocation: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  marketSubheading: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
    marginTop: 8,
    marginBottom: 2,
  },
  marketHours: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#16a34a',
    marginBottom: 8,
  },
  vendorsList: {
    marginTop: 4,
  },
  vendorName: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 2,
  },
  // Featured Vendors styles
  vendorCard: {
    width: 220,
    marginLeft: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  vendorImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  vendorInfo: {
    padding: 12,
  },
  vendorCardName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 4,
  },
  vendorSpecialty: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#16a34a',
    marginBottom: 8,
  },
  vendorMarkets: {
    marginTop: 4,
  },
  vendorSubheading: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  vendorMarketName: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 2,
  },
  // Featured Products styles
  productCard: {
    width: 160,
    marginLeft: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 130,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#16a34a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  productBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#ffffff',
  },
  productInfo: {
    padding: 12,
  },
  productVendor: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  productName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1f2937',
    marginBottom: 8,
  },
  productPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  productPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#16a34a',
  },
  productUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 2,
  },
  testimonials: {
    backgroundColor: '#f9fafb',
  },
  testimonialCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  testimonialAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 15,
  },
  testimonialText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  testimonialName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1f2937',
  },
  ctaSection: {
    padding: 20,
    backgroundColor: '#16a34a',
    alignItems: 'center',
  },
  ctaTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 20,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  ctaButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#16a34a',
  },
});

const steps = [
  {
    title: 'Find Markets',
    description: 'Discover local markets near you',
  },
  {
    title: 'Shop Vendors',
    description: 'Browse fresh produce and goods',
  },
  {
    title: 'Schedule Pickup',
    description: 'Choose your pickup time',
  },
];

const featuredMarkets = [
  {
    id: '1',
    name: 'Downtown Farmers Market',
    location: 'Central Square, 123 Main St',
    hours: {
      monday: 'Closed',
      tuesday: '8:00 AM - 2:00 PM',
      wednesday: '8:00 AM - 2:00 PM',
      thursday: 'Closed',
      friday: '8:00 AM - 2:00 PM',
      saturday: '7:00 AM - 3:00 PM',
      sunday: 'Closed'
    },
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2940&auto=format&fit=crop',
    featuredVendors: [
      {
        name: "Smith's Organic Produce",
        specialty: "Fresh vegetables and fruits",
        stallNumber: "A12"
      },
      {
        name: "Baker's Delight",
        specialty: "Artisanal breads and pastries",
        stallNumber: "B03"
      }
    ]
  },
  {
    id: '2',
    name: 'Riverside Market',
    location: 'Riverside Park, 456 River Road',
    hours: {
      monday: 'Closed',
      tuesday: 'Closed',
      wednesday: 'Closed',
      thursday: 'Closed',
      friday: '9:00 AM - 4:00 PM',
      saturday: '8:00 AM - 5:00 PM',
      sunday: '8:00 AM - 3:00 PM'
    },
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=2940&auto=format&fit=crop',
    featuredVendors: [
      {
        name: "Fresh Catch Fish Co.",
        specialty: "Sustainable seafood",
        stallNumber: "C15"
      },
      {
        name: "Green Valley Farms",
        specialty: "Organic dairy products",
        stallNumber: "D07"
      }
    ]
  }
];

const featuredVendors = [
  {
    id: '1',
    name: "Smith's Organic Produce",
    specialty: "Fresh vegetables and fruits",
    image: 'https://images.unsplash.com/photo-1470167290877-7d918128f179?q=80&w=2874&auto=format&fit=crop',
    markets: ["Downtown Farmers Market", "Westside Community Market"],
    description: "Family-owned farm specializing in heirloom vegetables and seasonal fruits grown using organic practices."
  },
  {
    id: '2',
    name: "Baker's Delight",
    specialty: "Artisanal breads and pastries",
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2940&auto=format&fit=crop',
    markets: ["Downtown Farmers Market", "Eastside Market"],
    description: "Artisanal bakery offering sourdough breads, croissants, and seasonal pastries made with locally sourced ingredients."
  },
  {
    id: '3',
    name: "Fresh Catch Fish Co.",
    specialty: "Sustainable seafood",
    image: 'https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?q=80&w=2070&auto=format&fit=crop',
    markets: ["Riverside Market", "Harbor Market"],
    description: "Sustainable seafood provider offering locally caught fish and shellfish with a focus on environmental stewardship."
  },
  {
    id: '4',
    name: "Green Valley Farms",
    specialty: "Organic dairy products",
    image: 'https://images.unsplash.com/photo-1529566652340-2c41a1eb6d93?q=80&w=2070&auto=format&fit=crop',
    markets: ["Riverside Market", "Downtown Farmers Market"],
    description: "Family dairy farm producing organic milk, cheese, yogurt, and butter from grass-fed cows."
  }
];

const featuredProducts = [
  {
    id: '1',
    name: "Heirloom Tomatoes",
    vendor: "Smith's Organic Produce",
    price: 4.99,
    unit: "lb",
    badge: "Organic",
    image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=2835&auto=format&fit=crop',
    description: "Assorted heirloom tomatoes grown without synthetic pesticides or fertilizers. Perfect for salads or fresh eating."
  },
  {
    id: '2',
    name: "Sourdough Bread",
    vendor: "Baker's Delight",
    price: 6.50,
    unit: "loaf",
    badge: "Artisanal",
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=2787&auto=format&fit=crop',
    description: "Traditional sourdough bread made with a 100-year-old starter and slow-fermented for 24 hours."
  },
  {
    id: '3',
    name: "Wild Caught Salmon",
    vendor: "Fresh Catch Fish Co.",
    price: 18.99,
    unit: "lb",
    badge: "Sustainable",
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=2070&auto=format&fit=crop',
    description: "Wild-caught Pacific salmon, sustainably harvested and delivered fresh daily."
  },
  {
    id: '4',
    name: "Organic Yogurt",
    vendor: "Green Valley Farms",
    price: 5.25,
    unit: "16oz",
    badge: "Organic",
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0bfdf63?q=80&w=2787&auto=format&fit=crop',
    description: "Creamy organic yogurt made from grass-fed cow's milk. Available in plain or with seasonal fruit."
  },
  {
    id: '5',
    name: "Fresh Berries Mix",
    vendor: "Smith's Organic Produce",
    price: 7.99,
    unit: "pint",
    badge: "Seasonal",
    image: 'https://images.unsplash.com/photo-1563746924237-f81657acd?q=80&w=2874&auto=format&fit=crop',
    description: "Mix of seasonal berries including strawberries, blueberries, and blackberries. Picked fresh daily."
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    text: 'FarmFresh Market has completely changed how I shop for produce. The quality is amazing!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2940&auto=format&fit=crop',
  },
  {
    name: 'Michael Chen',
    text: 'I love supporting local farmers and getting the freshest ingredients for my restaurant.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop',
  },
  {
    name: 'Emily Rodriguez',
    text: 'The convenience of finding all my favorite local vendors in one place is incredible.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop',
  },
];

const getCurrentDay = () => {
  return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()];
};