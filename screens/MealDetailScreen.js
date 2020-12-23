import React, { useCallback } from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from '../store/actions/meals';

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = ({ navigation, route }) => {
  // const mealId = props.route.params.mealId
  const availableMeals = useSelector((state) => state.meals.meals);
  const mealId = route.params.mealId;
  const isFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );
  // const selectedMeal = availableMeals.find(mfeal => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  // useEffect(() => {
  //   // props.navigation.setParams({ mealTitle: selectedMeal.title });
  //   props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  // }, [toggleFavoriteHandler]);

  // useEffect(() => {
  //   props.navigation.setParams({ isFav: currentMealIsFavorite });
  // }, [currentMealIsFavorite]);

  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  React.useLayoutEffect(() => {
    navigation.setOptions(
      // const mealId = route.params.mealId;
      {
        headerTitle: selectedMeal.title,
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Favorite"
              iconName={isFavorite ? "ios-star" : "ios-star-outline"}
              onPress={toggleFavoriteHandler}
            />
          </HeaderButtons>
        ),
      }
    );
  }, [navigation, toggleFavoriteHandler, isFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

// MealDetailScreen.navigationOptions = navigationData => {
//   const mealId = navigation.route.params.mealId;
//   const selectedMeal = MEALS.find(meal => meal.id === mealId);
//   return {
//     headerTitle: selectedMeal.title,
//     headerRight: (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Favorite"
//           iconName="ios-star"
//           onPress={() => {
//             console.log('Mark as favorite!');
//           }}
//         />
//       </HeaderButtons>
//     )
//   };
// };

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
