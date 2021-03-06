import illustrationImg from "../Assets/images/illustration.svg"
import logoImg from "../Assets/images/logo.svg"
import googleIconImg from "../Assets/images/google-icon.svg"
import googleIconImgDark from "../Assets/images/google-icon-dark.svg"
import {useHistory} from 'react-router-dom';
import '../Styles/Auth.scss'
import { Button } from "../Components/Button"

import { useAuth } from "../Hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../Services/Firebase";
import { useTheme } from "../Hooks/useTheme";
import {DarkModeToggleComponent} from "../Components/DarkModeToggle";

 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDoorOpen } from '@fortawesome/free-solid-svg-icons' 



export function Home (){

   const getTheme = sessionStorage.getItem("Theme");
    const history = useHistory()
    const {user, signInWithGoogle} = useAuth()
    const {theme, toggleTheme} = useTheme();
    
    const [ roomCode, setRoomCode] = useState('')

    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle()
        }
        history.push(`/rooms/new`);
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Room does not exist.');
            return;
        }

        if(roomRef.val().endedAt){
            alert('Room already closed.');
            return;
        }


        history.push(`/rooms/${roomCode}`)
    }

    return(
        <div id="page-auth" className={theme}>
            <aside>
            <DarkModeToggleComponent/>
                <img src={illustrationImg} alt="Ilustração simbolizando Perguntas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="logo" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={getTheme === "light" ? googleIconImg : googleIconImgDark } alt="Logo da Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                            onChange={event=> setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">  <FontAwesomeIcon className={"awesomeIcon"} icon={faDoorOpen} /> Entrar na Sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}