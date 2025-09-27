
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
import Logo from '../../components/Logo';

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const { addToCart, getTotalItems } = useCart();

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
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
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Logo size="small" showText={false} />
        </View>
        <CartButton itemCount={getTotalItems()} onPress={handleCartPress} />
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={commonStyles.title}>All Products</Text>
          <Text style={commonStyles.textLight}>{sortedProducts.length} items</Text>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products..."
        />

        <View style={styles.sortSection}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <View style={styles.sortButtons}>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'name' && styles.sortButtonActive]}
              onPress={() => setSortBy('name')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'name' && styles.sortButtonTextActive]}>
                Name
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'price-low' && styles.sortButtonActive]}
              onPress={() => setSortBy('price-low')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'price-low' && styles.sortButtonTextActive]}>
                Price: Low to High
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'price-high' && styles.sortButtonActive]}
              onPress={() => setSortBy('price-high')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'price-high' && styles.sortButtonTextActive]}>
                Price: High to Low
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.productsGrid}>
          {sortedProducts.map((product) => (
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.backgroundAlt,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  titleSection: {
    marginBottom: 16,
  },
  sortSection: {
    marginBottom: 16,
  },
  sortLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  sortButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sortButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sortButtonText: {
    fontSize: 14,
    color: colors.text,
  },
  sortButtonTextActive: {
    color: colors.backgroundAlt,
    fontWeight: '600',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
