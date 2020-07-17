import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, ToastAndroid, TouchableOpacity, FlatList } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { base_url } from './utils';

import { AchivementResponse } from './interfaces';

export class SkillCardsComponent extends Component {

    public styles = StyleSheet.create({
        container: {
            paddingHorizontal: 8,
            marginBottom: 50,
            marginTop: 8
        },
        footerContainer: {
            paddingHorizontal: 8,
        },
        card: {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            padding: 8,
            marginBottom: 8,
            borderStyle: 'solid',
            borderWidth: 2,
            borderRadius: 8,
            borderColor: '#ccc',
        },

        header: {
            alignItems: 'center',
            backgroundColor: 'gray',
            borderRadius: 4,
            padding: 8,
        },

        content: {
            display: 'flex',
            padding: 8,
            flexDirection: 'row'
        },

        level: {
            flex: 5,
            alignSelf: 'flex-start',
        },

        assignment: {
            flex: 1,
            alignItems: 'flex-end'
        }

    });

    pages = [
        {
            title: 'Materials',
            backgroundColor: '#CC0204',
            color: 'white',
            key: '1'
        },
        {
            title: 'Concepts',
            backgroundColor: '#FCFE04',
            color: 'black',
            key: '2'
        },
        {
            title: 'Theory',
            backgroundColor: '#04319C',
            color: 'white',
            key: '3'
        }
    ];

    state: any;

    constructor(props: any) {
        super(props);
        this.state = {
            page: 'Materials',
            pages: this.pages,
        };
    }

    public componentDidMount() {
        fetch(`${base_url}/achievement/1`, { method: 'GET' })
            .then((data) => data.json())
            .then((data) => {
                this.setState({
                    skills: data
                });
            });
    }

    private _touchedSkill(skill: any) {
        console.log(skill);
    }

    private _makeSkillList(skill: any, index: number, separators: any) {
        return (
            <TouchableOpacity style={this.styles.card} onPress={() => this._touchedSkill(skill)}>
                <View style={{ ...this.styles.header, backgroundColor: skill.color }}>
                    <Text style={{ color: 'white' }}>{skill.title}</Text>
                </View>
                <View style={this.styles.content}>
                    <View style={this.styles.level}>
                        <Text>Level 1: Basic</Text>
                    </View>
                    <View style={this.styles.assignment}>
                        <Text style={{ color: 'green' }}>0/5</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    private _makePageSwitchBox(page: any, index: number, separators: any) {
        return (
            <TouchableOpacity style={{ ...this.styles.card, backgroundColor: page.backgroundColor, marginVertical: 8, flex: 1, alignSelf: 'flex-end' }} onPress={() => this.setState({ page: page.title })}>
                <View>
                    <Text style={{ color: page.color, textAlign: "center" }}>{page.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {

        var page: any[] = [];
        if (this.state.page === 'Materials')
            page.push(<FlatList numColumns={1} style={this.styles.container} data={this.state.skills} renderItem={({ item, index, separators }) => this._makeSkillList(item, index, separators)} />);

        page.push(
            <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
                <FlatList numColumns={3} style={{ ...this.styles.footerContainer, alignContent: 'stretch', backgroundColor: 'white' }} data={this.state.pages} renderItem={({ item, index, separators }) => this._makePageSwitchBox(item, index, separators)} />
            </View>
        );
        return page;
    }
}
