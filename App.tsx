import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {ItemList} from './src/components/item-list';

export type ItemType = {
  name: string;
  count: string;
};

const App = () => {
  const [items, setItems] = useState([{name: '', count: ''}]);

  const getList = async (): Promise<Error | ItemType[]> => {
    let itemList: ItemType[];
    try {
      const keys = await AsyncStorage.getAllKeys();
      const storageItems = await AsyncStorage.multiGet(keys);
      itemList = storageItems.map((item) => {
        // todo find out why this could be null
        if (item[1]) {
          return {
            name: item[0],
            count: item[1],
          };
        } else {
          throw new Error(`Item is not valid ${item}`);
        }
      });
      setItems(itemList);
      console.log(itemList);
      return itemList;
    } catch (e) {
      return new Error(e);
    }
  };

  const handleAdd = async (value: ItemType) => {
    try {
      await AsyncStorage.setItem(`${value.name}`, `${value.count}`);
      await getList();
    } catch (e) {
      return new Error(e);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ItemList itemList={items} onAddItem={handleAdd} updateList={getList} />
      </SafeAreaView>
    </>
  );
};

export default App;
