import logo from '../logo.svg';
import '../assets/styles/Products.sass';
import '../assets/styles/PopUp.sass';


const PopUp = (props: any) => {
  return (
    <div className='popup_bg' onClick={props.togglePopup}>
      <div className='popup_container'>

        {props.children}

      </div>
    </div>
  );
}

export default PopUp;