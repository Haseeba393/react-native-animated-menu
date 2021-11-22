import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import animated_accordion_data from '../config/animated_homemenu_data';
import {Transition, Transitioning} from 'react-native-reanimated';
const AnimatedAccordion = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const ref = useRef<any>(null);
  const transition = (
    <Transition.Together>
      <Transition.In type="fade" durationMs={200} />
      <Transition.Change />
      <Transition.Out type="fade" durationMs={200} />
    </Transition.Together>
  );

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={styles._mainContainer}>
      {animated_accordion_data.map(
        ({category, bg, color, subCategories}, index) => (
          <TouchableOpacity
            onPress={() => {
              setCurrentIndex(index === currentIndex ? -1 : index);
              if (ref != null) ref.current.animateNextTransition();
            }}
            activeOpacity={0.9}
            key={category}
            style={[styles._card, {backgroundColor: bg}]}>
            <Text style={[styles._heading, {color}]}>{category}</Text>
            {index === currentIndex && (
              <View style={{marginTop: 10}}>
                {subCategories.map((subcategory, index) => (
                  <Text
                    key={subcategory}
                    style={[styles._subcategory, {color}]}>
                    {subcategory}
                  </Text>
                ))}
              </View>
            )}
          </TouchableOpacity>
        ),
      )}
    </Transitioning.View>
  );
};

const styles = StyleSheet.create({
  _mainContainer: {
    flex: 1,
  },
  _card: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  _heading: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: -2,
    textTransform: 'uppercase',
  },
  _subcategory: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default AnimatedAccordion;
