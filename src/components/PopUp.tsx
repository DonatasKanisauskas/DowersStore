import '../assets/styles/Products.sass';
import '../assets/styles/PopUp.sass';
import { useEffect, useState } from 'react';


const PopUp = (props: any) => {
  let timer: any = null;
  let time = 0
  const [opacity, setOpacity] = useState({ opacity: 1 });

  useEffect(() => {
    timer = setInterval(popupTime, 500);
  }, []);

  const popupTime = () => {
    time++;
    if (time === 6) {
      setOpacity({ opacity: 0 });
    }
    if (time > 9) {
      window.clearInterval(timer);

      // FIXME: doesnt completely stop component
      props.closePopup();
    }
  };

  return (
    <div className='popup_container' style={opacity}>

      <p className='popup_text'>{props.error}</p>
      <button className='popup_button' onClick={props.closePopup}>x</button>

    </div>
  );
}

export default PopUp;