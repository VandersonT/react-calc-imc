/*----------------------------------Imports----------------------------------*/
import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import { Level, levels, calculateImc } from './helpers/imc';
import { GridItem } from './components/GridItem';
import leftArrowImage from './assets/leftarrow.png';
/*---------------------------------------------------------------------------*/

function App() {
  /*-------------------------------Variables-----------------------------------*/
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  /*---------------------------------------------------------------------------*/

  /*-------------------------------Functions-----------------------------------*/
  function handleCalculateButton(){
    if(heightField && weightField){
      setIsBlocked(true);
      setToShow(calculateImc(heightField, weightField));
      return;
    }
    alert('Digite todos os campos.')
  }
  function handleBackButton(){
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
    setIsBlocked(false);
  }
  /*---------------------------------------------------------------------------*/


  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input
            disabled={isBlocked}
            type="number"
            placeholder="Digite a sua altura. Ex: 1.5 (em mêtros)"
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
          />
          <input
            disabled={isBlocked}
            type="number"
            placeholder="Digite o seu peso. Ex: 75)"
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
          />

          <button disabled={isBlocked} onClick={handleCalculateButton}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key)=>(
                <GridItem key={key} item={item}/>
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25}/>
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App
