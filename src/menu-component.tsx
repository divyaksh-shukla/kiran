import React from 'react';
import { Icon } from "react-native-elements";
import { ToastAndroid } from 'react-native';

function onMenuPress() {
    ToastAndroid.show('Clicked Menu', ToastAndroid.SHORT);
}

export function MenuComponent() {
    return (
        <Icon name='menu' onPress={() => onMenuPress()} color='#fff' />
    )
}