
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function Logo({ size = 'medium', showText = true }: LogoProps) {
  const logoSize = size === 'small' ? 40 : size === 'medium' ? 60 : 80;
  const textSize = size === 'small' ? 16 : size === 'medium' ? 20 : 24;
  const taglineSize = size === 'small' ? 10 : size === 'medium' ? 12 : 14;

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/c56464e8-cce8-4570-91a2-862e3f1e69e2.jpeg')}
        style={[styles.logo, { width: logoSize, height: logoSize }]}
        resizeMode="contain"
      />
      {showText && (
        <View style={styles.textContainer}>
          <Text style={[styles.brandName, { fontSize: textSize }]}>R&G HOME'S</Text>
          <Text style={[styles.tagline, { fontSize: taglineSize }]}>feel the luxury.....</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 12,
  },
  brandName: {
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 0.5,
  },
  tagline: {
    color: colors.textLight,
    fontStyle: 'italic',
    marginTop: 2,
  },
});
