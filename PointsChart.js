import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

function PointsChart(props) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 200, height: 100 });
  const lastFourTotals = (props.weeklyPointTotal || []).slice(-4);
  const highestWeeklyTotal =
    lastFourTotals.length > 0 ? Math.max(...lastFourTotals) : null;
  let compareWeekTotal = null;
  if (lastFourTotals.length > 1) {
    compareWeekTotal = lastFourTotals[lastFourTotals.length - 2];
  }

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // destroy the previous chart instance (if it exists)
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }

    const newChartInstance = new Chart(ctx, {
      type: "bar", // changed to bar rather than line
      data: {
        labels: ["WEEK 1", "WEEK 2", "WEEK 3", "WEEK 4"],
        datasets: [
          {
            label: "Last Four Weeks",
            data: lastFourTotals,
            backgroundColor: "rgba(25, 138, 28, 0.6)", // adjust background color, last value is transparency
            borderColor: "rgb(25, 138, 28)",
            borderWidth: 1,
          },
        ],
      },
    });

    // save the chart instance to the ref
    chartRef.current.chartInstance = newChartInstance;
  }, [dimensions, props.weeklyPointTotal]);

  const handleResize = () => {
    // Get the width of the container
    const containerWidth = chartContainerRef.current.clientWidth;

    // Update the dimensions state
    setDimensions({ width: containerWidth, height: 100 });
  };

  useEffect(() => {
    // Handle initial resize
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);

      // Destroy the chart instance
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  //////////////////////// return

  return (
    <div ref={chartContainerRef}>
      <div className="profile-container">
        <h3>All-time Progress</h3>

        {props.allTimePointTotal === 0 && (
          <p>Complete challenges to earn points and track your progress!</p>
        )}

        {props.allTimePointTotal > 0 && (
          <>
            <p>
              To date, you have earned <b>{props.allTimePointTotal}</b> points!
            </p>
          </>
        )}
      </div>

      <h3 className="home-content-container">Weekly Point Totals</h3>
      <canvas
        ref={chartRef}
        width={dimensions.width}
        height={dimensions.height}
      ></canvas>

      {highestWeeklyTotal === null && (
        <p className="home-content-container">
          Complete your first week's challenges to start tracking your progress!
        </p>
      )}

      {highestWeeklyTotal !== null && (
        <p>Your highest ever weekly total is {highestWeeklyTotal} points. </p>
      )}

      {compareWeekTotal !== null && (
        <p>
          Last week's total was {lastFourTotals[lastFourTotals.length - 1]}{" "}
          points.
          {lastFourTotals[lastFourTotals.length - 1] > compareWeekTotal
            ? " That's more than the previous week. Great improvement!"
            : " Keep it up to try and beat last week's total!"}
        </p>
      )}
    </div>
  );
}

export default PointsChart;
