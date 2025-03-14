import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { object, string, array } from "yup";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const FlowerForm = () => {
    const { id } = useParams();

    const mockColors = [
        { id: 1, name: "pink" }, { id: 2, name: "blue" }, { id: 3, name: "red" },
        { id: 4, name: "yellow" }, { id: 5, name: "purple" }, { id: 6, name: "white" },
        { id: 7, name: "orange" }, { id: 8, name: "green" },
        { id: 9, name: "brown" }, { id: 10, name: "black" }, { id: 11, name: "multicolor" }, { id: 12, name: "other" }
    ];

    const queryClient = useQueryClient(); // Ensure we have access to QueryClient

    // Function to post a new flower or update an existing one
    const sendFlower = async (flowerData) => {
        const res = await axios.post("http://localhost:8000/flowers", flowerData);
        return res.data;
    
};


    const fetchFlower = async (flowerId) => {
        const res = await axios.get(`http://localhost:8000/flowers/${flowerId}`);
        return res.data;
    };

    const { data: flowerData } = useQuery({
        queryKey: ["flower", id],
        queryFn: () => fetchFlower(id),
    });
    

    const mutation = useMutation({
        mutationFn: sendFlower,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["flowers"] }); // Invalidate flower list
        },
        onError: (error) => {
            console.error("Mutation error:", error);
        }
    });

    // Function to fetch Wikipedia data for flower description and image
    const fetchData = async (flowerName) => {
        try {
            const formattedName = flowerName.trim().replace(/\s+/g, "_");
            const response = await axios.get(
                `https://en.wikipedia.org/api/rest_v1/page/summary/${formattedName}`
            );
            return {
                description: response.data.extract || "No description available.",
                image_url: response.data.thumbnail?.source || "https://via.placeholder.com/150"
            };
        } catch (error) {
            console.error("Error fetching flower data:", error);
            return { description: "Error fetching data.", image_url: "" };
        }
    };

    // Form handling with Formik
    const flowerForm = useFormik({
        initialValues: flowerData ? {
            name: flowerData.name,
            season: flowerData.season,
            color_ids: flowerData.color_ids,
            image_url: flowerData.image_url,
            description: flowerData.description
        } : {
            name: "",
            season: "",
            color_ids: [],
            image_url: "",
            description: ""
        },
        validationSchema: object({
            name: string()
                .trim()
                .strict()
                .min(3, "That's not a name, that's a lost petal! (╯︵╰,)❀")
                .required("Your flower deserves an identity, not just a mystery! (˘͈ᵕ ˘͈❀)"),
            season: string()
                .required("Every flower needs its moment, don't leave yours wondering when to bloom! ( ｡•́︿•̀｡ )❃"),
            color_ids: array()
                .min(1, "No colors? Your flower feels unseen! Let yours stand out with a splash of color ʕಥᴥಥʔ"),
        }),
        onSubmit: async (form) => {
            console.log("Submitting form", form);
            if (form.name) {
                const { description, image_url } = await fetchData(form.name);
                flowerForm.setValues({ ...form, description, image_url });
        
                mutation.mutate({ ...form, description, image_url });  // This will trigger the mutation
                flowerForm.resetForm();
            }
        }
        
    });

    return (
        <>
        {/* {isEditMode ? "Floressa Bloom: Refine the Garden" :  */}
            <h1>Floressa Bloom: Enrich the Garden</h1>
            <form onSubmit={flowerForm.handleSubmit}>
                <label>Name</label>
                <input
                    name="name"
                    type="text"
                    onChange={flowerForm.handleChange}
                    value={flowerForm.values.name}
                    placeholder="Enter flower name"
                    autoFocus
                />
                <p>{flowerForm.errors.name}</p>
                <br />
                
                <label>Season</label>
                <select
                    name="season"
                    onChange={flowerForm.handleChange}
                    value={flowerForm.values.season}
                >
                    <option value="">Select a season</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Autumn">Autumn</option>
                    <option value="Winter">Winter</option>
                </select>
                <p>{flowerForm.errors.season}</p>
                <br />

                <label>Colors</label>
                <div className="color-options">
                    {mockColors.map((c) => (
                        <label key={c.id} className="color-option">
                            <input
                                type="checkbox"
                                name="color_ids"
                                value={c.id}
                                onChange={flowerForm.handleChange}
                                checked={flowerForm.values.color_ids.includes(String(c.id))}
                                className="color-checkbox"
                            />
                            <span className="color-name">{c.name}</span>
                        </label>
                    ))}
                </div>
                <p>{flowerForm.errors.color_ids}</p>
                <br />

                <button className="button-submit" disabled={!flowerForm.isValid} type="submit">
                    Submit
                </button>
            </form>
        </>
    );
};

export default FlowerForm;
