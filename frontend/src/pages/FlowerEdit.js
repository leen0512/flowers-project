import React, { useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { object, string, array } from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const FlowerEdit = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const mockColors = [
        { id: 1, name: "pink" }, { id: 2, name: "blue" }, { id: 3, name: "red" },
        { id: 4, name: "yellow" }, { id: 5, name: "purple" }, { id: 6, name: "white" },
        { id: 7, name: "orange" }, { id: 8, name: "green" },
        { id: 9, name: "brown" }, { id: 10, name: "black" }, { id: 11, name: "multicolor" }, { id: 12, name: "other" }
    ];

    const fetchFlower = async (flowerId) => {
        const res = await axios.get(`http://localhost:8000/flowers/${flowerId}`);
        return res.data;
    };

    const { data: flowerData, isLoading } = useQuery({
        queryKey: ["flower", id],
        queryFn: () => fetchFlower(id),
        enabled: !!id,
    });

    const mutation = useMutation({
        mutationFn: async (flowerData) => {
            const res = await axios.put(`http://localhost:8000/flowers/${id}`, flowerData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["flowers"] });
        },
        onError: (error) => {
            console.error("Mutation error:", error);
        }
    });

    const flowerForm = useFormik({
        initialValues: {
            name: "",
            season: "",
            color_ids: [],
            image_url: "",
            description: ""
        },
        validationSchema: object({
            name: string()
                .trim()
                .min(3, "A name that short? Even sprouts need room to grow! 🌱")
                .matches(/^\S.*$/, "No tiptoeing around! A flower’s name starts bold, not with a space! 🚫❀")
                .required("Your flower deserves an identity, not just a mystery! (˘͈ᵕ ˘͈❀)"),
            season: string()
                .required("Every flower needs its moment to bloom—choose a season! 🌼"),
            color_ids: array()
                .min(1, "No colors? Your flower feels unseen! Let it shine with a splash of color! 🎨❀"),
            description: string()
                .trim()
                .matches(/^\S.*$/, "A flower’s story begins with a word, not an empty breeze! 🍃")
                .required("Every flower has a tale—give yours a description! 📖🌸"),
            image_url: string()
                .trim()
                .matches(/^\S.*$/, "A picture is worth a thousand petals—don’t start with a blank space! 📸❀")
                .required("Even the rarest blooms need a picture! Add an image URL! 🌷✨"),
        }),
        onSubmit: (form) => {
            console.log("Submitting form data:", form); // Log the form data here
            mutation.mutate(form);
            flowerForm.resetForm();
        },
    });
    

    useEffect(() => {
        console.log(flowerData); // Check what data is being fetched
        if (flowerData) {
            flowerForm.setValues({
                name: flowerData.name || "",
                season: flowerData.season || "",
                color_ids: flowerData.color_ids || [],
                image_url: flowerData.image_url || "",
                description: flowerData.description || "",
            });
        }
    }, [flowerData]);
    

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <h1>Floressa Bloom: Refine the Garden</h1>
            <form onSubmit={flowerForm.handleSubmit}>
                <label>Name</label>
                <input
                    name="name"
                    type="text"
                    onChange={flowerForm.handleChange}
                    value={flowerForm.values.name}
                    placeholder="Enter flower name"
                />
                <p>{flowerForm.errors.name}</p>

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

                <label>Description</label>
                <input
                    name="description"
                    type="text"
                    onChange={flowerForm.handleChange}
                    value={flowerForm.values.description}
                    placeholder="Enter flower description"
                />
                <p>{flowerForm.errors.description}</p>

                <label>Image URL</label>
                <input
                    name="image_url"
                    type="text"
                    onChange={flowerForm.handleChange}
                    value={flowerForm.values.image_url}
                    placeholder="Enter flower image URL"
                />
                <p>{flowerForm.errors.image_url}</p>

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

                <button className="button-submit" disabled={!flowerForm.isValid}  type="submit">
                    Update
                </button>
            </form>
        </>
    );
};

export default FlowerEdit;