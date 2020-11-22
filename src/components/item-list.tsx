import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ItemType} from '../../App';
import {ItemContainer} from './item-container';
import {NewItem} from './new-item';

type Props = {
  itemList: ItemType[];
  onAddItem: (item: ItemType) => void;
  updateList: () => void;
};

export const ItemList: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      {props.itemList.map((item: ItemType, i: number) => {
        return (
          <View key={i}>
            <ItemContainer
              item={item}
              onAdd={props.onAddItem}
              updateList={props.updateList}
            />
          </View>
        );
      })}
      <NewItem onAddItem={props.onAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
});
