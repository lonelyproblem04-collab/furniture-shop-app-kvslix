
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import { featuredProducts, categories } from '../data/products';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import SearchBar from '../components/SearchBar';
import CartButton from '../components/CartButton';
import Logo from '../components/Logo';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, getTotalItems } = useCart();

  const handleProductPress = (productId: string) => {
    console.log('Product pressed:', productId);
    router.push(`/product/${productId}`);
  };

  const handleCategoryPress = (categoryId: string) => {
    console.log('Category pressed:', categoryId);
    router.push(`/category/${categoryId}`);
  };

  const handleAddToCart = (product: any) => {
    console.log('Adding product to cart:', product.name);
    addToCart(product);
  };

  const handleCartPress = () => {
    console.log('Cart button pressed');
    router.push('/cart');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <Logo size="medium" showText={true} />
        <CartButton itemCount={getTotalItems()} onPress={handleCartPress} />
      </View>

      <View style={styles.welcomeSection}>
        <Text style={styles.greeting}>Good morning!</Text>
        <Text style={commonStyles.title}>Find Your Perfect Furniture</Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search furniture..."
        />

        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => handleCategoryPress(category.id)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={commonStyles.section}>
          <View style={commonStyles.spaceBetween}>
            <Text style={commonStyles.subtitle}>Featured Products</Text>
            <TouchableOpacity onPress={() => router.push('/products')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.productsGrid}>
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => handleProductPress(product.id)}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </View>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>New Arrivals</Text>
          <View style={styles.productsGrid}>
            {featuredProducts.filter(p => p.isNew).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => handleProductPress(product.id)}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </View>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Sale Items</Text>
          <View style={styles.productsGrid}>
            {featuredProducts.filter(p => p.isSale).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => handleProductPress(product.id)}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </View>
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
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: colors.backgroundAlt,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  welcomeSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 4,
  },
  categoriesScroll: {
    marginBottom: 8,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});
