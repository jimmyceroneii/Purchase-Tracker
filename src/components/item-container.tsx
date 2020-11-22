import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ItemType} from '../../App';
import {EditableItem} from './item-editable';
import {StaticItem} from './item-static';

type Props = {
  item: ItemType;
  onAdd: (item: ItemType) => void;
  updateList: () => void;
};

export const ItemContainer: React.FC<Props> = (props) => {
  const [editing, setEditing] = useState(false);

  return (
    <View style={styles.item}>
      {editing ? (
        <EditableItem
          item={props.item}
          onAddItem={props.onAdd}
          updateList={props.updateList}
          setEditing={() => setEditing(false)}
        />
      ) : (
        <StaticItem item={props.item} setEditing={() => setEditing(true)} />
      )}
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
    marginBottom: 5,
  },
});
