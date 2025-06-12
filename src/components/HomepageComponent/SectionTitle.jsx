export default function SectionTitle({ children }) {
  return (
    <h2
      style={{
        textAlign: "center",
        margin: "10vh 0 5vh",
        textTransform: "capitalize",
      }}
    >
      {children}
    </h2>
  );
}
