import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { View, Text, StyleSheet } from 'react-native';

const InfiniteDateComponent = () => {
  const [dates, setDates] = useState<moment.Moment[]>([]);

  useEffect(() => {

    const interval = setInterval(() => {
        setDates(prevDates => {
            const nextDate = moment(prevDates[prevDates.length - 1]).add(1, 'days');
            return [...prevDates, nextDate];
          });
        }, 1000 * 60 * 60 * 24);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      {dates.map((date, index) => (
        <View key={index} style={styles.dateBlock}>
          <Text style={styles.dateText}>{date.format('dddd, MMMM D, YYYY')}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  dateBlock: {
    width: '50%',
    padding: 10,
  },
  dateText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default InfiniteDateComponent;
