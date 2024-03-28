import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {BarChart} from 'react-native-chart-kit';

const AnalyticsScreen = () => {
  const [count, setCount] = useState([
    { label: new Date(2024, 2, 20).toLocaleDateString(), value: 15 },
    { label: new Date(2024, 2, 21).toLocaleDateString(), value: 20 },
    { label: new Date(2024, 2, 22).toLocaleDateString(), value: 25 },
    { label: new Date(2024, 2, 23).toLocaleDateString(), value: 25 },
    { label: new Date(2024, 2, 24).toLocaleDateString(), value: 20 },
    { label: new Date(2024, 2, 25).toLocaleDateString(), value: 25 },
    { label: new Date(2024, 2, 26).toLocaleDateString(), value: 25 },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* <BarChart 
          data={count}
          barWidth={30}
          noOfSections={5}
          barBorderRadius={6}
          frontColor="#FF9800"
          yAxisThickness={5}
          xAxisThickness={5}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default AnalyticsScreen;