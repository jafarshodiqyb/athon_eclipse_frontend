export const SpinnerWrapper = ({ children,style,className}) => {
    console.log(style)
    return (
        <div style={{ position:"relative",...style}} 
        className={className}
        >
            {children}
            
        </div>
    );
  };