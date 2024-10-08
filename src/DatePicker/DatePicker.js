import React, { useEffect } from "react";
import "./DatePicker.css";
import { IosSelector, easing } from "./components/IosSelector";
import { getYears, getMonths, getDays } from "./components/dateUtils"; // 수정된 부분

const DatePicker = () => {
  useEffect(() => {
    let currentYear = new Date().getFullYear();
    let currentMonth = 1;
    let currentDay = 1;

    let yearSource = getYears();
    let monthSource = getMonths();
    let daySource = getDays(currentYear, currentMonth);

    let yearSelector = new IosSelector({
      el: "#year1",
      type: "infinite",
      source: yearSource,
      count: 20,
      onChange: (selected) => {
        currentYear = selected.value;
        daySource = getDays(currentYear, currentMonth);
        daySelector.updateSource(daySource);
        console.log(yearSelector.value, monthSelector.value, daySelector.value);
      },
    });

    let monthSelector = new IosSelector({
      el: "#month1",
      type: "infinite",
      source: monthSource,
      count: 20,
      onChange: (selected) => {
        currentMonth = selected.value;
        daySource = getDays(currentYear, currentMonth);
        daySelector.updateSource(daySource);
        console.log(yearSelector.value, monthSelector.value, daySelector.value);
      },
    });

    let daySelector = new IosSelector({
      el: "#day1",
      type: "infinite",
      source: [],
      count: 20,
      onChange: (selected) => {
        currentDay = selected.value;
        console.log(yearSelector.value, monthSelector.value, daySelector.value);
      },
    });

    let now = new Date();

    setTimeout(function () {
      yearSelector.select(now.getFullYear());
      monthSelector.select(now.getMonth() + 1);
      daySelector.select(now.getDate());
    });
  }, []);

  return (
    <div className="container">
      <h2>날짜 선택기</h2>
      <div className="date-selector">
        <div className="year" id="year1"></div>
        <div className="month" id="month1"></div>
        <div className="day" id="day1"></div>
      </div>
    </div>
  );
};

export default DatePicker;
