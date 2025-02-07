'use client'
import type { NextPage } from 'next';
import GameList from "@/app/components/GameList";

const Home: NextPage = () => {
  return (
      <div className="container mx-auto p-4">
          <GameList/>
      </div>
  );
};

export default Home;
