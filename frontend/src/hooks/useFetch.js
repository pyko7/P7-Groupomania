import { useState, useEffect } from "react";

/* this custom hook represents a fetch with the GET method
   the url parameter will be replaced by the API URL 
  the useEffect hook contains the fetch function
  with the dependecy, it will fetch every time the url changes
*/
const useFetch = (url) => {
  //it represents the fetched datas
  const [data, setData] = useState(null);
  //it represents the state of the loading spinner
  const [isPending, setIsPending] = useState(true);
  const settings = {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(url, settings);
        const data = await res.json();
        //change state to get datas
        setData(data);
        //remove loader
        setIsPending(false);
        return data;
      } catch (error) {
        console.log(error);
        return;
      }
    };
    getPosts();
  }, [url]);

  //allows to get data and pending status in other components
  return { data, isPending };
};

export default useFetch;
