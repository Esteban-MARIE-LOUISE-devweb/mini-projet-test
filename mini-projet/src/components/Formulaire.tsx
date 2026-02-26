import React from "react"

const objectifs = [
    { id: "sedentaire", label: "Sédentaire" },
    { id: "endurance", label: "Endurance" },
    { id: "conservation", label: "Conservation" },
    { id: "masse", label: "Prise de Masse" },
]

export default function Formulaire({ data, onUpdate }: any) {

function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const numericValue = parseInt(value) || 0;

    onUpdate((prev: any) => {
        let newData = { ...prev, [name]: numericValue };

        if (name === "poidsMin" && numericValue >= prev.poidsMax) {
            newData.poidsMax = numericValue + 1;
        } 
        else if (name === "poidsMax" && numericValue <= prev.poidsMin) {
            newData.poidsMax = prev.poidsMin + 1;
        }

        return newData;
    });
}

    function handleCheckboxChange(id: string) {
        const dejaSelectionne = data.selectionObjectif.includes(id);
        const nouvelleSelection = dejaSelectionne
            ? data.selectionObjectif.filter((item: string) => item !== id)
            : [...data.selectionObjectif, id];

        onUpdate({ ...data, selectionObjectif: nouvelleSelection });
    }

    return (
        <section id="form-container">
            <h2>Données du formulaire</h2>
            <label>Poids Min </label>
            <input type="number" name="poidsMin" value={data.poidsMin} onChange={handleChange}/>
            
            <label> Poids max </label>
            <input type="number" name="poidsMax" value={data.poidsMax} onChange={handleChange} />
            
            <label> Nombre de lignes </label>
            <input type="number" name="nbLignes" value={data.nbLignes} onChange={handleChange} />
            
            <div id="objectif-container">
                <h2>Vos Objectifs</h2>
                {objectifs.map((objectif) => (
                    <label key={objectif.id} style={{ marginRight: "10px" }}>
                        <input 
                            type="checkbox" 
                            checked={data.selectionObjectif.includes(objectif.id)}
                            onChange={() => handleCheckboxChange(objectif.id)}
                        />
                        {objectif.label}
                    </label>
                ))}
            </div>
        </section>
    );
}