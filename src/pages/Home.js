import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAllProducts } from '../redux/HabeshaSlice'; // Ensure this path is correct

import Banner from '../componets/Home/Banner';
import Product from '../componets/Home/Product';

const Home = () => {
  const data = useLoaderData();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.data && Array.isArray(data.data)) {
      dispatch(setAllProducts(data.data));
    } else {
      console.error("Invalid data format:", data);
    }
  }, [data, dispatch]);

  return (
    <div>
      <Banner />
      <div className="w-full -mt-10 xl:-mt-36 py-10">
        {data && data.data && Array.isArray(data.data) ? (
          <Product />
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Home;