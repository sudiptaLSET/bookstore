import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

const HEADER_HEIGHT = 500;

const Header = () => (
  <View style={styles.header}>
    <Image
      style={styles.image}
      source={{
        uri: "https://picsum.photos/400/300",
      }}
      resizeMode="cover"
    />
    <Text style={styles.headerText}>📚 Collapsible Header Example</Text>
  </View>
);

const TabContent = ({ label }) => (
  <Tabs.ScrollView>
    {Array.from({ length: 20 }).map((_, i) => (
      <View key={i} style={styles.item}>
        <Text>
          {label} Item {i + 1}
        </Text>
      </View>
    ))}
  </Tabs.ScrollView>
);

export default function CollapsibleHeader() {
  return (
    <Tabs.Container
      renderHeader={Header}
      headerHeight={HEADER_HEIGHT}
      allowHeaderOverscroll={false}
    >
      <Tabs.Tab name="Tab 1">
        <TabContent label="Tab 1" />
      </Tabs.Tab>
      <Tabs.Tab name="Tab 2">
        <TabContent label="Tab 2" />
      </Tabs.Tab>
      <Tabs.Tab name="Tab 3">
        <TabContent label="Tab 3" />
      </Tabs.Tab>
    </Tabs.Container>
  );
}

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A0C878",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
