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
        <ul>
            {flowers.map((flower) => {
                const updatedName = flower.name.toLowerCase().replace(/\s+/g, "-"); // מחליף רווחים במקף
                const link = `https://www.thespruce.com/search?q=${updatedName}`;

                return (
                    <li key={flower.id}>
                        <p>Flower ID: {flower.id}</p>
                        <a href={link} target="_blank">
                            <img src={flower.image_url} alt={flower.name} />
                        </a>
                        <p >{flower.name}</p>
                        <p >{flower.season}</p>
                        <p >{flower.description}</p>
                    </li>
                );
            })}
        </ul>
        </div>
    );
    

}

export default FlowersList;