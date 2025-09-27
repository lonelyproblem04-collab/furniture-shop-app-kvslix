
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors } from '../../styles/commonStyles';
import { allProducts } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import ProductCard from '../../components/ProductCard';
import SearchBar from '../../components/SearchBar';
import CartButton from '../../components/CartButton';
import Icon from '../../components/Icon';

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const { addToCart, getTotalItems } = useCart();

  const filteredProducts = allProducts
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleProductPress = (productId: string) => {
    console.log('Product pressed:', productId);
    router.push(`/product/${productId}`);
  };

  const handleAddToCart = (product: any) => {
    console.log('Adding product to cart:', product.name);
    addToCart(product);
  };

  const handleBackPress = () => {
    console.log('Back button pressed');
    router.back();
  };

  const handleCartPress = () => {
    console.log('Cart button pressed');
    router.push('/cart');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Products</Text>
        <CartButton itemCount={getTotalItems()} onPress={handleCartPress} />
      </View>

      <View style={commonStyles.content}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products..."
        />

        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <View style={styles.sortButtons}>
            {[
              { key: 'name', label: 'Name' },
              { key: 'price', label: 'Price' },
              { key: 'rating', label: 'Rating' },
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.sortButton,
                  sortBy === option.key && styles.sortButtonActive
                ]}
                onPress={() => setSortBy(option.key as any)}
              >
                <Text style={[
                  styles.sortButtonText,
                  sortBy === option.key && styles.sortButtonTextActive
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.resultCount}>
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => handleProductPress(product.id)}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sortLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginRight: 12,
  },
  sortButtons: {
    flexDirection: 'row',
    flex: 1,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.border,
    marginRight: 8,
  },
  sortButtonActive: {
    backgroundColor: colors.primary,
  },
  sortButtonText: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '500',
  },
  sortButtonTextActive: {
    color: colors.backgroundAlt,
  },
  resultCount: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
