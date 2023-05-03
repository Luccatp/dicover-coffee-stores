import { use, useContext, useReducer, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../pages/_app";

interface IuseTrackLocationReturn {
  handleTrackLocation: () => void;
  locationErrorMessage: string;
  isFindingLocation: boolean;
}

const useTrackLocation = (): IuseTrackLocationReturn => {
  const [locationErrorMessage, setLocationErrorMsg] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const { dispatch } = useContext(StoreContext);

  const success = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${latitude},${longitude}` },
    });
    setLocationErrorMsg("");
    setIsFindingLocation(false);
  };

  const error = () => {
    setLocationErrorMsg("Não conseguimos pegar a sua geolocalização");
    setIsFindingLocation(false);
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("O seu navegador não suporta Geolocalização");
      setIsFindingLocation(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    handleTrackLocation,
    locationErrorMessage,
    isFindingLocation,
  };
};

export default useTrackLocation;
