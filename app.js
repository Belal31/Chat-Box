/*
location api
form submission
setinterval
settimeout
localstorage

array filter
array map/ foreach/ each/ for

onsubmit
*/

const urlparams = new URLSearchParams(window.location.search);
let user_name = urlparams.get('name');
user_name_html.innerHTML = user_name;
// console.log(user_name);

let users = [];
if(!localStorage.getItem('users') && user_name){
    users.push(user_name);
    localStorage.setItem('users',JSON.stringify(users));
}else{
    users = JSON.parse(localStorage.getItem('users'));
    
    if(!users.includes(user_name)){
        users.push(user_name);
        localStorage.setItem('users',JSON.stringify(users))
    }
   
}
users.forEach(name => {

    if (user_name !== name){
        chat_user_list.innerHTML += `
            <div onclick="select_chat_user(event)" data-name="${name}" class="user_box">
                <div class="img">
                    <img src="./img/man_image.png" alt="">
                </div>
                <div class="description">
                    <h3>${name}</h3>
                    <p>Lorem ipsum dolor sit.</p>
                </div>
            </div>
        `
    }
});

let selected_user = null;
function select_chat_user(event){
    // console.log(event.currentTarget.dataset.name);
       
    let name = event.currentTarget.dataset.name;
    remove_active_class();
    event.currentTarget.classList += ' activ';
    selected_user = name;
    render_chat_messages();
}

function remove_active_class(){
    document.querySelectorAll('.user_box').forEach(item =>{
        item.classList.remove('activ');
    })
  
}

    let chat_message_lists = []
    // {
    //     me: "Saddam",
    //     guest: "muaz",
    //     text: "ABCD EFG.",
    // }



    const send_text_form = document.getElementById("send_text_form")
    send_text_form.onsubmit = function(e){
    e.preventDefault();
    let text = e.target.text_box.value;
    // console.log(text);
    // chat_message_lists = JSON.parse(localStorage.getItem('chat_message_lists'));

    if(selected_user){
        let time = new Date().toLocaleTimeString();
        let date = new Date().toUTCString();
        date = date.substring(0,16);

        chat_message_lists.push({
            me: user_name,
            guest: selected_user,
            text: text,
            date: date + ' ' + time,
        });

        localStorage.setItem('chat_message_lists', JSON.stringify(chat_message_lists))

        render_chat_messages()
        e.target.text_box.value = '';
        // console.log(chat_message_lists);    
    }else{
        alert('Pleas Select a Person First');
    }
}

function render_chat_messages(){
    chat_message_lists = JSON.parse(localStorage.getItem('chat_message_lists'))
    
    message_list_group.innerHTML = '';
    chat_message_lists.forEach(item => {
        if(
            (item.guest == user_name && item.me == selected_user) ||
            (item.me == user_name && item.guest == selected_user)
        ){
            message_list_group.innerHTML += `
                <div class="single_message ${item.me == user_name? ' right' : ' left'} ">
                    <p class="text">${item.text}</p>
                    <p class="time">${item.date}</p>
                </div>    
            `
        }
    });

    message_list_group.scrollTo({
        top: message_list_group.scrollHeight,
        // left: 100,
        behavior: 'smooth'
    })
}

setInterval(() => {
    render_chat_messages();
}, 1000);