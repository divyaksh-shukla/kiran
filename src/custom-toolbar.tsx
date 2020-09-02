import React from "react";
import { StyleSheet, TouchableNativeFeedbackBase } from "react-native";
import { Appbar } from 'react-native-paper';
import { EventEmmitter, EventNames } from "./utils";


export class CustomToolbar extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }
    styles = StyleSheet.create({
        toolbar: {
            backgroundColor: '#0F26BA',
            marginTop: 32
        }
    });

    onMenuPress() {
        console.log('MENU Clicked');
        EventEmmitter.dispatch(EventNames.openNavigationDrawer, {});
    }

    render() {
        return (
            <Appbar.Header style={this.styles.toolbar} accessibilityStates="expanded">
                <Appbar.Action icon="menu" onPress={() => this.onMenuPress()} accessibilityStates="expanded"/>
                <Appbar.Content title="Varsha Arts" accessibilityStates="expanded" subtitle={this.props.subtitle} />
                <Appbar.Action icon="dots-vertical" accessibilityStates="expanded" />
            </Appbar.Header>
        );
    }
}