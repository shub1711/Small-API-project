import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Modal, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { EvilIcons } from "@expo/vector-icons";
import axios from "axios";
export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [display, setDisplay] = useState(false);
  const [affirmation, setAffirmation] = useState(null);
  const fetchAffirmation = async () => {
    if (isLoading) return; 
    setIsLoading(true);
    axios
      .get(`https://www.affirmations.dev/`)
      .then((response) => {
        if (response) {
          // console.warn(response);
          setAffirmation(response.data.affirmation);
          setIsLoading(false);
          setFetch(false);
        }
      })
      .catch(console.error);
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.heading}>Introduction</Text>
        <Text style={styles.para}>
          Affirmation are positive statement that can to help you that challenge
          and overcome sef-sabotaging and negative thoughts. You can use this
          overly-convoluted tool to fetch an affirmation for joy and positive
          change.
        </Text>
        <View style={styles.step}>
          <Text style={styles.heading}>Step 1: Fetch</Text>
          <Text style={styles.para}>
            Click the button below to make a request to a remote API and fetch
            an affirmation
          </Text>
          <Modal
            animationType="slide"
            transparent={true}
            visible={fetch}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setFetch(!fetch);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.crossIcon}>
                  <EvilIcons
                    onPress={() => setFetch(!fetch)}
                    name="close"
                    size={24}
                    color="black"
                  />
                </View>
                <Text style={styles.fetchHeading}>FETCH?</Text>
                <Text style={styles.modalText}>
                  Are you sure you want to fetch an affirmation?
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Button
                    style={[styles.insidePopButton, styles.buttonClose]}
                    onPress={() => setFetch(!fetch)}
                    title="No"
                  />
                  <Button
                    style={[styles.insidePopButton, styles.buttonGap]}
                    title={isLoading ? "loading..." : "Yes"}
                    onPress={() => fetchAffirmation()}
                  />
                </View>
              </View>
            </View>
          </Modal>
          <Button
            onPress={() => setFetch(true)}
            style={styles.callButton}
            title="FETCH"
          />
        </View>
        <View style={styles.step}>
          <Text style={styles.heading}>Step 2: Display</Text>
          <Text style={styles.para}>
            Click the button below to display the most recently fetched
            affirmation.
          </Text>
          <Modal
            animationType="slide"
            transparent={true}
            visible={display}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setFetch(!display);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.crossIcon}>
                  <EvilIcons
                    onPress={() => setDisplay(!display)}
                    name="close"
                    size={24}
                    color="black"
                  />
                </View>
                <Text style={styles.fetchHeading}>Affirmation:</Text>
                <Text style={styles.modalText}>{affirmation}</Text>
              </View>
            </View>
          </Modal>
          <Button
            onPress={() => setDisplay(true)}
            style={styles.callButton}
            title="DISPLAY"
            disabled={affirmation === null}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    padding: 30,
    marginTop: 70,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
  },
  para: {
    marginTop: 10,
    letterSpacing: 0.2,
    color: "#5e5e5e",
    width: 340,
    fontWeight: "500",
  },
  step: {
    marginTop: 30,
  },
  callButton: {
    marginTop: 10,
    width: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "yellow",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 28,
    width: 250,
  },
  fetchHeading: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 28,
    width: 250,
    textDecorationLine: "underline",
  },
  insidePopButton: {
    marginTop: 10,
    width: 100,
  },
  buttonGap: {
    marginLeft: 20,
  },
  crossIcon: {
    marginLeft: 220,
  },
});
