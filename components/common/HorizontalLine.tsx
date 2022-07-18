import Theme from "../../data/Theme";

/** Horizontal divider line */
const HorizontalLine = () => {
  return (
      <div style={{
        width: '80%',
        height: '1px',
        margin: 'auto',
        backgroundColor: Theme.border
      }} />
  );
}

export default HorizontalLine;
