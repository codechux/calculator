import { useState } from "react";
import Container from "./components/Container";
import Screen from "./components/Screen"
import BtnContainer from "./components/BtnContainer"
import Btn from "./components/Btn"


const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) =>
    String(num).replace( /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1" );

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

function App() {
  let [cal, setCal] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if(removeSpaces(cal.num).length < 16) {
      setCal({
        ...cal,
        num:
        cal.num === 0 && value === "0" ? "0" :removeSpaces(cal.num) % 1 === 0
        ? toLocaleString(Number(removeSpaces(cal.num + value)))
        : toLocaleString(cal.num + value),
        res: !cal.sign ? 0 : cal.res,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCal({
      ...cal,
      num: !cal.num.toString().includes(".") ? cal.num + value : cal.num,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value =e.target.innerHTML;

    setCal({
      ...cal,
      sign: value,
      res: !cal.res && cal.num ?cal.num : cal.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if(cal.sign && cal.num) {
      const math = (a, b, sign) =>
      sign === "+" ? a + b : sign === "-" ? a - b : sign === "X" ? a * b : a / b;

      setCal({
        ...cal,
        res:
        cal.num === "0" && cal.sign === "/" ? "Can't divide with 0" : toLocaleString(
          math(
            Number(removeSpaces(cal.res)),
            Number(removeSpaces(cal.num)),
            cal.sign
            )
        ),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCal({
      ...cal,
      num: cal.num ? toLocaleString(removeSpaces(cal.num) * -1) : 0,
      res: cal.num ? toLocaleString(removeSpaces(cal.num) * -1) : 0,
      sign: "",
    });
  };

  const percentageClickHandler = () => {
    let num = cal.num ? parseFloat(removeSpaces(cal.num)) : 0;
    let res = cal.res ? parseFloat(removeSpaces(cal.res)) : 0;

    setCal({
      ...cal,
      num:(num /= Math.pow(100, 1)),
      res:(res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCal({
      ...cal,
      sign: "",
      num: 0,
      res: 0,

    });
  };

  return (
    <div className="App">
      <Container>
        <Screen value={cal.num ? cal.num : cal.res}/>
        <BtnContainer>
          {
            btnValues.flat().map((button, i) => {
              return (
          <Btn  key={i} className={button === "=" ? "equals" : ""} value={button} onClick={ button === "C" ? resetClickHandler
                           : button === "+-" ? invertClickHandler
                           : button === "%" ? percentageClickHandler
                           : button === "=" ? equalsClickHandler
                           : button === "/" || button === "X" || button === "-" || button === "+" ? signClickHandler
                           : button === "." ? commaClickHandler
                           : numClickHandler
            
          }/>);
        })
        }
        </BtnContainer>
      </Container>
      
    </div>
  );
}

export default App;
