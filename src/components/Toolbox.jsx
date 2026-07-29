import SectionTitle from "./SectionTitle.jsx";
import { toolbox } from "../data.js";

export default function Toolbox() {
  return (
    <section id="toolbox">
      <div className="container">
        <SectionTitle>Toolbox</SectionTitle>

        <div className="toolbox-grid">
          {toolbox.map((t) => (
            <div className="toolbox-item" key={t.label}>
              <i className={t.icon}></i>
              <div>
                <div className="toolbox-label">{t.label}</div>
                <div className="toolbox-value">{t.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
