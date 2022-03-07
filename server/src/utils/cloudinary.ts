import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

const cloudinary2 = cloudinary.v2;

cloudinary2.config({
    cloud_name: 'engageapp',
    api_key: '883373832996248',
    api_secret: 'R0DGtSHL4J_S_5r_-p6ZiIiKSIE'
  });

export {cloudinary2};