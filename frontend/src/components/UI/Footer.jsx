import reactLogo from '../../assets/react.svg'
import solidityLogo from '../../assets/solidity.svg'

export function Footer() {return(<footer className="bg-gray-800 text-white p-4 shadow-lg">
<div className="container mx-auto flex justify-between items-center">
    <div>
        <p className="text-lg">
            Made by Nicolas Vyčas Nery 
        </p>
    </div>
    <div className="flex items-center">
        <span className="text-lg mr-2">Powered by</span>
        <img src={reactLogo} alt="React Logo" className="h-8 w-8" />
        <span className="text-lg mx-2">and</span>
        <img src={solidityLogo} alt="Solidity Logo" className="h-16 w-16" />
    </div>
</div>
</footer>)}
