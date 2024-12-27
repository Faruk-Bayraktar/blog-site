"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Button } from './ui/button';
import { Lock, Search } from "lucide-react";
import { Facebook, Instagram, Twitter, Linkedin, Github } from './icons';
import { WeatherComponent } from "./Weather";
import Loading from "./Loading";
import Image from "next/image";
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number } | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // const usdResponse = await fetch("https://v6.exchangerate-api.com/v6/76c6f01d23b20ebccadeb8dd/latest/USD");
        // const usdData = await usdResponse.json();
        // const usdTry = usdData.conversion_rates.TRY;

        // const eurResponse = await fetch("https://v6.exchangerate-api.com/v6/76c6f01d23b20ebccadeb8dd/latest/EUR");
        // const eurData = await eurResponse.json();
        // const eurTry = eurData.conversion_rates.TRY;

        // const gbpResponse = await fetch("https://v6.exchangerate-api.com/v6/76c6f01d23b20ebccadeb8dd/latest/GBP");
        // const gbpData = await gbpResponse.json();
        // const gbpTry = gbpData.conversion_rates.TRY;

        // const jpyResponse = await fetch("https://v6.exchangerate-api.com/v6/76c6f01d23b20ebccadeb8dd/latest/JPY");
        // const jpyData = await jpyResponse.json();
        // const jpyTry = jpyData.conversion_rates.TRY;

        // const cnyResponse = await fetch("https://v6.exchangerate-api.com/v6/76c6f01d23b20ebccadeb8dd/latest/CNY");
        // const cnyData = await cnyResponse.json();
        // const cnyTry = cnyData.conversion_rates.TRY;

        // const rubResponse = await fetch("https://v6.exchangerate-api.com/v6/76c6f01d23b20ebccadeb8dd/latest/RUB");
        // const rubData = await rubResponse.json();
        // const rubTry = rubData.conversion_rates.TRY;

        const usdTry = 10.0;
        const eurTry = 12.0;
        const gbpTry = 14.0;
        const jpyTry = 0.1;
        const cnyTry = 1.5;
        const rubTry = 0.12;
        setExchangeRates({
          USD: usdTry,
          EUR: eurTry,
          GBP: gbpTry,
          JPY: jpyTry,
          CNY: cnyTry,
          RUB: rubTry,
        });
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchRates();
  }, []);

  if (!exchangeRates) return <Loading />;//bu kod hepsine oluyor. sadece alttaki header loading olsun

  const links = [
    { href: '/posts/sondakika', label: 'Son Dakika' },
    { href: '/posts/egitim', label: 'Eğitim' },
    { href: '/posts/ekonomi', label: 'Ekonomi' },
    { href: '/posts/dunya', label: 'Dünya' },
    { href: '/posts/spor', label: 'Spor' },
    { href: '/posts/teknoloji', label: 'Teknoloji' },
    { href: '/posts/saglik', label: 'Sağlık' },
    { href: '/posts/otomobil', label: 'Otomobil' },
  ];



  const currencies = [
    { label: "USD", value: exchangeRates.USD, change: (Math.random() * 2 - 1).toFixed(2) },
    { label: "EUR", value: exchangeRates.EUR, change: (Math.random() * 2 - 1).toFixed(2) },
    { label: "GBP", value: exchangeRates.GBP, change: (Math.random() * 2 - 1).toFixed(2) },
    { label: "JPY", value: exchangeRates.JPY, change: (Math.random() * 2 - 1).toFixed(2) },
    { label: "CNY", value: exchangeRates.CNY, change: (Math.random() * 2 - 1).toFixed(2) },
    { label: "RUB", value: exchangeRates.RUB, change: (Math.random() * 2 - 1).toFixed(2) },
  ];

  return (
    <>
      <header className="px-2 py-3 sm:px-4 w-full z-20 border-b border-gray-200">
        <div className="container flex items-center justify-between mx-auto">
          <div className="flex items-center">
            <a href="/">
              <Image
                src="/logo1.jpg"
                alt="TFT News Logo"
                width={120}
                height={100}
                className="self-center"
              />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex flex-row flex-wrap gap-4">
              {links.slice(0, 4).map((link) => (
                <Button key={link.href}>
                  <a href={link.href} >
                    {link.label}
                  </a>
                </Button>
              ))}
            </nav>
            <nav className="relative">
              <Button onClick={() => setMenuOpen(!menuOpen)}>Menü</Button>
              {menuOpen && (
                <ul className="absolute bg-white shadow-md z-50 mt-2 left-0">
                  {links.slice(4).map((link) => (

                    <Button key={link.href}>
                      <a href={link.href} className="block">
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </ul>
              )}
            </nav>
          </div>
          {/* <WeatherComponent /> */}
        </div>
      </header>
      <header className="py-3 sm:px-4 w-3/5 mx-auto z-20 border-b border-gray-200">
        <div className="flex justify-center">
          {currencies.map((currency, index) => (
            <React.Fragment key={currency.label}>
              {index > 0 && (
                <div className="border-l border-gray-400 h-6 mx-2"></div>
              )}
              <div className="text-sm">
                <span className="font-bold text-black">{currency.label}: </span>
                <span className="font-bold text-black">
                  {currency.value.toFixed(2)}
                </span>
                <span
                  className={`ml-1 ${parseFloat(currency.change) >= 0
                    ? "text-green-400"
                    : "text-red-400"
                    }`}>
                  ({currency.change}%)
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </header>
    </>
  );
}