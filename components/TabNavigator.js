import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import DeckList from "./DeckList";
import DeckAdd from "./DeckAdd";

const Tab = createMaterialBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
    barStyle={{ backgroundColor: '#1b262c' }}
    options={{ headerTitle :"hello" }}
    >
      <Tab.Screen name="Decks" component={DeckList} options={{ tabBarLabel: "Decks" }}/>
      <Tab.Screen name="Add Deck" component={DeckAdd} options={{ tabBarLabel: "Add Deck" }}/>
    </Tab.Navigator>
  );
}

export default TabNavigator
