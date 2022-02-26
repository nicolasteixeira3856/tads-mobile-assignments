import React, { useState, useEffect } from 'react';
import { TouchableOpacity, FlatList, View, Text, StyleSheet, Image, Button, Pressable } from 'react-native';
import SearchBar from '../components/SearchBar';
import tmdb from '../api/tmdb';

const HomeScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);
  const [isMovie, setIsMovie] = useState(false);
  const [isTv, setIsTv] = useState(false);
  const [isPeople, setIsPeople] = useState(false);

  async function searchTmdb(query) {
    try {
      const response = await tmdb.get('/search/movie', {
        params: {
          query,
          include_adult: false
        }
      });
      setResults(response.data.results);
      setIsMovie(true);
      setIsTv(false);
      setIsPeople(false);
    }
    catch (err) {
      console.log(err);
    }
  }

  async function searchTmdbTv(query) {
    try {
      const response = await tmdb.get('/search/tv', {
        params: {
          query,
          include_adult: false
        }
      });
      setResults(response.data.results);
      setIsMovie(false);
      setIsTv(true);
      setIsPeople(false);
    }
    catch (err) {
      console.log(err);
    }
  }

  async function searchTmdbPeople(query) {
    try {
      const response = await tmdb.get('/search/person', {
        params: {
          query,
          include_adult: false
        }
      });
      setResults(response.data.results);
      setIsMovie(false);
      setIsTv(false);
      setIsPeople(true);
    }
    catch (err) {
      console.log(err);
    }
  }

    function displayInformation() {
        if (isMovie) {
            return <FlatList
            data={results}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.viewDisplayInformationBox}>
                  <TouchableOpacity 
                    onPress={() => navigation.navigate("Details",{
                      id: item.id,
                      type: 'movie'
                    })}
                  >
                    <Image
                        style={styles.image}
                        source={{
                        uri: item.poster_path != null ? 'http://image.tmdb.org/t/p/w185' + item.poster_path : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png'
                        }}
                    />
                    <Text style={styles.text}>{item.original_title}</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
          />
        } 
        if (isTv) {
            return <FlatList
            data={results}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.viewDisplayInformationBox}>
                  <TouchableOpacity 
                    onPress={() => navigation.navigate("Details",{
                      id: item.id,
                      type: 'tv'
                    })}
                  >
                    <Image
                        style={styles.image}
                        source={{
                        uri: item.poster_path != null ? 'http://image.tmdb.org/t/p/w185' + item.poster_path : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png'
                        }}
                    />
                    <Text style={styles.text}>{item.original_name}</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
          />
        }
        if (isPeople) {
            return <FlatList
            data={results}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.viewDisplayInformationBox}>
                  <TouchableOpacity 
                    onPress={() => navigation.navigate("Details",{
                      id: item.id,
                      type: 'people'
                    })}
                  >
                    <Image
                        style={styles.image}
                        source={{
                        uri: item.profile_path != null ? 'http://image.tmdb.org/t/p/w185' + item.profile_path : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png'
                        }}
                    />
                    <Text style={styles.text}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
          />
        }

        return <View style={styles.viewDisplayInformationBox}>
            <Text>Pesquise algo para começar.</Text>
        </View>
    }

  return (
    <>
      <SearchBar
        value={text}
        onTextChange={(t) => setText(t)}
        onTextSubmit={(t) => searchTmdb(t)}
      />
    <View style={styles.viewButtonBox}>
        <Pressable style={isMovie ? styles.buttonClicked : styles.button} onPress={() => searchTmdb(text)}><Text style={styles.textButton}>Movies</Text></Pressable>
        <Pressable style={isTv ? styles.buttonClicked : styles.button} onPress={() => searchTmdbTv(text)}><Text style={styles.textButton}>Tv</Text></Pressable>
        <Pressable style={isPeople ? styles.buttonClicked : styles.button} onPress={() => searchTmdbPeople(text)}><Text style={styles.textButton}>People</Text></Pressable>
    </View>
        
    <View>
        {displayInformation()}
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    image: { width: 80, height: 80, marginLeft: 5, marginRight: 20 },
    text: { fontSize: 20, fontWeight: 'bold' },
    viewDisplayInformationBox: {marginBottom: 10, marginTop: 20, marginLeft: 10},
    viewButtonBox: {flexDirection: 'row', justifyContent: 'space-around'},
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    buttonClicked: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'orange',
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default HomeScreen;
