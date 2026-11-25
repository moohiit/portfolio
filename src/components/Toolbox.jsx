import { toolbox } from "../data.js";

export default function Toolbox() {
  return (
    <div className="toolbox-grid" id="toolbox">
      {toolbox.map((t) => (
        <div className="toolbox-item" key={t.label}>
          <span className="icon-tile icon-tile--sm"><i className={t.icon} aria-hidden="true"></i></span>
          <div>
            <div className="toolbox-label">{t.label}</div>
            <div className="toolbox-value">{t.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
