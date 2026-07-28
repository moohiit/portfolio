export default function SectionTitle({ number, children }) {
  return (
    <div className="section-title">
      <h2>
        {number && <span className="section-number">{number}.</span>} {children}
      </h2>
    </div>
  );
}
