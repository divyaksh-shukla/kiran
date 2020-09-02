import React, { Component } from 'react';
import { base_url } from './utils';
import { FlatList, StyleSheet, View, TouchableHighlight, Image, Text } from 'react-native';

export class AssignmentCardsComponent extends Component {

    public state: any;
    public props: any;
    styles = StyleSheet.create({
        container: {
            paddingHorizontal: 8,
            marginBottom: 50,
            marginTop: 8
        },
        imageContainer: {

        },
        title: {

        },
        description: {

        }
    });
    constructor(props: any) {
        super(props);
        this.state = {
            assignments: []
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(`${base_url}/achievement/${this.props.page}/${encodeURI(this.props.skill)}/1`, { method: 'GET' })
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    assignments: data
                });
            })
            .catch((error: any) => {
                console.log(error)
                alert(error.message);
            });
    }

    private _makeAssignmentList(item: any, index: number, separators: any) {
        return (
            <TouchableHighlight>
                <View style={this.styles.imageContainer}>
                    <Image source={item.image} />
                </View>
                <View>
                    <Text style={this.styles.title}>{item.title}</Text>
                    <Text style={this.styles.description}>{item.description}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <FlatList numColumns={1} style={this.styles.container} data={this.state.assignments} renderItem={({ item, index, separators }) => this._makeAssignmentList(item, index, separators)} />
        )
    }
}