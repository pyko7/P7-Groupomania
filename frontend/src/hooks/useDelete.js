/*Function to delete datas*/
const useDelete = async (url) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const settings = {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: "Bearer " + token,
    },
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
