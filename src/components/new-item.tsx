import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {ItemType} from '../../App';

type Props = {
  onAddItem: (item: ItemType) => void;
};

export const NewItem: React.FC<Props> = (props) => {
  const [newItem, setNewItem] = useState('');

  return (
    <View style={styles.item}>
      <TextInput
        style={styles.input}
        value={newItem}
        onChangeText={(value) => setNewItem(value)}
      />
      <Button
        title="Add Item"
        onPress={() => {
          if (newItem.length > 0) {
            props.onAddItem({name: newItem, count: '0'});
            setNewItem('');
          } else {
            console.error('Please Enter a Value');
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    height: 50,
    width: 100,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
});
