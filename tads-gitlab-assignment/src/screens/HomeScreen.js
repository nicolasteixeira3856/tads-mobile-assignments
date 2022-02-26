import React, { useContext, useEffect, useState } from "react";
import { Text, Button, Card, Image } from "react-native-elements";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import gitlab from "../api/api";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  const [projectsList, setProjectsList] = useState();

  useEffect(() => {
    async function projects() {
      const response = await gitlab.get("/projects", {
        params: {
          owned: true,
          simple: true,
        },
      });
      console.log(response.data);
      setProjectsList(response.data);
    }
    projects();
  }, []);

  return (
    <>
      {projectsList ? (
        <FlatList
          data={projectsList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Details", {
                    id: item.id,
                  })
                }
              >
                <Card>
                  <Text style={styles.projectTitle}>{item.name}</Text>
                  <View style={styles.containerItems}>
                    <Image
                      source={{
                        uri: "https://gitlab.com/" + item.namespace.avatar_url,
                      }}
                      style={{ width: 20, height: 20, marginRight: 5 }}
                      PlaceholderContent={<ActivityIndicator />}
                    />
                    <Text>{item.namespace.full_path}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />
      )}
      <Button
        title="Deslogar"
        onPress={() => {
          signOut();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  projectTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  containerItems: {
    flexDirection: "row",
  }
});

export default HomeScreen;
