import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from 'react-native';
import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealList from "../components/MealList";
import DefaultText from '../components/DefaultText';

const CategoryMealScreen = (props) => {
  const catId = props.route.params.categoryId;
  const filteredMeal = useSelector((state) => state.meals.filteredMeals);

  const displayedMeals = filteredMeal.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );
  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, maybe check your filters?</DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} meal/>;
};

// CategoryMealScreen.navigationOptions = navigationData => {
//   const catId = navigationData.navigation.getParam('categoryId');

//   const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

//   return {
//     headerTitle: selectedCategory.title
//   };
// };
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CategoryMealScreen;
