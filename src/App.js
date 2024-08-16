import "./App.css";
import Header from "./Header/header";
import CategoryList from "./CategoryList/categoryList";
import { useEffect, useState } from "react";
import axios from "./axios";
import Loading from "./Loading/loading";
import FastFoodList from "./FastFoodList/fastFoodList";

function App() {
  const [loading, setLoading] = useState(false);
  const [fastFoods, setFastFoods] = useState([]);
  const fetchData = async (categoryId = null) => {
    setLoading(true);
    const response = await axios.get(
      `/FastFood/list/${categoryId ? "?categoryId=" + categoryId : ""}`
    );
    setLoading(false);
    setFastFoods(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <Loading theme="dark" />;
    }
    return <FastFoodList fastFoods={fastFoods} />;
  };
  return (
    <div className="wrapper bg-feded-dark">
      <Header></Header>
      <CategoryList></CategoryList>
      <div className="container mt-4">{renderContent()}</div>
    </div>
  );
}

export default App;
