import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const Screen1 = ({ navigation }) => {
  const [name, setName] = useState('');
  const [namesList, setNamesList] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);

  const handleAddName = () => {
    if (name.trim()) {
      setNamesList([...namesList, { name, id: Date.now().toString() }]);
      setName('');
    }
  };

  const toggleSelection = (id) => {
    if (selectedNames.includes(id)) {
      setSelectedNames(selectedNames.filter((item) => item !== id));
    } else {
      setSelectedNames([...selectedNames, id]);
    }
  };

  const removeName = (id) => {
    setNamesList((prev) => prev.filter((item) => item.id !== id));
    setSelectedNames((prev) => prev.filter((item) => item !== id));
  };

  const goToScreen2 = () => {
    const selected = namesList.filter((item) =>
      selectedNames.includes(item.id)
    );
    navigation.navigate('Screen2', { selectedNames: selected });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Add Name" onPress={handleAddName} />

      <FlatList
        data={namesList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              backgroundColor: selectedNames.includes(item.id)
                ? '#d0f0c0'
                : '#f0f0f0',
              marginTop: 5,
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={() => toggleSelection(item.id)}
              style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
            >
              <Text style={{ marginRight: 10 }}>
                {selectedNames.includes(item.id) ? '✅' : '⬜'}
              </Text>
              <Text>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeName(item.id)}>
              <Text style={{ color: 'red', fontSize: 18 }}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Button
        title="Go to Screen 2"
        onPress={goToScreen2}
        disabled={selectedNames.length === 0}
      />
    </View>
  );
};

export default Screen1;
