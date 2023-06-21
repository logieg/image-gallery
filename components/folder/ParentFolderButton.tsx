"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Theme from "../../data/Theme";

/** Ellipsis button to ascend to the parent folder */
const ParentFolderButton = () => {
  const pathname = usePathname();
  const parentPath = pathname.lastIndexOf('/') > 0
    ? pathname.slice(0, pathname.lastIndexOf('/'))
    : '/';

  return (
    <Link
      href={parentPath}
      style={{
        display: 'block',
        width: 'fit-content',
        padding: '4px 12px',
        margin: '8px',
        backgroundColor: Theme.accent,
        borderRadius: '5px',
        fontSize: '125%',
        fontWeight: 'bold',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      ...
    </Link>
  );
};

export default ParentFolderButton;
