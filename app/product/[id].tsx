
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import { allProducts } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, getTotalItems } = useCart();

  const product = allProducts.find(p => p.id === id);

  if (!product) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={[commonStyles.container, commonStyles.center]}>
          <Text style={commonStyles.text}>Product not found</Text>
          <Button text="Go Back" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    console.log('Adding to cart:', product.name, 'quantity:', quantity);
    addToCart(product, quantity);
    router.push('/cart');
  };

  const handleBackPress = () => {
    console.log('Back button pressed');
    router.back();
  };

  const handleCartPress = () => {
    console.log('Cart button pressed');
    router.push('/cart');
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCartPress} style={styles.cartButton}>
          <Icon name="bag" size={24} color={colors.text} />
          {getTotalItems() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
          {product.isNew && (
            <View style={[commonStyles.badge, styles.newBadge]}>
              <Text style={commonStyles.badgeText}>NEW</Text>
            </View>
          )}
          {product.isSale && (
            <View style={[commonStyles.badge, styles.saleBadge]}>
              <Text style={commonStyles.badgeText}>SALE</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={commonStyles.title}>{product.name}</Text>
          
          <View style={styles.ratingContainer}>
            <View style={commonStyles.row}>
              <Icon name="star" size={16} color={colors.warning} />
              <Text style={styles.rating}>{product.rating}</Text>
              <Text style={styles.reviewCount}>({product.reviewCount} reviews)</Text>
            </View>
            <Text style={[styles.stockStatus, { color: product.inStock ? colors.success : colors.error }]}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price}</Text>
            {product.originalPrice && (
              <Text style={commonStyles.originalPrice}>${product.originalPrice}</Text>
            )}
            {product.originalPrice && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Text>
              </View>
            )}
          </View>

          <Text style={commonStyles.subtitle}>Description</Text>
          <Text style={[commonStyles.text, styles.description]}>{product.description}</Text>

          {product.inStock && (
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>Quantity:</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
                  <Icon name="remove" size={20} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
                  <Icon name="add" size={20} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <Button
              text={product.inStock ? `Add to Cart - $${(product.price * quantity).toFixed(2)}` : 'Out of Stock'}
              onPress={handleAddToCart}
              style={[
                buttonStyles.primary,
                !product.inStock && styles.disabledButton
              ]}
              textStyle={{
                color: colors.backgroundAlt,
                fontSize: 16,
                fontWeight: '600',
              }}
            />
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
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  cartButton: {
    padding: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: colors.backgroundAlt,
    fontSize: 12,
    fontWeight: '600',
  },
  imageContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  newBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: colors.accent,
  },
  saleBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: colors.error,
  },
  content: {
    paddingHorizontal: 16,
  },
  category: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 4,
  },
  stockStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  discountBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.backgroundAlt,
  },
  description: {
    marginBottom: 24,
    lineHeight: 24,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 16,
    minWidth: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 24,
  },
  disabledButton: {
    backgroundColor: colors.border,
  },
});
