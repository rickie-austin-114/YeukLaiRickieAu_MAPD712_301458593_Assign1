import React, { useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput } from 'react-native';
import CustomSwitch from './CustomSwitch';

export default function App({ navigation }) {
  const [isMetric, setIsMetric] = useState(false);
  const [height, setHeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inch, setInch] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [interval, setInterval] = useState("");


  const onSelectSwitch = index => {
    if (index == 1) {
      setIsMetric(false);
    } else {
      setIsMetric(true);
    }
  };

  const onSubmit = () => {
    if (isMetric) {
      calculateMetric();
    } else {
      calculateStandard();
    }
  }

  const calculateStandard = () => {
    const feetInput = parseFloat(feet);
    const inchInput = parseFloat(inch);
    const weightInput = parseFloat(weight);

    if (isNaN(feetInput) || isNaN(inchInput) || isNaN(weightInput)) {
      alert("invalid input");
    } else {
      const height_in_cm = feetInput * 30.48 + inchInput * 2.54;
      const value = parseFloat(weightInput) / 2.2 * 100 * 100 / (height_in_cm * height_in_cm);
      setBmi(value);
      if (value < 18.5) {
        setInterval("Underweight");
      } else if (value < 25) {
        setInterval("Normal Weight");
      } else if (value < 30) {
        setInterval("Overweight");
      } else {
        setInterval("Obesity");
      }
    }
  }

  const calculateMetric = () => {
    const weightInput = parseFloat(weight);
    const heightInput = parseFloat(height);
    if (isNaN(weightInput) || isNaN(heightInput)) {
      alert("invalid input");
    } else {
      const value = weightInput / (heightInput / 100 * heightInput / 100)
      setBmi(value);
      if (value < 18.5) {
        setInterval("Underweight");
      } else if (value < 25) {
        setInterval("Normal Weight");
      } else if (value < 30) {
        setInterval("Overweight");
      } else {
        setInterval("Obesity");
      }
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        BMI Calculator
      </Text>


      <View style={styles.switch}>
        <CustomSwitch
          selectionMode={1}
          roundCorner={true}
          option1={'Standard'}
          option2={'Metric'}
          onSelectSwitch={onSelectSwitch}
          selectionColor={'brown'}
        />
      </View>

      {
        isMetric ?
          (
            <>
              <Text style={styles.formText}>Height (in cm):</Text>
              <TextInput value={height} keyboardType='numeric' onChangeText={e => setHeight(e)} placeholder='cm' style={styles.inputField} />
              <Text style={styles.formText}>Weight (in kg):</Text>
              <TextInput value={weight} keyboardType='numeric' onChangeText={e => setWeight(e)} placeholder='kg' style={styles.inputField} />
            </>
          )
          :
          (
            <>
              <Text style={styles.formText}>Feet:</Text>
              <TextInput value={feet} keyboardType='numeric' onChangeText={e => setFeet(e)} placeholder='feet' style={styles.inputField} />
              <Text style={styles.formText}>Inch:</Text>
              <TextInput value={inch} keyboardType='numeric' onChangeText={e => setInch(e)} placeholder='inch' style={styles.inputField} />
              <Text style={styles.formText}>Weight (in pound):</Text>
              <TextInput value={weight} keyboardType='numeric' onChangeText={e => setWeight(e)} placeholder='pound' style={styles.inputField} />
            </>
          )
      }



      <Button onPress={onSubmit} title='Submit' color={"brown"} />
      <Text style={styles.result}>
        BMI: {bmi}
      </Text>

      <Text style={styles.result}>
        Category: {interval}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEF3CF"
  },
  title: {
    fontSize: 50,
    margin: 20,
    color: "brown",
    textAlign: 'center'
  },
  result: {
    fontSize: 20,
    color: "grey"
  },
  switch: { 
    alignItems: 'center', 
    margin: 20
  },
  inputField: {
    fontSize: 20,
    textAlign: "center",
    borderColor: "grey",
    backgroundColor: "white",
    width: 300,
    height: 50
  },
  formText: {
    color: "black",
    fontSize: 25
  }
})