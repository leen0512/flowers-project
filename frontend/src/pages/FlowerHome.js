import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getFlowers = async () => {
  const { data } = await axios.get("http://localhost:8000/flowers");
  return data;
};

function FlowerHome() {
  const { data: flowers, error, isLoading } = useQuery({
    queryKey: ["flowers"],
    queryFn: getFlowers,
    staleTime: 5000,
  });

  const [flowerOfTheDay, setFlowerOfTheDay] = useState(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (flowers && flowers.length > 0) {
      const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
      setFlowerOfTheDay(randomFlower);
    }
  }, [flowers]);

  return (
    <div>
      <h1>Welcome to Floressa</h1>
      <p style={{ fontSize: "20px", color: "#927269" }}>
        𖤣.𖥧.𖡼.⚘
        <br />
        Welcome to Floressa, a digital haven for flower enthusiasts
        <br />
        Immerse yourself in a world where every bloom tells a story, and every petal holds a secret.
        <br />
        Floressa allows you to explore a curated gallery of flowers, each beautifully detailed with its name, season, and unique characteristics.
        <br />
        Discover the Flower of the Day, expand your floral knowledge, and contribute to the ever-growing collection.
        <br />
        Whether you're a passionate botanist or simply someone who appreciates nature’s beauty, Floressa invites you to embark on a journey through a floral wonderland like no other.
      </p>

      {isLoading && <p>Loading flowers...</p>}
      {error && <p>Error: {error.message}</p>}

      {flowerOfTheDay && !isLoading && !error && (
      <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#6a4c93", fontSize: "24px", marginBottom: "10px" }}>
        ❁Secret Garden Surprise: {flowerOfTheDay.name}
      </h2>
      <img
        src={flowerOfTheDay.image_url}
        alt={flowerOfTheDay.name}
        onError={(e) => (e.target.src = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg")}
        style={{ width: "140px", height: "100px", borderRadius: "8px", marginBottom: "15px" }}
      />
      <p style={{ fontSize: "16px", color: "#333", marginBottom: "20px" }}>{flowerOfTheDay.description}</p>
      <p style={{ fontSize: "18px", color: "#333", marginBottom: "20px" }}>
        ✨ Would you plant this beauty in your dream garden? Share your thoughts! 🌱💬
      </p>
      <button
        onClick={() => setResponse(`Yay! This flower would be a beautiful addition to your dream garden! 🌸 You can also visit the gallery and click on the photo of this flower to learn how to take care of it!`)}
        style={{
          backgroundColor: "#6a4c93",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          marginRight: "10px",
          transition: "background-color 0.3s ease",
        }}
      >
        Yes
      </button>
      <button
        onClick={() => setResponse("No worries! Each time you refresh, a new flower will bloom in the Secret Garden. 🌿 Come back to discover your perfect match!")}
        style={{
          backgroundColor: "#88b04b",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        No, not my style 🌿
      </button>
      {response && <p style={{ fontSize: "18px", color: "#6a4c93", marginTop: "20px" }}>{response}</p>}
    </div>
    
      )}
    </div>
  );
}

export default FlowerHome;
