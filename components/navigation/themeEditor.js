
import { useControls } from 'leva'

export default function ThemeEditor() {
  
    const { myValue } = useControls({ myValue: 10 })


  const theme = {
    background:{
      dark:'black',
      light:'white'
    }
  }


  return (
    <div className="fixed z-50 flex justify-between w-full p-3">
        <button className="px-3 py-3 text-xs text-white uppercase bg-orange-500 rounded-lg">
            Contact
        </button>
        <div>Hey, I'm {myValue}</div>


    </div>
   
  );
}
