import React, {useEffect, useImperativeHandle, useRef, useState } from 'react'
import { icons } from '../../assets/icons'
import { createPortal } from 'react-dom'

function ConfirmPopup(
  {
    title = "Are you sure",
    message,
    subtitle,
    confirm = "confirm",
    cancel = "cancel",
    critical = false,
    checkbox = false,
    actionFunction,
  }, ref
) {
  const [isChecked, SetIsChecked] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const dialog = useRef()

  useImperativeHandle(ref, ()=>{
    return{
      open(){
        setShowPopup(true)
      },
      close(){
        dialog.current?.close()
      }
    }
  })

  useEffect(()=>{
    if(showPopup){
      dialog.current.showModal()
    }
  },[showPopup])

  const handleClose = ()=>{
    dialog.current?.close()
    setShowPopup(false)
    actionFunction(false)
  }

  const handleConfirm = (event)=>{
    event.preventDefault()
    dialog.current?.close()
    actionFunction(true)
  }


  return (
    <div>
      {showPopup && 
        createPortal(
          <dialog ref={dialog} onClose={handleClose} className=''>
            <div>
              <div>
                <form 
                 onSubmit={handleConfirm}
                 className=''>
                  {/*Close Button */}
                  <div>
                    <button
                     autofocus
                     type = "button"
                     onClick= {handleClose}
                     className >
                      {icons.cross}
                    </button>
                  </div>
                  {/*Message Headers */}
                  <div>
                    <h6 className=''>{title}</h6>
                    {subtitle && <span>{subtitle}</span>}
                    {message && <span>{message}</span>}
                  </div>

                  {/*Checkbox field */}
                  {checkbox && (
                    <div>
                      <input
                       id={"confirm-checkbox"}
                       type="checkbox"
                       defaultChecked = {false}
                       className="size-4 mr-2"
                       onChange = {(e)=> SetIsChecked(e.target.checked)} />
                      <label 
                       htmlFor={"confirm-checkbox"}
                       className=" hover:cursor-pointer select-none">
                        {checkbox}
                      </label>
                    </div>
                  )}

                  {/*Control Buttons */}
                  <div>
                    <button
                     type='button'
                     onClick={handleClose}
                     className="border rounded-2xl px-4 py-3 hover:bg-green-400 dark:hover:bg-[#212121FF] hover:border-dashed"
                     >
                      {cancel}
                    </button>
                    <button
                     type='button'
                     disabled= {checkbox && !isChecked} // when the checkbox is true and the isCheckd is false then the confirm button will be disabled
                     className={`${
                      critical ? "dark:bg-[#212121] dark:text-red-500 bg-red-500 text-white " : "bg-[#ae7aff] text-white"
                      } px-4 py-3 border rounded-2xl enabled:hover:text-black enabled:hover:bg-red-500/80 font-semibold hover:border-dashed disabled:cursor-not-allowed`}
                    >
                      {confirm}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </dialog>,
          document.getElementById("popup-models")
        )}
    </div>
  )
}

export default React.forwardRef(ConfirmPopup)