import Head from 'next/head'
import s from '../../styles/page/Vmail.module.css'
import Mobile from '../../layout/mobile'
import React, { useEffect, useState } from 'react'
import ImageBlur from '../../components/image/blur'

import { set, get, del } from '../../hooks/localStorage';
import { findAnggota, findRoom, checkRoomPass } from '../../api/index';
import { useRouter } from 'next/router';

const VmailNoValid = () => {
  return(
    <React.Fragment>
      <Head>
        <title>Page Email Validate</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Mobile>
        <span>404</span>
      </Mobile>
    </React.Fragment>
  );
}

const Vmail = () => {  

  const router = useRouter();  

  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [pw, setPw]     = useState(false);

  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  useEffect(()=>{
    const tmpget = get("Room");        
    if(tmpget === null){
      setRoom(null);
      setName(null);
    }
    else{
      const tmp = JSON.parse(tmpget);
      setRoom(tmp.room);
      setName(tmp.nama);
    }
    setPw(()=>{return get("PasswordRoom")}); //-> isinya true or false
  },[]);

  const atClick = async () => {

    let rom = false;
    let ang = null;

    if(pw === true){
      rom = await checkRoomPass({codeRoom:room, password:pass});    
    }    

    ang = await findAnggota(room, mail); 
    
    //condition at true
    if(ang.message === undefined && rom === true)  {      
      set("Anggota", ang);      
      router.push({
        pathname: '/page/[room]',
        query : {room : room}
      });
    }

  }    

  if(room === undefined || room === null){
    return VmailNoValid();
  }
  else{    
    return(
      <React.Fragment>
        
        <Head>
          <title>Page Email Validate</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
  
        <Mobile>
            
          <div className={s.container}>
            <div className={s.icon}>
              <ImageBlur src={"/pemilo.svg"} ></ImageBlur>
            </div>
            <div className={s.title}>
              <p>kamu sudah masuk room</p>
            </div>
            <div className={s.instruction}>
              <p className={s.medium}>{name}</p>
              <p>di tahap ke <b> dua </b> kamu harus memasukan <b> email </b> yang kamu daftarkan kepada <b> panitia </b> sebelum <b> room </b> dimulai</p>
            </div>
            <div className={s.column}>
  
              <input onChange={(e)=>{setMail(e.target.value)}} type="email" name="mail" id="Rmail" className={s.input} placeholder="Email address"/>
              
              {(pw === true) ? <input onChange={(e)=>{setPass(e.target.value)}} type="password" name="pass" id="Rpass" className={s.input} placeholder="Password Room"/>  : null}
  
              <input onClick={()=>{atClick()}} type="button" value="lanjut" className={s.btn}/>
  
            </div>
          </div>
  
        </Mobile>
  
      </React.Fragment>
    )
  }


    
  }


export default Vmail;