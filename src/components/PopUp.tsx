import logo from '../logo.svg';
import '../styles/Products.sass';
import '../styles/PopUp.sass';


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