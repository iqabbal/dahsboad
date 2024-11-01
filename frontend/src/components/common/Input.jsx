
const Input = ({label , placeHolder , value , setValue, type}) => {
    return (
      <div className='flex w-[283px] h-[70px] '>
        <span>H</span>
        <input placeholder={placeHolder} type={type}  value={value} onChange={(e)=>{setValue(e.target.value)}} className='h-[40px] w-full border-1 border-[##D9D9D9] rounded-lg '/>
      </div>
    )
}

export default Input 
