import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {ItemType} from '../../App';

type Props = {
  item: ItemType;
  setEditing: () => void;
};

export const StaticItem: React.FC<Props> = (props) => {
  const itemCount = props.item ? parseInt(props.item.count, 10) : 0;
  const itemName = props.item ? props.item.name : '';

  return (
    <View style={styles.item}>
      <View style={styles.itemDetails}>
        <Text style={styles.name}>{itemName}</Text>
        <Text>{itemCount}</Text>
      </View>
      <View style={styles.edit}>
        <Button title="Edit" onPress={() => props.setEditing()} />
      </View>
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

    width: '100%',
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '50%',
  },
  name: {
    marginLeft: 20,
  },
  edit: {
    backgroundColor: 'yellow',
    height: 50,
    width: 75,
    borderRadius: 5,

    marginRight: 20,
  },
});
