type ButtonProps = {
    key : string;
    label : string;
    className : string;
}

export default function Button({label, className} : ButtonProps){
    const handleClick = () => {
        alert("Button clicked");
    }

    return(
        
        <button onClick={handleClick} 
        className={`bg-indigo-400 rounded text-white font-bold w-full hover:cursor-pointer ${className}`}>
            {label}
        </button>
        
    );
}