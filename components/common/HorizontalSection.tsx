interface HorizontalSectionProps {
  children: React.ReactNode;
  width?: string;
}

/** Display elements in a fixed-width layout section */
const HorizontalSection = ({ children, width = '800px' }: HorizontalSectionProps) => {
  return (
    <div style={{ width: 'calc(100% - 24px)', padding: '0px 12px' }}>
      <div style={{ maxWidth: width, width: '100%', margin: 'auto' }}>
        {children}
      </div>
    </div>
  );
}

export default HorizontalSection;
