import React, {useState} from 'react';

const Country = ({country}) => {
    const [ isShow, setShow ] = useState(false)
    
    const handleClick = () => {
        setShow(!isShow)
    }

    if (!isShow){
        return (
            <div>
                {country.name} 
                <button onClick={handleClick}>show</button>
            </div>
        )
    }
    
    return (
        <div>
            <h1>{country.name}</h1>
            <div>Capital: {country.capital}</div>
            <div>Population: {country.population}</div>
            <h2>Languages</h2>
            <ul>
            {country.languages.map(language => 
                <li key={language.name}>{language.name}</li>
            )}
            </ul>
            <img src={country.flag} width="20%" alt={`Flag of ${country.name}`}></img>
            <button onClick={handleClick}>hide</button>
        </div>
    );
};

export default Country;