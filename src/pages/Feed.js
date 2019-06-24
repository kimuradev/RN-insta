import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../services/api';

import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';

import Camera from '../assets/instagram-camera.png';

const more = <Icon name="more-horiz" size={15} color="#000" />;
const like = <Icon name="thumb-up" size={15} color="#000" />;
const comment = <Icon name="comment" size={15} color="#000" />;
const send = <Icon name="send" size={15} color="#000" />;

export default class Feed extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('New')}
        style={{ marginRight: 20 }}
      >
        <Image source={Camera} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
    )
  });

  state = {
    feed: []
  };

  async componentDidMount() {
    //this.registerToSocket()

    const response = await api.get('posts');

    console.log(response.data);

    this.setState({ feed: response.data });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.feed}
          keyExtractor={post => post._id}
          renderItem={({ item }) => (
            <View style={styles.feedItem}>
              <View style={styles.feedItemHeader}>
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{item.author}</Text>
                  <Text style={styles.place}>{item.place}</Text>
                </View>

                <Icon name="more-horiz" size={15} color="#000" />
              </View>

              <Image
                style={styles.feedImage}
                source={{ uri: `http://10.0.3.2:3333/files/${item.image}` }}
              />

              <View style={styles.feedItemFooter}>
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Icon name="thumb-up" size={15} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Icon name="comment" size={15} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Icon name="send" size={15} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.likes}>{item.likes} curtidas</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.hashtags}>{item.hashtags}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  feedItem: {
    marginTop: 20
  },
  feedItemHeader: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: 14,
    color: '#000'
  },
  place: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15
  },
  feedItemFooter: {
    paddingHorizontal: 15
  },
  actions: {
    flexDirection: 'row'
  },
  action: {
    marginRight: 8
  },
  likes: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#000'
  },
  description: {
    lineHeight: 18,
    color: '#000'
  },
  hashtags: {
    color: '#7159c1'
  }
});
