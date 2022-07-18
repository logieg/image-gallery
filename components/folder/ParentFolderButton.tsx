import { useRouter } from "next/router";
import Theme from "../../data/Theme";

/** Ellipsis button to ascend to the parent folder */
const ParentFolderButton = () => {
  const router = useRouter();

  /** Go up to the parent folder */
  const ascend = () => {
    router.push({
      pathname: router.pathname,
      query: {
        d: router.query.d.slice(0, router.query.d.lastIndexOf('/')),
        f: undefined,
      }
    });
  };

  return (
    <div
      style={{
        width: 'fit-content',
        padding: '4px 12px',
        margin: '8px',
        backgroundColor: Theme.accent,
        borderRadius: '5px',
        fontSize: '125%',
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
      onClick={ascend}
    >
      ...
    </div>
  );
};

export default ParentFolderButton;
