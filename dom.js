//  in DOM Mainpulation check assignment_13_and_14      in this when we refresh our page data would disappear 
// (one solution by local storage we did in 3_hours_js_project and second solution we are going to do in this task by network using axios)


//  it contains solution of task_21 and task_22



document.getElementById('btn').addEventListener('click', registerUser);
// document.getElementById('btn').addEventListener('click', appendInList);




function registerUser(e){

    e.preventDefault();

    
    const name = document.getElementById('name').value
    const mail = document.getElementById('mail').value
    const phone = document.getElementById('phone').value
    const date = document.getElementById('date').value
    const time = document.getElementById('time').value


    let myObj = {
        'name' : name,
        'mail' : mail,
        'phone' : phone,
        'date' : date,
        'time' : time
    }





    axios.post('https://crudcrud.com/api/88bf82b0d092422d9cfd242912cb003c/bookingappointmentdata', myObj)
    .then((response) => {
        console.log(response)
        appendInList(response.data); 
    })
    .catch((err) => console.log(err))



    

    

    
    
}





function appendInList(myObj){

    
    // creating list-item
    let new_ele = document.createElement('li')
    new_ele.className = 'list-item';
    
    // creating text of list-item
    let textNode =  document.createTextNode(JSON.stringify(myObj));
    

    // appendChild works on node

    // creating delete button of list-item
    let delBtn = document.createElement('input')
    delBtn.type = 'button';
    delBtn.value = 'DELETE';
    delBtn.style.background = 'red';
    
    delBtn.onclick = () => {
        // localStorage.removeItem(mail)
        document.getElementById('list').removeChild(new_ele);


        
        const url = 'https://crudcrud.com/api/88bf82b0d092422d9cfd242912cb003c/bookingappointmentdata' + '/' + myObj._id

        axios.delete(url)
        .then(() => console.log('deleted'))
        .catch((err) => console.log('Error : ',err))

    }




    // creating edit button
    editBtn = document.createElement('input');
    editBtn.type = 'button';
    editBtn.value = 'EDIT';
    editBtn.style.background = 'lightblue';

    editBtn.onclick = () =>{



        const url = 'https://crudcrud.com/api/88bf82b0d092422d9cfd242912cb003c/bookingappointmentdata' + '/' + myObj._id

        axios.get(url)
        .then((res) => {
            document.getElementById('name').value = res.data.name;
            document.getElementById('mail').value = res.data.mail;
            document.getElementById('phone').value = res.data.phone;
            document.getElementById('date').value = res.data.date;
            document.getElementById('time').value = res.data.time;

            axios.delete(url)
            .then(() => console.log('previous deleted, please update and resend'))
            .catch((err) => console.log(err))

            console.log(res.data)


        })
        .catch((err) => console.log(err))

    


        document.getElementById('list').removeChild(new_ele);


    }


    new_ele.appendChild(textNode)
    new_ele.appendChild(delBtn);
    new_ele.appendChild(editBtn);
    document.getElementById('list').appendChild(new_ele);




}









    // to avoide to disappear data when refresh using axios (using local storage we already did in 3_hourse_js_project)

window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/88bf82b0d092422d9cfd242912cb003c/bookingappointmentdata')
    .then((response) => {
        console.log(response)
        for(var i=0; i<response.data.length;i++){
            appendInList(response.data[i]); 
        }
    })
    .catch((err) => {
        console.log(err)
    })



    // const data = axios.get('https://crudcrud.com/api/88bf82b0d092422d9cfd242912cb003c/bookingappointmentdata')
    // .then((response) => {
    //     console.log(response)
    //     for(var i=0; i<response.data.length;i++){
    //         appendInList(response.data[i]); 
    //     }
    // })
    // .catch((err) => {
    //     console.log(err)
    // })

    // console.log(data)                      //      it will return   Promise {<pending>}  (we will get promise)

})


























//  in assignment 13 i forgot to remove item from localstorage on github code but now it is corrected in delBtn.onclick = ()  this bracket should be empty