import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/home';
import Products from '../views/products';
import DetailProduct from '../views/detailProduct';
import ShoppingCart from '../views/shoppingCart';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="DetailProduct" component={DetailProduct} />
      <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
    </Stack.Navigator>
  );
};

export default Router;
