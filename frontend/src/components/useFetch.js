import { useState, useEffect } from "react";

/*Custom hook to fetch data*/
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();

    const getPosts = async () => {
      const res = await fetch(url, { signal: abortCont.signal });
      const data = await res.json();
      if (!res.ok) throw Error("La requête effectuée a échouée");
      /*change state to get datas*/
      setData(data);
      /*remove loader*/
      setIsPending(false);
    };

    getPosts().catch((err) => {
      if (!err.name === "AbortError") {
        console.error;
      }
    });

    /*cleanup function pauses the fetch*/
    return () => abortCont.abort();
  }),
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    [url];

  /*allows to get data and pending status in other components*/
  return { data, isPending };
};

export default useFetch;
