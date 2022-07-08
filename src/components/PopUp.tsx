import '../assets/styles/Products.sass';
import '../assets/styles/PopUp.sass';
import { useEffect } from 'react';


const PopUp = (props: any) => {

  useEffect(() => {
    setTimeout(function() { //Start the timer
      props.closePopup();
    }.bind(this), 5000);
  }, []);

  return (
    <div className='popup_bg' onClick={props.closePopup}>
      <div className='popup_container'>

        {props.error}

      </div>
    </div>
  );
}

export default PopUp;