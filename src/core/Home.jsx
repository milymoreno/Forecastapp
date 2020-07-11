import React from "react";
import Layout from "./Layout";
import LastChecked from "./LastChecked";

const Home = () => ( 
    <Layout title = "Home" description = "React Forecast App" >
        <LastChecked />
    </Layout>
);

export default Home;