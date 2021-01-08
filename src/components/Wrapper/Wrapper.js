export const SpinnerWrapper = ({ children,style,className}) => {
    return (
        <div style={{ position:"relative",...style}} 
        className={className}
        >
            {children}
            
        </div>
    );
  };