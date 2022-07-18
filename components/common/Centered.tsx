interface CenteredProps {
  children: React.ReactNode;
}

/** Center elements using margin and fit-content */
const Centered = ({ children }: CenteredProps) => {
  return (
    <div style={{
      position: 'relative',
      width: 'fit-content',
      margin: 'auto'
    }}>
      {children}
    </div>
  )
}

export default Centered;
