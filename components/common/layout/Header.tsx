import Centered from "../Centered";
import HorizontalLine from "../HorizontalLine";

const Header = () => {
  return (
    <div style={{ width: '100%' }}>
      <Centered>
        <h1 style={{ margin: '16px 0px' }}>
          Stellus Image Gallery
        </h1>
        <HorizontalLine />
      </Centered>
    </div>
  )
}

export default Header;
