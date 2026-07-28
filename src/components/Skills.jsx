import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import SectionTitle from "./SectionTitle.jsx";
import { skillCategories, radarData } from "../data.js";

function getRadarColors(theme) {
  if (theme === "light") {
    return {
      bg1: "rgba(0, 180, 150, 0.15)", border1: "rgba(0, 180, 150, 0.8)",
      bg2: "rgba(123, 44, 191, 0.15)", border2: "rgba(123, 44, 191, 0.8)",
      grid: "rgba(0, 0, 0, 0.1)", labels: "#333333", ticks: "#666666",
    };
  }
  return {
    bg1: "rgba(0, 255, 204, 0.15)", border1: "rgba(0, 255, 204, 0.8)",
    bg2: "rgba(123, 44, 191, 0.15)", border2: "rgba(123, 44, 191, 0.8)",
    grid: "rgba(255, 255, 255, 0.1)", labels: "#caf0f8", ticks: "#caf0f8",
  };
}

export default function Skills({ theme }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const colors = getRadarColors(theme);
    chartRef.current = new Chart(canvasRef.current, {
      type: "radar",
      data: {
        labels: radarData.labels,
        datasets: [
          {
            label: "Proficiency",
            data: radarData.proficiency,
            backgroundColor: colors.bg1,
            borderColor: colors.border1,
            borderWidth: 2,
            pointBackgroundColor: colors.border1,
            pointBorderColor: colors.border1,
            pointRadius: 4,
          },
          {
            label: "Interest",
            data: radarData.interest,
            backgroundColor: colors.bg2,
            borderColor: colors.border2,
            borderWidth: 2,
            pointBackgroundColor: colors.border2,
            pointBorderColor: colors.border2,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 20, color: colors.ticks, backdropColor: "transparent", font: { size: 10 } },
            grid: { color: colors.grid },
            angleLines: { color: colors.grid },
            pointLabels: { color: colors.labels, font: { size: 12, family: "Poppins" } },
          },
        },
        plugins: {
          legend: {
            labels: { color: colors.labels, font: { family: "Poppins" }, usePointStyle: true, pointStyle: "circle" },
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, []);

  // Re-color chart on theme change
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const colors = getRadarColors(theme);
    chart.data.datasets[0].backgroundColor = colors.bg1;
    chart.data.datasets[0].borderColor = colors.border1;
    chart.data.datasets[0].pointBackgroundColor = colors.border1;
    chart.data.datasets[1].backgroundColor = colors.bg2;
    chart.data.datasets[1].borderColor = colors.border2;
    chart.data.datasets[1].pointBackgroundColor = colors.border2;
    chart.options.scales.r.grid.color = colors.grid;
    chart.options.scales.r.angleLines.color = colors.grid;
    chart.options.scales.r.pointLabels.color = colors.labels;
    chart.options.scales.r.ticks.color = colors.ticks;
    chart.options.plugins.legend.labels.color = colors.labels;
    chart.update();
  }, [theme]);

  return (
    <section id="skills">
      <div className="container">
        <SectionTitle number="02">Technical Skills</SectionTitle>

        <div className="skills-container">
          {skillCategories.map((cat) => (
            <div className={`skill-card skill-card--${cat.key}`} key={cat.key}>
              <div className="skill-header">
                <div className="skill-icon"><i className={cat.icon}></i></div>
                <h3 className="skill-title">{cat.title}</h3>
              </div>
              <div className="skill-proficiency">
                <div className="skill-proficiency-track">
                  <div className="skill-proficiency-fill" style={{ width: cat.proficiency + "%" }}></div>
                </div>
                <span className="skill-proficiency-value">{cat.proficiency}%</span>
              </div>
              <div className="skill-items">
                {cat.items.map((item) => (
                  <div className="skill-item" key={item}>{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="radar-chart-container">
          <h3 className="radar-title">Skill Proficiency</h3>
          <div className="radar-wrapper">
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
      </div>
    </section>
  );
}
