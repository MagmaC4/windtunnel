export default function Button(){
    const handleClick = () => {
        alert("Button clicked");
    }

    return(
        
        <button onClick={handleClick} 
        className="bg-indigo-400 rounded text-white w-full hover:cursor-pointer">
            1D
        </button>
        
    );
}