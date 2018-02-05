import React from 'react'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Alaotsikko otsikko={kurssi.nimi} />
            <Osat osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

const Alaotsikko = ({ otsikko }) => {
    return (
        <div>
            <h2>{otsikko}</h2>
        </div>
    )
}

const Osat = ({ osat }) => {
    const osalinet = () => osat.map((osa) => <Osa key={osa.id} osa={osa} />)
    return (
        <div>
            {osalinet()}
        </div>
    )
}

const Osa = ({ osa }) => {
    return (
        <div>
            <p>{osa.nimi} {osa.tehtavia}</p>
        </div>
    )
}

const Yhteensa = ({ osat }) => {
    let tehtavat = [];
    osat.forEach(osa => {
        tehtavat.push(osa.tehtavia);
    });
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let yhteensa = (tehtavat.reduce(reducer))
    return (
        <div>
            <p>yhteensä {yhteensa} tehtävää</p>
        </div>
    )
}

export default Kurssi