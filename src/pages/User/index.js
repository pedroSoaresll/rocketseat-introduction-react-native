import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  AreaActivityIndicator,
} from './styles';

export default class User extends Component {
  state = {
    stars: [],
    loading: false,
    page: 1,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const { data } = await this.getStarredRepos();

    this.setState({ stars: data, loading: false });
  }

  handleEndReached = async () => {
    const { page, stars } = this.state;

    const nextPage = page + 1;

    const { data } = await this.getStarredRepos(nextPage);

    this.setState({ stars: [...stars, ...data], page: nextPage });
  };

  getStarredRepos = (page = 1) => {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    return api.get(`/users/${user.login}/starred?page=${page}`);
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <AreaActivityIndicator>
            <ActivityIndicator color="#333" size={30} />
          </AreaActivityIndicator>
        ) : (
            <Stars
              data={stars}
              keyExtractor={star => String(star.id)}
              onEndReached={this.handleEndReached}
              renderItem={({ item }) => (
                <WebView source={{ uri: item.url }}>
                  <Starred>
                    <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                    <Info>
                      <Title>{item.name}</Title>
                      <Author>{item.owner.login}</Author>
                    </Info>
                  </Starred>
                </WebView>
              )}
            />
          )}
      </Container>
    );
  }
}

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
});

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
