import { useQuery } from "@tanstack/react-query";
import axios from "axios";



function FlowersList(){
    
    const getFlowers =  async() => {
        const {data} = await axios.get("http://localhost:8000/flowers");
        return data;
    };
    
    const { data: flowers, error, isLoading } = useQuery({
        queryKey: ["flowers"],
        queryFn: getFlowers,
        staleTime: 5000,
    });
    
    // הדפסת הנתונים לקונסול
    
    if (isLoading) return <p>Loading Data... </p>;
    if (error) return <p>{error.message}</p>;
    

    return (
        <div>
            <h2>Floressa Gallery: Lose Yourself in the Blooms</h2>
            <ul style={{ 
                listStyle: "none", 
                padding: 0, 
                display: "flex", 
                flexWrap: "wrap", 
                gap: "20px", 
                justifyContent: "center" 
            }}>
                {flowers.map((flower) => {
                    const updatedName = flower.name.toLowerCase().replace(/\s+/g, "-");
                    const link = `https://www.thespruce.com/search?q=${updatedName}`;
    
                    return (
                        <li key={flower.id} style={{
                            background: "#fff",
                            borderRadius: "12px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            padding: "16px",
                            maxWidth: "250px",
                            textAlign: "center",
                            transition: "transform 0.2s ease-in-out"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                            <p>Flower ID: {flower.id}</p>
                            <a href={link} target="_blank">
                                <img 
                                    src={flower.image_url} 
                                    alt={flower.name} 
                                    onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"} 
                                    style={{
                                        width: "90%",
                                        height: "180px",
                                        objectFit: "cover",
                                        borderRadius: "8px"
                                    }}
                                />
                            </a>
                            
                            <p style={{ margin: "6px 0", fontSize: "20px", color: "#333" }}>Flower Name: {flower.name}</p>
                            <p style={{ margin: "6px 0", fontSize: "14px", color: "#333" }}>Flower Season: {flower.season}</p>
                            <p style={{ margin: "6px 0", fontSize: "14px", color: "#333" }}>Description: {flower.description}</p>
                            <hr />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
    
    

}

export default FlowersList;