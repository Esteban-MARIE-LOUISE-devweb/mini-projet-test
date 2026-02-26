import React from "react";

const coef: Record<string, {label: string; min: number; max: number}> = {
  sedentaire: {label:"Sedentaire", min: 0.8, max: 1},
  endurance: {label:"Endurance", min: 1.2, max: 1.6},
  conservation: {label:"Conservation", min: 1.6, max: 1.8},
  masse:{label:"Masse", min: 1.8, max: 2.2}
};
interface TableauProps {
  parametres: {
    poidsMin: number;
    poidsMax: number;
    nbLignes: number;
    selectionObjectif: string[];
  };
}
export default function Tableau({parametres}: TableauProps){
  const {poidsMin, poidsMax, nbLignes, selectionObjectif} = parametres;
  const lignesPoids: number[] = [];
  const pas = nbLignes > 1 ? (poidsMax - poidsMin) / (nbLignes - 1) : 0;
  for (let i = 0; i < nbLignes; i++) {
    lignesPoids.push(poidsMin + pas * i);
  }
  if (selectionObjectif.length === 0) {
    return <p>Veuillez sélectionner au moins un objectif dans le formulaire.</p>;
  }
  return (
    
    <div className="tableau-container">
      <h2>Tableau des besoins en protéines</h2>
      <table>
      <thead>
        <tr>
          <th>Poids</th>
          {selectionObjectif.map((objectif) => (
            <th key={objectif}>{coef[objectif].label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignesPoids.map((poids, index) => (
          <tr key={index}>
            <td>{poids.toFixed(1)} kg</td>
            {selectionObjectif.map((objectif) =>{
              const besoin_min = coef[objectif].min * poids;
              const besoin_max = coef[objectif].max * poids;
              return (
                <td key={objectif}>
                {besoin_min.toFixed(1)} - {besoin_max.toFixed(1)} g/jour
                </td>)}
              )
            }
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  )
}
