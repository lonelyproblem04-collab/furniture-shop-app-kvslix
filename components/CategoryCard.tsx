
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Category } from '../types/Product';
import { colors, commonStyles } from '../styles/commonStyles';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export default function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: category.imageUrl }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.name}>{category.name}</Text>
        <Text style={styles.productCount}>{category.productCount} items</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    width: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.backgroundAlt,
    marginBottom: 2,
  },
  productCount: {
    fontSize: 12,
    color: colors.backgroundAlt,
    opacity: 0.8,
  },
});
