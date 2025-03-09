import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import FetchFlowerData from "../components/FetchFlowerData";
const mockColors = [
    { id: 1, name: "pink" }, { id: 2, name: "blue" }, { id: 3, name: "red" },
    { id: 4, name: "yellow" }, { id: 5, name: "purple" }, { id: 6, name: "white" },
    { id: 7, name: "orange" }, { id: 8, name: "green" }, { id: 9, name: "lavender" },
    { id: 10, name: "peach" }, { id: 11, name: "violet" }, { id: 12, name: "burgundy" },
    { id: 13, name: "magenta" }, { id: 14, name: "coral" }, { id: 15, name: "turquoise" },
    { id: 16, name: "cream" }, { id: 17, name: "gold" }, { id: 18, name: "silver" },
    { id: 19, name: "black" }, { id: 20, name: "multicolor" }
];

const FlowerForm = () => {
    const [flowerData, setFlowerData] = useState({ description: "", imageUrl: "" });

    // Update flower data from the fetched details
    const onDataFetched = (data) => {
        setFlowerData(data);
    };

    return (
        <div>
            <h1>Add Flower</h1>

            <Formik
                initialValues={{
                    name: "",
                    season: "",
                    colorIds: [],
                    imageUrl: flowerData.imageUrl,
                    description: flowerData.description
                }}
                onSubmit={(values) => {
                    console.log("Form submitted with values:", values);
                }}
            >
                {({ values, handleChange, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                        <label>Name</label>
                        <input
                            name="name"
                            type="text"
                            onChange={(e) => {
                                handleChange(e);
                                setFieldValue("description", "");
                                setFieldValue("imageUrl", "");
                            }}
                            value={values.name}
                            placeholder="Enter flower name"
                            autoFocus
                        />

                        {/* Fetch flower data when name changes */}
                        <FetchFlowerData flowerName={values.name} onDataFetched={onDataFetched} />

                        <label>Season</label>
                        <select name="season" onChange={handleChange} value={values.season}>
                            <option value="">Select a season</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Autumn">Autumn</option>
                            <option value="Winter">Winter</option>
                        </select>

                        <label>Colors</label>
                        {mockColors.map((c) => (
                            <label key={c.id}>
                                <input
                                    type="checkbox"
                                    name="colorIds"
                                    value={c.id}
                                    onChange={handleChange}
                                    checked={values.colorIds.includes(String(c.id))}
                                />
                                {c.name}
                            </label>
                        ))}

                        <button type="submit" disabled={!values.name || !values.season}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>

            {flowerData.imageUrl && (
                <div>
                    <img src={flowerData.imageUrl} alt="Flower" />
                    <p>{flowerData.description}</p>
                </div>
            )}
        </div>
    );
};

export default FlowerForm;
