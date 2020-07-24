import React from 'react';
import { ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';

function onInfoPress() {
    ToastAndroid.show('Clicked Info', ToastAndroid.SHORT);
}

export function InfoComponent() {
    return (
        <Icon name='info' onPress={() => onInfoPress()} color='white' />
    )
}