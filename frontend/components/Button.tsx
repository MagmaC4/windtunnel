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
        className={`rounded text-white font-bold w-full hover:cursor-pointer transition-colors duration-200 ${className}`}>
            {label}
        </button>
        
    );
}