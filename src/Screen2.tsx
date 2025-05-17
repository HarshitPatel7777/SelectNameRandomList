import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';

function generateUniquePermutations(names) {
    const nameCount = names.length;
    const allPerms = [];

    const isValid = (perm, existingPerms) => {
        return existingPerms.every((existing) =>
            perm.every((item, index) => item !== existing[index])
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
    while (allPerms.length < nameCount && attempts < 1000) {
        const perm = shuffle(names);
        if (isValid(perm, allPerms)) {
            allPerms.push(perm);
        }
        attempts++;
    }

    return allPerms;
}

const Screen2 = ({ route }) => {
    const { selectedNames } = route.params;
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const names = selectedNames.map((item) => item.name);
        const permutedLists = generateUniquePermutations(names);
        setLists(permutedLists);
    }, [selectedNames]);

    return (
        <ScrollView>
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
    container: { flex: 1, padding: 20 },
    listContainer: { marginBottom: 20, backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8 , borderWidth:0.5},
    listTitle: { fontWeight: 'bold', marginBottom: 5 },
    nameItem: { fontSize: 16, marginLeft: 10 },
});

export default Screen2;
