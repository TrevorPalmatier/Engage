import React, { useEffect, useState } from "react";
import "../../App.scss";
import "./ViewStudies.scss";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../Components/Layout";
import { Image } from "cloudinary-react";

const ViewStudies = () => {
  const [data, setData] = useState<any>([]);

  useEffect( () => {
    console.log('Component is mounting');
    const abortController = new AbortController();

    fetch("/api/studies", {
      signal: abortController.signal,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });


    return () => {
      console.log("unmounting");
      abortController.abort(); // cancel pending fetch request on component unmount
    };
  }, []);

  const navigate = useNavigate(); //sets up navigation

  const goToCreateStudy = () => {
    navigate("/createstudy");
  };

  const gotToBlocks = (id) => {
    navigate(`/viewstudy/${id}`);
  };

  return (
    <Layout>
      <div className="viewHeader">
        <h1>Studies</h1>
      </div>
      <div className="submitButtons">
        <button className="buttonText" onClick={goToCreateStudy}>
          Create Study
        </button>
      </div>
      <div className="square-container">
        {data.map((study) => {
            return (
              <div
                className="square"
                key={study.id}
                onClick={() => gotToBlocks(study.id)}
              >
                <Image cloudName='engageapp' publicId={study.imageID}/>
                <h1>{study.title}</h1>
              </div>
            );
        })}
      </div>
    </Layout>
  );
};
export default ViewStudies;
