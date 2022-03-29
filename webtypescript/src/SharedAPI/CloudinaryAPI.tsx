import React from 'react';

const uploadSingleImage = async ( reader: FileReader ) => {
    try {
        const response = await fetch("/uploadimage",{
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({file: reader.result}),
            });
           
        return await response.json();
    }catch(err) {
        console.error(err);
    }
}

const destroyImage = async ( publicID ) => {
    try{
        await fetch(
          "/deleteimage",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"public_id": publicID})
          }
        )
      }catch(error){
        console.error(error);
      }
}

export { uploadSingleImage, destroyImage };