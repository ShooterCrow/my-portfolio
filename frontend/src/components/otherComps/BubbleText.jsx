const BubbleText = ({text}) => {
    return (
      <h2 className="text-center text-5xl font-thin text-indigo-300">
        {text.split("").map((child, idx) => (
          <span className={"hoverText"} key={idx}>
            {child}
          </span>
        ))}
      </h2>
    );
  };
  
  export default BubbleText;