import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getFlowers = async () => {
  const { data } = await axios.get("http://localhost:8000/flowers");
  return data;
};

export default function FloressaHome() {
  const { data: flowers, error, isLoading } = useQuery({
    queryKey: ["flowers"],
    queryFn: getFlowers,
    staleTime: 5000,
  });

  const [flowerOfTheDay, setFlowerOfTheDay] = useState(null);

  useEffect(() => {
    if (flowers && flowers.length > 0) {
      const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
      setFlowerOfTheDay(randomFlower);
    }
  }, [flowers]);

  return (
    <div>
      <h1>Welcome to Floressa</h1>
      <p style={{fontSize:"20px",   color: "#927269"}}>
      𖤣.𖥧.𖡼.⚘
      <br/>
      Welcome to Floressa, a digital haven for flower enthusiasts
      <br/>
      Immerse yourself in a world where every bloom tells a story, and every petal holds a secret.
      <br/>
      Floressa allows you to explore a curated gallery of flowers, each beautifully detailed with its name, season, and unique characteristics.
      <br/>
      Discover the Flower of the Day, expand your floral knowledge, and contribute to the ever-growing collection.
      <br/>
      Whether you're a passionate botanist or simply someone who appreciates nature’s beauty, Floressa invites you to embark on a journey through a floral wonderland like no other.
      </p>

      {isLoading && <p>Loading flowers...</p>}
      {error && <p>Error: {error.message}</p>}

      {flowerOfTheDay && !isLoading && !error && (
        <div>
          <h2>❁ Flower of the Day: {flowerOfTheDay.name}</h2>
          <img
            src={flowerOfTheDay.image_url}
            alt={flowerOfTheDay.name}
            onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}
            style={{ width: "140px", height: "100px" }}
          />
          <p>{flowerOfTheDay.description}</p>
        </div>
      )}
    </div>
  );
}
