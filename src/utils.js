import store from "./store";
import { setAllCities } from "./store/AllCity";
import { setCurrentCity } from "./store/CurrentCity";

export const allCitiesHandle = (data) => {
  store.dispatch(setAllCities(data)); 
};

export const currentCityHandle = (data) => {
  store.dispatch(setCurrentCity(data)); 
};


export  function weatherSituation(weatherSituation) {
  switch (weatherSituation) {
    case "Az Bulutlu":
      return "parcali-bulutlu";
    case "Güneşli":
      return "gunesli";
    case "Yağmurlu":
      return "yagmurlu";
    case "Bulutlu":
      return "bulutlu";
    case "Karla Karışık Yağmur":
      return "karla-yagmur";
    case "Kar Yağışlı":
      return "kar-yagisli";
    case "Sağanak Yağışlı":
      return "saganak-yagisli";
    case "Sağanak Kar Yağışı":
      return "saganak-kar-yagisli";
    case "Kısmen Güneşli ve Sağanak Yağışlı":
      return "kismen-gunesli-saganak-yagisli";
    case "Kısmen Güneşli":
      return "kismen-gunesli";
    default:
      return "bulutlu";
  }
}