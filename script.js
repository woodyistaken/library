const myLibrary=[]

function Book(title,author,pages,read){
  this.title=title
  this.author=author
  this.pages=pages
  this.read=read
  this.id=crypto.randomUUID()
}
Book.prototype.toggleRead=function(){
  this.read=!(this.read)
}
Book.prototype.info=function(){
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read? "read":"not read yet"}`
}
function addBookToLibrary(title,author,pages,read){
  myLibrary.push(new Book(title,author,pages,read))
}
function removeBookFromLibrary(id){
  for(let i=0; i<myLibrary.length; i++){
    if(myLibrary[i].id==id){
      myLibrary.splice(i,1)
      return
    }
  }
}
function getBookFromLibrary(id){
  for(let i=0; i<myLibrary.length; i++){
    if(myLibrary[i].id==id){
      return myLibrary[i]
    }
  }
}
function display(){
  const list=document.querySelector("#bookList")
  list.innerHTML="";
  myLibrary.forEach((book)=>{
    li=document.createElement("li")
    li.textContent=book.info();
    deleteButton=document.createElement("button")
    deleteButton.setAttribute("data-id",book.id);
    deleteButton.textContent="Delete"
    deleteButton.addEventListener("click",(e)=>{
      id=e.target.getAttribute("data-id");
      removeBookFromLibrary(id);
      display()
    })
    toggleButton=document.createElement("button")
    toggleButton.setAttribute("data-id",book.id);
    toggleButton.textContent="Toggle Read"
    toggleButton.addEventListener("click",(e)=>{
      id=e.target.getAttribute("data-id");
      book=getBookFromLibrary(id);
      book.toggleRead()
      display()
    })
    li.appendChild(deleteButton)
    li.appendChild(toggleButton)
    list.appendChild(li)
  })
}
const submitButton=document.querySelector("#submitButton")
const title=document.querySelector("#title")
const author=document.querySelector("#author")
const pages=document.querySelector("#pages")
const read=document.querySelector("#read")
submitButton.addEventListener("click",()=>{
  addBookToLibrary(title.value,author.value,pages.value,read.checked)
  display()
})

const dialog=document.querySelector("dialog")
const closeButton=document.querySelector("#closeButton")
const showButton=document.querySelector("#showButton")
showButton.addEventListener("click",(e)=>{
  e.preventDefault();
  dialog.showModal();
})

closeButton.addEventListener("click",(e)=>{
  dialog.close();
})