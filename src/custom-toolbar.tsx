import React from "react";
import { Text, StyleSheet } from "react-native";
import { Header, Icon } from 'react-native-elements';
import { MenuComponent } from "./menu-component";


export class CustomToolbar extends React.Component {
    styles = StyleSheet.create({
        toolbar: {
            backgroundColor: '#0F26BA'
        }
    });

    onMenuPress(event: any) {
        console.log('MENU Clicked');
    }

    render() {
        return (
            <Header 
            placement='left'
            backgroundColor={this.styles.toolbar.backgroundColor}
                leftComponent={<MenuComponent />}
                centerComponent={{ text:'Varsha Arts', style:{ color:'#fff' } }}
                rightComponent={<Icon name='rowing' type='material' color='white' />}
            />
        );
    }
}