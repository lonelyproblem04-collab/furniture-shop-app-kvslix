
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import { useCart } from '../../hooks/useCart';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function CartScreen() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const handleBackPress = () => {
    console.log('Back button pressed');
    router.back();
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout');
    // In a real app, this would navigate to checkout flow
    alert('Checkout functionality would be implemented here');
  };

  const handleClearCart = () => {
    console.log('Clearing cart');
    clearCart();
  };

  const incrementQuantity = (productId: string, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const decrementQuantity = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={[commonStyles.container, commonStyles.center]}>
          <Icon name="bag-outline" size={80} color={colors.textLight} />
          <Text style={[commonStyles.title, { marginTop: 16 }]}>Your cart is empty</Text>
          <Text style={[commonStyles.textLight, { textAlign: 'center', marginBottom: 32 }]}>
            Add some furniture to get started
          </Text>
          <Button
            text="Continue Shopping"
            onPress={() => router.push('/')}
            style={buttonStyles.primary}
            textStyle={{ color: colors.backgroundAlt, fontSize: 16, fontWeight: '600' }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart ({cartItems.length})</Text>
        <TouchableOpacity onPress={handleClearCart} style={styles.clearButton}>
          <Icon name="trash-outline" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <View key={item.product.id} style={styles.cartItem}>
            <Image source={{ uri: item.product.imageUrl }} style={styles.itemImage} />
            
            <View style={styles.itemDetails}>
              <Text style={styles.itemName} numberOfLines={2}>{item.product.name}</Text>
              <Text style={styles.itemCategory}>{item.product.category}</Text>
              <Text style={styles.itemPrice}>${item.product.price}</Text>
            </View>

            <View style={styles.itemControls}>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.product.id)}
              >
                <Icon name="close" size={16} color={colors.error} />
              </TouchableOpacity>

              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => decrementQuantity(item.product.id, item.quantity)}
                >
                  <Icon name="remove" size={16} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => incrementQuantity(item.product.id, item.quantity)}
                >
                  <Icon name="add" size={16} color={colors.text} />
                </TouchableOpacity>
              </View>

              <Text style={styles.itemTotal}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>${getTotalPrice().toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping:</Text>
            <Text style={styles.summaryValue}>Free</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax:</Text>
            <Text style={styles.summaryValue}>${(getTotalPrice() * 0.08).toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>${(getTotalPrice() * 1.08).toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            text="Proceed to Checkout"
            onPress={handleCheckout}
            style={buttonStyles.primary}
            textStyle={{ color: colors.backgroundAlt, fontSize: 16, fontWeight: '600' }}
          />
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  clearButton: {
    padding: 8,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  itemControls: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  removeButton: {
    padding: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  summary: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  buttonContainer: {
    marginBottom: 24,
  },
});
