import { useState, useEffect } from "react";

/*Custom hook to fetch data*/
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const settings = {
    method: 'GET',
    credentials: "include",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
}
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(url, settings);
        const data = await res.json();
        /*change state to get datas*/
        setData(data);
        /*remove loader*/
        setIsPending(false);
        return data
      } catch (error) {
        console.log(error);
        return;
      }
    };

    getPosts();
  }, [url]);

  /*allows to get data and pending status in other components*/
  return { data, isPending };
};

export default useFetch;
