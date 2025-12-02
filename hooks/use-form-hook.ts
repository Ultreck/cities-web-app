"use client";

import clientApi from "@/apis/clientApi";
import { useEffect, useState } from "react";

export type CountryProps = {
  countryCode: string;
  currency: string;
  flag: string;
  name: string;
  phonecode: string;
};

export type StateProps = {
  name: string;
  stateCode: string;
  countryCode: string;
};

export type CityProps = {
  name: string;
  isoCode: string;
  countryCode: string;
  latitude: string;
  longitude: string;
};

type UseFormHookProps = {
  cc?: string;
  sc?: string;
};

const useFormHook = ({ cc = "NG", sc }: UseFormHookProps = {}) => {
  const [countries, setCountries] = useState<CountryProps[]>([]);
  const [ngCountry, setNgCountry] = useState<CountryProps | null>(null);
  const [states, setStates] = useState<StateProps[]>([]);
  const [cities, setCities] = useState<CityProps[]>([]);
  const [otpEmail, setOtpEmail] = useState<string | null | undefined>(undefined);
  const [otpPhoneNumber, setOtpPhoneNumber] = useState<string | null | undefined>(undefined);
  const [countryCode, setCountryCode] = useState<string | null | undefined>(undefined);


  
  useEffect(() => {
    const storedEmail = window.localStorage.getItem("userEmail");
    const storedPhoneNumber = window.localStorage.getItem("userPhoneNumber");
    const storedCountryCode = window.localStorage.getItem("userCountryCode");
    setOtpPhoneNumber(storedPhoneNumber);
    setOtpEmail(storedEmail);
    setCountryCode(storedCountryCode);
  }, []);

  // Fetch all countries
  useEffect(() => {
    clientApi
      .get("/user/states_and_coutries/countries")
      .then((res) => {
        setCountries(res.data.countries);
        const ng = res.data.countries.find(
          (item: CountryProps) => item.name === "Nigeria"
        );
        setNgCountry(ng || null);
      })
      .catch((err) => console.error("Countries fetch error:", err.message));
  }, []);

  // Fetch states when countryCode changes
  useEffect(() => {
    if (!cc) return;
    clientApi
      .get(`/user/states_and_coutries/states?countryCode=${cc}`)
      .then((res) => {
        setStates(res.data.states || []);
      })
      .catch((err) => console.error("States fetch error:", err.message));
  }, [cc]);

  // Fetch cities when stateCode changes
  useEffect(() => {
    handleGetCities(sc);
  }, [cc, sc]);

  const handleGetCities = (code?: string) => {
    console.log(
      "you are inside the function that handling the get cities",
      code
    );

    if (!code) return;
    clientApi
      .get(`/user/states_and_coutries/cities?countryCode=${cc}&stateCode=${sc}`)
      .then((res) => {
        setCities(res.data.cities || []);
      })
      .catch((err) => console.error("Cities fetch error:", err.message));
  };

  return {
    countries,
    ngCountry,
    states,
    cities,
    handleGetCities,
    otpEmail,
    otpPhoneNumber,
    countryCode,
  };
};

export default useFormHook;
