import React, { useEffect, useState } from "react";
import "../App.scss";
import "../Styling/FakeScreen.scss";
import {Image} from "cloudinary-react";
/**
 * this is to show a fake screen for each slide of a block
 */
const FakeScreen = ({ id }) => {
  const [slideData, setData] = useState<any>({});
  const [str1, setFirstStr] = useState("");
  const [str2, setSecStr] = useState("");

  useEffect(() => {
    fetch(`https://ancient-ridge-25388.herokuapp.com/slides/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setSlideOption(data);
      });
  }, [id]);

  const setSlideOption = (slide) => {
    if (slide.option === 1) {
      setFirstStr(slide.backgroundText);
    } else {
      setFirstStr(
        slide.backgroundText.slice(0, slide.backgroundText.length / 3)
      );
      setSecStr(
        slide.backgroundText.slice(
          slide.backgroundText.length / 3,
          slide.backgroundText.length - 1
        )
      );
    }
  };

  return (
    <div className="smartphone">
      <div className="content1">
        <div className="header">
          <h2>{slideData.title}</h2>
        </div>
        {slideData.medias?.map((media, index) => {
          if (media.position === 0) {
            if(slideData.option === 1){
              return (
                <div key = {media.id} className="option1">
                  <Image cloudName='engageapp' publicId={media.imageID}/>
                  <p className="text">{str1}</p>
                </div>
              );
            }
            else if(slideData.option === 2){
              return (
                <div  key = {media.id} className="option2">
                  <p className="text1">{str1}</p>
                  <Image cloudName='engageapp' publicId={media.imageID}/>
                  <p className="text2">{str2}</p>
                </div>
              );
            }
          } else if (media.position === 0 && slideData.option === 3) {
            <Image  key = {media.id} cloudName='engageapp' publicId={media.imageID}/>
          } else if (media.position === 1 && slideData.option === 3) {
            return (
              <div  key = {media.id} className="option3">
                <p className="text1">{str1}</p>
                <Image cloudName='engageapp' publicId={media.imageID}/>
                <p className="text2">{str2}</p>
              </div>
            );
          }
          return(<div></div>);
        })}
      </div>
    </div>
  );
};

export default FakeScreen;
