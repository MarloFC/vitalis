const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add resolver configuration to handle incorrect module paths
config.resolver.alias = {
  '@react-native-vector-icons/material-design-icons': '@expo/vector-icons/MaterialCommunityIcons',
  '@react-native-vector-icons/material-community-icons': '@expo/vector-icons/MaterialCommunityIcons',
};

module.exports = config;
