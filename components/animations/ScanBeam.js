export default function ScanBeam({ children, className = "" }) {
  return (
    <div className={`scan-container ${className}`}>
      <div className="scan-beam" />
      {children}
    </div>
  );
}
