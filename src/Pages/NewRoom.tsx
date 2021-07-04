import illustrationImg from "../Assets/images/illustration.svg"
import logoImg from "../Assets/images/logo.svg"
import googleIconImg from "../Assets/images/google-icon.svg"
import {FormEvent, useState} from 'react';

import '../Styles/Auth.scss'
import { Button } from "../Components/Button"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../Hooks/useAuth"
import { database } from "../Services/Firebase";

export function NewRoom (){
    const {user} = useAuth()
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom (event: FormEvent){
        event.preventDefault();

        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title:newRoom,
            authId: user?.id,
        })

        history.push(`/admin/rooms/${firebaseRoom.key}/${user?.id}`)
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando Perguntas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="logo" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">Criar Sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente ? <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}