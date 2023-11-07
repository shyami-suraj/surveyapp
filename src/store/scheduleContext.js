import { createContext,  useState } from "react";
import { axiosInstance } from "../util/axios";

export const ScheduleContext = createContext({
  date: undefined,
  time: undefined,
  imageUri: undefined,
  collector: undefined,
  setScheduleDate: () => {},
  setScheduleCollector: () => {},
  setScheduleTime: () => {},
  setImageUri: () => {},
  clearSelectedSchedule: () => {},

});

export const ScheduleContextProvider = ({ children }) => {
  const [date, setDate] = useState();
  const [productImage, setProductImage] = useState();
  const [collector, setCollector] = useState()

  const clearSelectedSchedule = () => {
    setDate(undefined)
    setProductImage(undefined)
    setCollector(undefined)
  }

  const setTime = (time) => {
    if(date.date)
      setDate(prevDate => {
        const [hours, minutes] = time.split(':')
        prevDate.date.setHours(hours);
        prevDate.date.setMinutes(minutes);
        prevDate.date.setSeconds(0);
        return {
          ...prevDate
        }
      })
  }

  const value = {
    date,
    imageUri: productImage,
    collector,
    setScheduleDate: setDate,
    setScheduleTime: setTime,
    setImageUri: setProductImage,
    setScheduleCollector: setCollector,
    clearSelectedSchedule
  };

  return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>;
};
