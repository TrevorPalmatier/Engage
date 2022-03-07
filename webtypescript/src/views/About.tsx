import React from "react";
import "../App.scss";
import { Layout } from "../Components/Layout";
/**
 * This page shares what Engage is all about
 * @returns
 */
const About = () => {
  return (
    <Layout>
      <div className="viewHeader">
        <h1>About</h1>
      </div>

      <div className="bottom">
        <h3>Basic Workflow</h3>
        <p>Each study has a set of blocks. Each block has a set of slides. Each slide contains background text and images for the user to reference.</p>

        <br/>
        <h3>Page Breakdowns</h3>
        <h4>Home Page</h4>
        <p>This is where you will find quick links to the Create Study page and the View Studies Page</p>

        <h4>Create Study</h4>
        <p>This is where you can create a study. Name the study, upload a cover, and add blocks to the study here. </p>

        <h4>View Studies</h4>
        <p>This is where you can view all created studies. Here, you can either create a
          new study or edit existing studies.</p>

        <h4>View Study</h4>
        <p>This is where you can view the specific study. Here, you can either add a 
          a new block or edit an existing one. 
        </p>

        <h4>View Block</h4>
        <p>This is where you can view the specific block. Here, you can edit a block by adding slides 
          and choosing layout options.
        </p>


        </div>
    </Layout>
  );
};

export default About;
