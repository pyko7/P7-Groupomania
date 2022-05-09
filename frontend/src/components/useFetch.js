import { useState, useEffect } from "react";

/*Custom hook to fetch data*/
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(url, { headers });
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
  // empty dependency array means this effect will only run once (like componentDidMount in classes)

  /*allows to get data and pending status in other components*/
  return { data, isPending };
};

export default useFetch;
