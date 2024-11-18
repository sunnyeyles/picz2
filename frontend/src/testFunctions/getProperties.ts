export const getProperties = async () => {
  const userId = "673a7d83bf0ff1abe72150b8";

  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [];
  }
};
