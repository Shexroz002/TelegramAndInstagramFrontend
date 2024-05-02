import Main from "../Companents/Main/Main"
import Theme from "../Companents/Main/Theme"
import Navbar from "../Companents/Navbar/Navbar"
import '../Companents/style.css'
import { useState } from "react"
export default function Home(){
    const [opentheme,setopentheme]=useState(false)
    function openthemefun(){
        setopentheme(prev=> !prev)
    }
    return(
        <>
        <Navbar/>
        <Main opentheme={openthemefun}/>
        <Theme openshow={opentheme} showTeheme={openthemefun}  />
         </>
    )
       
        
}