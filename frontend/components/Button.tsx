type ButtonProps = {
    label : string;
    onClick: () => void;
    className : string;
}

export default function Button({label, onClick, className} : ButtonProps){
    // testing button function
    const handleClick = () => {
        alert("Button clicked");
    }

    return(
        
        <button onClick={onClick}
        className={`rounded text-white w-full hover:cursor-pointer hover:bg-button-selected/90 transition-colors duration-200 ${className}`}>
            {label}
        </button>
        
    );
}