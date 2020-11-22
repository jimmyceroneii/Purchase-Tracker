import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ItemType} from '../../App';

type Props = {
  item: ItemType;
  onAddItem: (item: ItemType) => void;
  updateList: () => void;
  setEditing: () => void;
};

export const EditableItem: React.FC<Props> = (props) => {
  const itemCount = props.item ? props.item.count : '0';
  const itemName = props.item ? props.item.name : '';
  const [count, setCount] = useState(itemCount);
  const [name, setName] = useState(itemName);

  return (
    <View style={styles.item}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(newName: string) => setName(newName)}
      />
      <Text>{itemCount}</Text>
      <Button
        title="+"
        onPress={() => {
          const updatedIntCount = parseInt(count, 10) + 1;
          setCount(`${updatedIntCount}`);
          props.onAddItem({name: itemName, count: `${updatedIntCount}`});
        }}
      />
      <Button
        title="-"
        onPress={() => {
          const intCount = parseInt(count, 10);
          if (intCount > 0) {
            const updatedIntCount = intCount - 1;
            setCount(`${updatedIntCount}`);
            props.onAddItem({name: itemName, count: `${updatedIntCount}`});
          }
        }}
      />
      <View style={styles.save}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (name.length > 0) {
              props.onAddItem({name: name, count: count});
              props.updateList();
              props.setEditing();
            }
          }}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.delete}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            AsyncStorage.removeItem(itemName);
            props.updateList();
            props.setEditing();
          }}>
          <Text>Del</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',

    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {
    color: 'black',
    backgroundColor: 'red',

    height: 50,
    width: 50,
    borderRadius: 5,
  },
  save: {
    backgroundColor: 'green',
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  input: {
    height: 50,
    width: 100,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
});
