import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const AnalyticsScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios('http://10.0.2.2:5000/fetch_data')
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  // Extracting labels and data for the chart
  const labels = data.map((item) => {
    // Formatting date to dd-mm format
    const date = new Date(item.date);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });
  const chartData = data.map((item) => item.count);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {data.length > 0 ? (
          <View style={styles.chartContainer}>
          <BarChart
            data={{
              labels: labels,
              datasets: [{ data: chartData }],
            }}
            width={Dimensions.get("window").width}
            height={250}
            yAxisSuffix=" "
            yAxisInterval={1}
            chartConfig={{
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 5) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 10,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
              barPercentage: 1,
              categoryPercentage: 1,
            }}
            style={styles.chart}
            fromZero = 'true'
            withInnerLines = 'false'  
          />
          <Text style={styles.xAxisLabel}>Date</Text>
          <Text style={styles.yAxisLabel}>Count</Text>
          </View>
        ) : (
          <Text>No data available</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartContainer: {
    position: "relative",
  },
  xAxisLabel: {
    position: "absolute",
    bottom: 10,
    left: Dimensions.get("window").width / 2 - 20,
    fontSize: 17,
    fontWeight: 'bold',
  },
  yAxisLabel: {
    position: "absolute",
    left: 1,
    fontSize: 17,
    transform: [{ rotate: "-90deg" }],
    fontWeight: 'bold',
  },
});

export default AnalyticsScreen;
