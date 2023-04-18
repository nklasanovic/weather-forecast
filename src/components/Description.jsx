import React from "react";
import { BiHappy } from "react-icons/bi";
import { FaArrowDown, FaArrowUp, FaWind } from "react-icons/fa";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";

const Description = ({ weather, units }) => {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "m/h";

  const cards = [
    {
      id: 1,
      icon: <FaArrowDown />,
      title: "min",
      data: weather.temp_min.toFixed(),
      unit: tempUnit,
    },
    {
      id: 2,
      icon: <FaArrowUp />,
      title: "max",
      data: weather.temp_max.toFixed(),
      unit: tempUnit,
    },
    {
      id: 3,
      icon: <BiHappy />,
      title: "feels like",
      data: weather.feels_like.toFixed(),
      unit: tempUnit,
    },
    {
      id: 4,
      icon: <MdCompress />,
      title: "pressure",
      data: weather.pressure,
      unit: "hPa",
    },
    {
      id: 5,
      icon: <MdOutlineWaterDrop />,
      title: "humidity",
      data: weather.humidity,
      unit: "%",
    },
    {
      id: 6,
      icon: <FaWind />,
      title: "wind speed",
      data: weather.speed.toFixed(),
      unit: windUnit,
    },
  ];
  return (
    <div className="w-full grid grid-cols-3 gap-12">
      {cards.map(({ id, icon, title, data, unit }) => (
        <div key={id} className="w-full h-[100%] flex flex-col items-center justify-between p-4 text-[16px] rounded-xl bg-[var(--secondary-color)]">
          <div className="w-full flex flex-row items-center justify-center mb-2">
            {icon}
            <small className="ml-2">{title}</small>
          </div>
          <h2 className="font-bold">{`${data} ${unit}`}</h2>
        </div>
      ))}
    </div>
  );
};

export default Description;
