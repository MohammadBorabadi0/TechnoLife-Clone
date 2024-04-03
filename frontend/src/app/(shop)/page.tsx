"use client";
import HomePage from "@/screens/HomePage/HomePage";
import React, { useEffect, useState } from "react";
import Loading from "./loading";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return <HomePage />;
};

export default Home;
