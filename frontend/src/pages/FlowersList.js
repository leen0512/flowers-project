import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function FlowersList() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const [selectedColor, setSelectedColor] = useState(null); // State to track selected color

    const getFlowers = async () => {
        const { data } = await axios.get("http://localhost:8000/flowers");
        return data;
    };

    const { data: flowers, error, isLoading } = useQuery({
        queryKey: ["flowers"],
        queryFn: getFlowers,
        staleTime: 5000,
    });

    const deleteFlower = useMutation({
        mutationFn: async (flowerId) => {
            await axios.put(`http://localhost:8000/flowers/delete/${flowerId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["flowers"]);
        },
    });

    const handleEditClick = (id) => {
        navigate(`/edit/${id}`);
    };

    const filterFlowers = (colorId) => {
        setSelectedColor(colorId); // Update the selected color
    };

    const filteredFlowers = selectedColor 
        ? flowers.filter(flower => flower.color_ids.includes(selectedColor))
        : flowers; // If no color is selected, show all flowers

    if (isLoading) return <p>Loading Data... </p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div className="flowers-list-container">
            <h1>Floressa Gallery: Lose Yourself in the Blooms</h1>
            <div style={{ display: "flex", justifyContent:"flex-end", width: "100%" }}>
                <img onClick={() => navigate('/bin')} title="🌿 Lost Petals Sanctuary – 🌸 Deleted Flowers Rest Here" src="images/recycle-bin.png" className="recycle-bin" alt="recycle bin icon"></img>
            </div>

            <div style={{justifyContent:"center", display:"flex", gap:"10px"}} className="color-divs">
                <div title='Red' onClick={() => filterFlowers(3)} style={{cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(240, 52, 80, 0.75)'}}></div>
                <div title='Orange' onClick={() => filterFlowers(7)} style={{cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgb(255, 166, 0)'}}></div>
                <div title='Yellow' onClick={() => filterFlowers(4)} style={{cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgb(255, 255, 102)'}}></div>
                <div title='Pink' onClick={() => filterFlowers(1)} style={{cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgb(255, 182, 193)'}}></div>
                <div title='Purple' onClick={() => filterFlowers(5)} style={{cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgb(216, 191, 216)'}}></div>
                <div title='Blue' onClick={() => filterFlowers(2)} style={{cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgb(173, 216, 230)'}}></div>
                <div title='Green' onClick={() => filterFlowers(8)} style={{cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgb(144, 238, 144)'}}></div>
                <div title='Brown' onClick={() => filterFlowers(9)} style={{cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgb(205, 133, 63)'}}></div>
                <div title='White' onClick={() => filterFlowers(6)} style={{cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgb(255, 255, 255)'}}></div>
                <div title='Black' onClick={() => filterFlowers(10)} style={{cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgb(0, 0, 0)'}}></div>
                <div title='Multicolor' onClick={() => filterFlowers(11)} style={{cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', backgroundImage: 'url(/images/multicolor.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                <div title='Other' onClick={() => filterFlowers(12)} style={{cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgb(255, 239, 204)'}}></div>
            </div>


            <ul className="flower-list">
                {filteredFlowers.map((flower) => {
                    const updatedName = flower.name.toLowerCase().replace(/\s+/g, "-");
                    const link = `https://www.thespruce.com/search?q=${updatedName}`;

                    return (
                        <li key={flower.id} className="flower-card">
                            <a href={link} target="_blank" rel="noopener noreferrer" className="flower-link">
                                <div className="flower-container">
                                    <div className="flower-image">
                                        <img
                                            src={flower.image_url}
                                            alt={flower.name}
                                            onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}
                                            className="flower-image"
                                        />
                                    </div>
                                    <div className="flower-info">
                                        <p className="info">
                                            In a world of colors and scents, a flower with the unique ID <strong>{flower.id}</strong> blossoms. 
                                            Known as <strong>{flower.name}</strong>, it thrives during the <strong>{flower.season}</strong>, bringing beauty to its surroundings. 
                                            {flower.description ? flower.description : " Its presence enchants those who come across it, making it a true gem of nature."}
                                        </p>
                                    </div>
                                </div>
                            </a>
                           <div style={{display:"flex"}}>
                               <button onClick={() => handleEditClick(flower.id)} className="buttons">Edit</button>
                               <button onClick={() => deleteFlower.mutate(flower.id)} className="buttons">Delete</button>
                           </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default FlowersList;
