import Logo from "./Logo";

export default function Footer() {
  return (
    <div className="pt-20 pb-30">
      <div className="Content">
        <div style={{ gridColumn: "1/6" }}>
          <Logo />
        </div>
      </div>
    </div>
  );
}
