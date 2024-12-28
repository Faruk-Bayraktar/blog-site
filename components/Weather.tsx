"use client";
import React, { useEffect, useState } from "react";

export function WeatherComponent() {
    const [weatherData, setWeatherData] = useState<any>(null); // Hava durumu verisi
    const [error, setError] = useState<string | null>(null);    // Hata mesajı

    const fetchWeather = async (latitude: any, longitude: any) => {
        try {
            const apiKey = "731f833c6f8fd41540eb4abef9bfb903"; // OpenWeatherMap API key 
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
            ); 
            if (!response.ok) {
                throw new Error("API Hatası: Hava durumu alınamadı.");
            }
            const data = await response.json(); 
            setWeatherData(data);
        } catch (err) {
            setError((err as any).message || "Hava durumu alınamadı.");
        }
    };

    const getWeatherIcon = (mainWeather: string) => { // Hava durumu sembolleri
        switch (mainWeather) {
            case "Clear":
                return "☀️"; // Güneş
            case "Clouds":
                return "☁️"; // Bulut
            case "Rain":
                return "🌧️"; // Yağmur
            case "Snow":
                return "❄️"; // Kar
            case "Thunderstorm":
                return "⛈️"; // Fırtına
            case "Drizzle":
                return "🌦️"; // Çiseleme
            case "Mist":
            case "Haze":
            case "Fog":
                return "🌫️"; // Sis
            default:
                return "🌍"; // Genel sembol
        }
    };

    const translateDescription = (description: string) => {
        const translations: { [key: string]: string } = {
            "clear sky": "Açık hava",
            "few clouds": "Az bulutlu",
            "scattered clouds": "Dağınık bulutlu",
            "broken clouds": "Parçalı bulutlu",
            "overcast clouds": "Kapalı hava",
            "light rain": "Hafif yağmur",
            "moderate rain": "Orta şiddetli yağmur",
            "heavy intensity rain": "Şiddetli yağmur",
            snow: "Karlı",
            mist: "Sisli",
        };

        return translations[description] || description; // Türkçe çevirisi yoksa orijinal metni döndür
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    fetchWeather(latitude, longitude);
                },
                (error) => {
                    setError("Konum bilgisi alınamadı.");
                }
            );
        } else {
            setError("Tarayıcı konum desteği sağlamıyor.");
        }
    }, []);

    if (error) {
        return <div className="weather-error">{error}</div>;
    }

    if (!weatherData) {
        return <div className="weather-loading">Hava durumu yükleniyor...</div>;    
    }

    const temperature = Math.round(weatherData.main.temp); // Sıcaklık yuvarlama
    const weatherDescription = translateDescription(
        weatherData.weather[0].description
    ); // Türkçe açıklama
    const weatherIcon = getWeatherIcon(weatherData.weather[0].main); // Hava durumu sembolü

    return (
        <div className="weather-container">
            <div className="weather-location">{weatherData.name}</div>  {/* Hava durumu konumu */}
            <div className="weather-temp"> 
                {temperature}°C {weatherIcon}
            </div>
            <div className="weather-description">{weatherDescription}</div> {/* Hava durumu açıklaması */}
        </div>
    );
}
