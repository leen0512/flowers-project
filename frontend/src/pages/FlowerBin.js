import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function FlowersBin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const getDeletedFlowers = async () => {
        const { data } = await axios.get("http://localhost:8000/flowers/bin");
        return data;
    };
    
    const { data: deletedFlowers, error, isLoading } = useQuery({
        queryKey: ["deletedFlowers"],
        queryFn: getDeletedFlowers,
        staleTime: 5000,
        refetchOnMount: "always"
    });
    
    const restoreFlower = useMutation({
        mutationFn: async (flowerId) => {
            // Fixed endpoint path to match backend route
            await axios.put(`http://localhost:8000/flowers/restore/${flowerId}`);
        },
        onSuccess: () => {
            // Invalidate both deleted flowers and regular flowers queries
            queryClient.invalidateQueries(["deletedFlowers"]);
            queryClient.invalidateQueries(["flowers"]);
        },
    });
    
    if (isLoading) return <p>Loading Data... </p>;
    if (error) return <p>{error.message}</p>;
    
    return (
        <div className="flowers-bin-container">
            <h1>🌿 Lost Petals Sanctuary – 🌸 Deleted Flowers Rest Here</h1>
            <ul className="flower-list">
                {deletedFlowers && deletedFlowers.length === 0 ? (
                    <p>No deleted flowers found.</p>
                ) : (
                    deletedFlowers && deletedFlowers.map((flower) => {
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
                                                This flower, <strong>{flower.name}</strong>, was once part of our collection.
                                                It thrives during the <strong>{flower.season}</strong> season.
                                                {flower.description ? flower.description : " It once enchanted those who saw it."}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                                <div style={{ display: "flex" }}>
                                    <button
                                        onClick={() => restoreFlower.mutate(flower.id)}
                                        className="restore-button">
                                        Restore
                                    </button>
                                </div>
                            </li>
                        );
                    })
                )}
            </ul>
        </div>
    );
}

export default FlowersBin;