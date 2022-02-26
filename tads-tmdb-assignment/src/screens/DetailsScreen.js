import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import tmdb from '../api/tmdb';

const DetailsScreen = ({ navigation, route }) => {
  const [detail, setDetail] = useState({});
  const [typeDetail, setTypeDetail] = useState('');

  async function getDetail(id, type) {
    try {
      if (type == 'movie') {
        const response = await tmdb.get(`/movie/${id}`, {
          params: {
            include_adult: false
          }
        });
        console.log(response.data);
        setDetail(response.data);
      }
      if (type == 'tv') {
        const response = await tmdb.get(`/tv/${id}`, {
          params: {
            include_adult: false
          }
        });
        console.log(response.data);
        setDetail(response.data);
      }
  
      if (type == 'people') {
        const response = await tmdb.get(`/person/${id}`, {
          params: {
            include_adult: false
          }
        });
        console.log(response.data);
        setDetail(response.data);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    getDetail(route.params.id, route.params.type)
    setTypeDetail(route.params.type)
  },[]);

  function buildDetails (type) {
    if (type == 'movie') {
      return <View style={styles.viewDetailsBox}>
          <Image
              style={styles.image}
              source={{
              uri: detail.poster_path != null ? 'http://image.tmdb.org/t/p/w185' + detail.poster_path : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png'
              }}
          />
          <Text>Nome: {detail.title}</Text>
          <Text>Linguagem original: {detail.original_language}</Text>
          <Text>Popularidade: {detail.popularity}</Text>
          <Text>Lançado em: {detail.release_date}</Text>
          <Text>Orçamento: {detail.budget}</Text>
      </View>
    }

    if (type == 'tv') {
      return <View style={styles.viewDetailsBox}>
          <Image
              style={styles.image}
              source={{
              uri: detail.poster_path != null ? 'http://image.tmdb.org/t/p/w185' + detail.poster_path : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png'
              }}
          />
          <Text>Nome: {detail.original_name}</Text>
          <Text>Linguagem original: {detail.original_language}</Text>
          <Text>Popularidade: {detail.popularity}</Text>
          <Text>Primeiro episódio lançou em: {detail.first_air_date}</Text>
          <Text>Episódio mais recente lançou em: {detail.last_air_date}</Text>
      </View>
    }

    if (type == 'people') {
      return <View style={styles.viewDetailsBox}>
          <Image
              style={styles.image}
              source={{
              uri: detail.profile_path != null ? 'http://image.tmdb.org/t/p/w185' + detail.profile_path : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png'
              }}
          />
          <Text>Nome: {detail.name}</Text>
          <Text>Local de nascimento: {detail.place_of_birth != null ? detail.place_of_birth : 'Não informado'}</Text>
          <Text>Biografia: {detail.biography != '' ? detail.biography : 'Não informado'}</Text>
          <Text>Conhecida por: {detail.known_for_department != null ? detail.known_for_department : 'Não informado'}</Text>
          <Text>Popularidade: {detail.popularity}</Text>
          <Text>Website: {detail.homepage != null ? detail.homepage : 'Não informado'}</Text>
      </View>
    }
  }

  return (
    <View>
      {buildDetails(typeDetail)}
    </View>
  )
}

const styles = StyleSheet.create({
    image: { width: 160, height: 160},
    viewDetailsBox: {marginLeft: 20, marginTop: 20, fontSize: 16, textAlign: 'justify'},
});

export default DetailsScreen;
