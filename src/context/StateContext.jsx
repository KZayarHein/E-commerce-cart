import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { reducer } from "./reducer";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const initialState = {
    products: [],
    cart: [],
  };

  useEffect(() => {
    api();
    setLoading(true);
  }, []);

  const api = async () => {
    const {
      data: { products },
    } = await axios.get(`https://dummyjson.com/products`);
    setLoading(false);
    setProductList(products);
  };

  useEffect(() => {
    dispatch({ type: "GET_PRODUCT", payload: productList });
    const filterPd = productList.filter((pd) =>
      pd.title.toLowerCase().includes(search.toLowerCase())
    );
    dispatch({ type: "GET_PRODUCT", payload: filterPd });
  }, [productList, search]);

  const [state, dispatch] = useReducer(reducer, initialState);
  const data = { state, dispatch, search, setSearch, loading, productList };
  return <StateContext.Provider value={data}>{children}</StateContext.Provider>;
};

export const customHook = () => useContext(StateContext);
