import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function FlowersList() {
    const queryClient = useQueryClient();  // Initialize queryClient here
    
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

    if (isLoading) return <p>Loading Data... </p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div className="flowers-list-container">
            <h2 className="gallery-title">Floressa Gallery: Lose Yourself in the Blooms</h2>
            <ul className="flower-list">
                {flowers.map((flower) => {
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
                            <button
                                onClick={() => deleteFlower.mutate(flower.id)}
                                className="edit-button">
                                Delete
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default FlowersList;
