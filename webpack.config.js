const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    // Disable webpack-dev-server deprecation warnings
    mode: env.mode || 'development',
  }, argv);

  // Resolve alias for vector icons to prevent module not found errors
  config.resolve.alias = {
    ...config.resolve.alias,
    '@react-native-vector-icons/material-design-icons': '@expo/vector-icons/MaterialCommunityIcons',
    '@react-native-vector-icons/material-community-icons': '@expo/vector-icons/MaterialCommunityIcons',
  };

  return config;
};
