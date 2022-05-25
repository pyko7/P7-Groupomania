/* this custom hook represents a fetch with the DELETE method
   the url parameter will be replaced by the API URL 
*/
const useDelete = async (url) => {
  const settings = {
    method: "DELETE",
    credentials: "include",
  };
  try {
    const res = await fetch(url, settings);
    const data = await res.json();
    console.log(data);
    if (!res.ok)
      return alert("Vous n'êtes pas autorisé à effectuer cette action !");
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export default useDelete;
