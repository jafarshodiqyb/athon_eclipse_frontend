export const SpinnerWrapper = ({ children,style}) => {
    console.log(style)
    return (
        <div style={{ position:"relative",...style}} 
        // className="ml-3 mt-1"
        >
            {children}
            
        </div>
    );
  };