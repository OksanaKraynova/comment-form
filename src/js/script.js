const form = document.querySelector('.form')
const userName = document.querySelector('#user-name')
const comment = document.querySelector('#comment')
const date = document.querySelector('#date')
const commentList = document.querySelector('.wrapper__comments')
const formBtn = document.querySelector('.form__btn')

let today = new Date()

const renderComment = com => {
  let yesterday = new Date(),
    roomLastMessageDate = new Date(com.commentDate);

  yesterday.setDate(today.getDate() - 1);

  let time = roomLastMessageDate.toLocaleDateString('ru-RU') === today.toLocaleDateString('ru-RU') ? 'Сегодня' : roomLastMessageDate.toLocaleDateString('ru-RU') === yesterday.toLocaleDateString('ru-RU') ? 'Вчера' : roomLastMessageDate.toLocaleDateString('ru-RU')
   

  const css = com.like ? 'like red' : 'like'

  const newComment = `
    <div class="wrapper__comment comment" id='${com.id}'>
          <div class="comment__header">
            <div class="comment__author">
               <div class='comment__img'>
               <img src="https://allforchildren.ru/pictures/avatar_gravityfalls/gravity_falls03.jpg" alt="" />
               </div>
              <span>${com.nameValue}</span>
            </div>
            <div class="comment__delete">
            <button data-action='delete'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>    
          </button>
            </div>
          </div>
          <div class="comment__text">${com.commentValue}</div>
          <div class="comment__actions">
          <button data-action='like' class='comment__like'>
          <svg class='${css}' xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-heart" viewBox="0 0 16 16">
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg>
          </button>
          <buttton class='comment__share'>Поделиться</buttton>
          <p>${time} ${com.commentTime}</p>
          </div>
        </div>
    `
  commentList.insertAdjacentHTML('beforeend', newComment)
}
let comments = []

if (localStorage.getItem('comments')) {
  comments = JSON.parse(localStorage.getItem('comments'))
  comments.forEach(com => renderComment(com))
}


const saveToLocalStorage = () => {
  localStorage.setItem('comments', JSON.stringify(comments))
}

const handleForm = (e) => {
  e.preventDefault()
  const commentValue = comment.value
  const nameValue = userName.value
  const commentDate = date.value ? date.value : today.toLocaleDateString('en-EN')
  const commentTime = today.toLocaleTimeString('ru-RU')

  const newCom = {
    commentValue,
    nameValue,
    commentDate,
    like: false,
    id: Date.now(),
    commentTime
  }

  comments.push(newCom)

  saveToLocalStorage()

  renderComment(newCom)

  comment.value = ''
  userName.value = ''
  date.value = ''
}

const handleLike = e => {
  if (e.target.dataset.action !== 'like') return

  const currentItem = e.target.closest('.comment')
  const id = Number(currentItem.id)

  const com = comments.find(com => com.id === id)
  com.like = !com.like

  saveToLocalStorage()

  const likeIcon = currentItem.querySelector('.like')
  likeIcon.classList.toggle('red')
}

const deleteComment = e => {
  if (e.target.dataset.action !== 'delete') return

  const currentItem = e.target.closest('.comment')

  const id = Number(currentItem.id)
  comments = comments.filter(com => com.id !== id)

  saveToLocalStorage()
  currentItem.remove()
}

form.addEventListener('submit', handleForm)

commentList.addEventListener('click', handleLike)

commentList.addEventListener('click', deleteComment)