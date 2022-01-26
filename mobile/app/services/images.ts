import React, {useState} from 'react';
import {Alert} from "react-native";

const [error, setError] = useState("");
const [photo, setPhoto] = useState(null);

export const uploadImage = (photo) => {
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "engageapp");
    data.append('cloud_name', 'engageapp');
    fetch("https://api.cloudinary.com/v1_1/engageapp/upload", {
        method: "POST",
        body: data
    }).then(res => res.json()).
        then(data => {
            setPhoto(data.secure_url)
    }).catch(err => {
        Alert.alert("An Error Occured While Uploading");
    })
};