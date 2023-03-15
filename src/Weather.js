/*5c6a4b6958e5e76c1b7068398985b023*/

import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { FaCloud, FaSun, FaMoon } from 'react-icons/fa';
import {
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from 'react-icons/wi';

import styles from './Weather.module.css';
import zipcodes from 'zipcodes';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [precipitation, setPrecipitation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const zipCode = event.target.zipCode.value;

    // Check if zip code is valid
    if (!zipcodes.lookup(zipCode)) {
      setError('Please enter a valid zip code');
      setIsLoading(false);
      return;
    }

    



    const apiKey = process.env.REACT_APP_WEATHER_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=imperial`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setLocation(response.data.name);
      setPrecipitation(response.data.weather[0].description);
      setIsLoading(false);
      setError('');
    } catch (error) {
      setError('Unable to get weather data. Please try again later.');
      setIsLoading(false);
    }
  };

  const getEmoji = () => {
    if (weatherData && weatherData.weather) {
      const weatherCondition = weatherData.weather[0].main;
      const weatherId = weatherData.weather[0].id;
      const isDayTime = weatherData.dt < weatherData.sys.sunset;
      const isThunderstorm = weatherId >= 200 && weatherId < 300;
      const isDrizzle = weatherId >= 300 && weatherId < 400;
      const isRain = weatherId >= 500 && weatherId < 600;
      const isSnow = weatherId >= 600 && weatherId < 700;
      const isMist = weatherId >= 700 && weatherId < 800;
      const isClear = weatherId === 800;
      const isClouds = weatherId >= 801 && weatherId < 900;
  
      if (isThunderstorm) {
        return (
          <>
            <WiThunderstorm /> Thunderstorm
          </>
        );
      } else if (isDrizzle || isRain) {
        return (
          <>
            <WiRain /> It's raining, stay at home. 
          </>
        );
      } else if (isSnow) {
        return (
          <>
            <WiSnow /> It's snowing, stay at home. 
          </>
        );
      } else if (isMist) {
        return (
          <>
            <WiFog /> Misty day, be careful outside. 
          </>
        );
      } else if (isClear) {
        return (
          <>
            {isDayTime ? <FaSun /> : <FaMoon />} Clear skies, definitely go outside!
          </>
        );
      } else if (isClouds) {
        return (
          <>
            <FaCloud /> Cloudy skies, keep a close eye on the weather.
          </>
        );
      } else {
        return <div>No weather information available</div>;
      }
    }
    return null;
  };
  

  return (
    <div className={styles.container}>
      <Form onSubmit={handleClick}>
        <Form.Group controlId="zipCode">
          <label htmlFor="zipCodeInput" className={`${styles.zipCodeLabel} ${styles.label}`}>Enter your zip code:</label>
          <Form.Control className={styles.zipCodeInput} type="text" placeholder="Zip code" required />
          {error && <div className={styles.error}>{error}</div>}
        </Form.Group>
        <Button className={styles.submitButton} variant="primary" type="submit">
          {isLoading ? 'Loading...' : 'Should I go out today'}
        </Button>
      </Form>
      {weatherData && (
        <div className={styles.weatherInfo}>
          <div className={styles.location}>{location}</div>
          <div className={styles.temperature}>{Math.round(weatherData.main.temp)}°F</div>
          <div className={styles.emojiContainer}>{getEmoji()}</div>
        </div>
      )}
    </div>
  );
}

export default Weather;
