import { useHistory, useParams } from 'react-router-dom'
import Modal from 'react-modal';
import {Fragment} from 'react'

import logoImg from '../Assets/images/logo.svg';
import deleteImg from '../Assets/images/delete.svg';
import checkImg from '../Assets/images/check.svg';
import answerImg from '../Assets/images/answer.svg';
import ConversationAnimation from "../Assets/loties/conversationLottie/ConversationAnimation"


import { Button } from '../Components/Button';
import { Question } from '../Components/Question/Index';
import { RoomCode } from '../Components/RoomCode';

import { useRoom } from '../Hooks/useRoom';
import { database } from '../Services/Firebase';

import '../Styles/Room.scss';
import '../Styles/Modal.scss';
import { useState } from 'react';
import { DarkModeToggleComponent } from '../Components/DarkModeToggle';
import Swal from "sweetalert2";


type RoomParams = {
  id: string;
  //authid: string;
}

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory()
  const params = useParams<RoomParams>();
  const roomId = params.id;

  //const [questionIdModalOpen, setQuestionIdModalOpen] = useState<string | undefined>();

  const { title, questions } = useRoom(roomId)
/* 
  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  } */

  function ModalCloseRoom() {

    const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  
  swalWithBootstrapButtons
    .fire({
        title: "Encerrar sala",
        text: "Tem certeza que você deseja encerrar a sala ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, Encerrar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
    })
    .then((result) => {
        if (result.isConfirmed) {
           database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
          })       
            swalWithBootstrapButtons.fire(
                "Sala Encerrada",
                "Esta sala foi encerrada !",
                "success"
            );
            history.push('/');
        
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                "Cancelada",
                "Você desistiu de excluir esta Sala :)",
                "error"
            );
        }
    });
  }

  
function ModalDelete(questionId: string) {

  const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

swalWithBootstrapButtons
  .fire({
      title: "Excluir Pergunta",
      text: "Tem certeza que você deseja excluir esta pergunta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, Excluir",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
  })
  .then((result) => {
      if (result.isConfirmed) {
           database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
          swalWithBootstrapButtons.fire(
              "Pergunta Excluida",
              "Sua Pergunta foi Deletada.",
              "success"
          );

      
      } else if (
          result.dismiss === Swal.DismissReason.cancel
      ) {
          swalWithBootstrapButtons.fire(
              "Cancelada",
              "Você cancelou a exclusão da pergunta :)",
              "error"
          );
      }
  });
}
/*   async function handleDeleteQuestion(questionId: string) {
     if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    } 
  } */

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={ModalCloseRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>
      <DarkModeToggleComponent/>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>
        {questions.length === 0 && 
          <div className="loties_question_zero">
            <ConversationAnimation/>
            <h1>Nenhuma pergunta por aqui ...</h1>
            <p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
          </div>
          }

        <div className="question-list">
          {questions.map(question => {
            return (
              <Fragment>
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleCheckQuestionAsAnswered(question.id)}
                      >
                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Dar destaque à pergunta" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={()=> ModalDelete(question.id)}//setQuestionIdModalOpen(question.id)}
                    /* onClick={() => handleDeleteQuestion(question.id)} */
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
{/*                 <div className="">
                      <Modal 
                      isOpen={questionIdModalOpen === question.id}
                      onRequestClose={() => setQuestionIdModalOpen(undefined)}
                    >
                        Hello 
                        <button onClick={()=> handleDeleteQuestion(question.id)}>Deletar</button>
                        <button onClick={()=> setQuestionIdModalOpen(undefined)}>Fechar</button>
                    </Modal>

                </div> */}
                  </Fragment>
            );
          })}
        </div>
      </main>
    </div>
  );
}