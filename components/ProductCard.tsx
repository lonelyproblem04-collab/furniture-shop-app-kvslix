
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../types/Product';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onPress, onAddToCart }: ProductCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
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
        {!product.inStock && (
          <View style={styles.outOfStockOverlay}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
        
        <View style={styles.ratingContainer}>
          <Icon name="star" size={14} color={colors.warning} />
          <Text style={styles.rating}>{product.rating}</Text>
          <Text style={styles.reviewCount}>({product.reviewCount})</Text>
        </View>
        
        <View style={commonStyles.spaceBetween}>
          <View style={commonStyles.row}>
            <Text style={commonStyles.price}>${product.price}</Text>
            {product.originalPrice && (
              <Text style={commonStyles.originalPrice}>${product.originalPrice}</Text>
            )}
          </View>
          
          <TouchableOpacity
            style={[styles.addButton, !product.inStock && styles.addButtonDisabled]}
            onPress={onAddToCart}
            disabled={!product.inStock}
            activeOpacity={0.7}
          >
            <Icon 
              name={product.inStock ? "add" : "close"} 
              size={20} 
              color={product.inStock ? colors.backgroundAlt : colors.textLight} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.productCard,
    width: '48%',
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.accent,
  },
  saleBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.error,
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  outOfStockText: {
    color: colors.backgroundAlt,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    lineHeight: 20,
  },
  category: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 4,
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: colors.border,
  },
});
