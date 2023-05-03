const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY!,
  },
};

const getUrlForCoffeeStores = (
  latLong: string,
  query: string,
  limit?: number
) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

export const fetchCoffeeStoreImages = async (id: number, limit: number = 1) => {
  const response = await fetch(
    `https://api.foursquare.com/v3/places/${id}/photos?limit=${limit}`,
    options
  ).catch(() => {
    return null;
  });
  if (!response) {
    return response;
  }

  const data = await response.json();

  if (limit === 1) {
    return data[0].prefix + "260x160" + data[0].suffix;
  }

  return data;
};

export const fetchCoffeeStores = async (
  latLong: string = "-30.0178096,-51.1902311",
  limit: number = 6
) => {
  if (latLong) {
    const response = await fetch(
      getUrlForCoffeeStores(latLong, "coffee", limit),
      options
    );

    const data = await response.json();

    const coffeeStore = await Promise.all(
      data.results.map(async (result: any) => {
        const imgUrl = await fetchCoffeeStoreImages(result.fsq_id);
        return {
          id: result.fsq_id,
          name: result.name,
          address: result.location.address,
          location: result.location,
          locationInfo:
            result.location.post_town || result.location.postcode || "",
          imgUrl,
        };
      })
    );

    console.log(coffeeStore);

    return coffeeStore || [];
  } else {
    return [];
  }
};
