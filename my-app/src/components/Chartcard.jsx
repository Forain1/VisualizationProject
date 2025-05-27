const ChartCard = ({ children ,style={}}) => (
  <div
    style={{
      backgroundColor: '#fff',  
      borderRadius: 12,
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      padding: 16,
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      color: '#333',  // 深色字体，阅读舒适
      ...style
    }}
  >
    {children}
  </div>
);

export default ChartCard;
