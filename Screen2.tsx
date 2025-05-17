import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

function generateStrictUniquePositionPermutations(names) {
  const listCount = names.length;
  const permutations = [];

  const isPositionallyUnique = (newList, existingLists) => {
    return existingLists.every(existing =>
      newList.every((name, idx) => name !== existing[idx])
    );
  };

  const shuffle = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  let attempts = 0;
  const maxAttempts = 5000;

  while (permutations.length < listCount && attempts < maxAttempts) {
    const candidate = shuffle(names);
    if (isPositionallyUnique(candidate, permutations)) {
      permutations.push(candidate);
    }
    attempts++;
  }

  return permutations;
}

const Screen2 = ({ route }) => {
  const { selectedNames } = route.params;
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const names = selectedNames.map((item) => item.name);
    const permutedLists = generateStrictUniquePositionPermutations(names);
    setLists(permutedLists);
  }, [selectedNames]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {lists.map((list, index) => (
          <View key={index} style={styles.listContainer}>
            <Text style={styles.listTitle}>List {index + 1}:</Text>
            {list.map((name, idx) => (
              <Text key={idx} style={styles.nameItem}>
                {name}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingBottom:25
  },
  container: {
    flex: 1,
  },
  listContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth:1,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  nameItem: {
    fontSize: 14,
    paddingLeft: 10,
    marginVertical: 2,
  },
});

export default Screen2;
