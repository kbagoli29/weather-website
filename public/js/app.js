console.log("Client side running");

//Fetch is client side api function,there is  no fetch function in nodejs


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
var messageone = document.querySelector('#message-1');
var messagetwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    if (location=="")
    {
        console.log('Please provide the location');
    }
    else
    {
        messageone.textContent = 'Loading....';
        messagetwo.textContent='';
        // console.log(location);
        const url = '/weather?address='+location;
        fetch(url).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    messageone.textContent = data.error;
                }
                else
                {
                    messageone.textContent = data.location;
                    messagetwo.textContent = data.forecast;
                }
            });
        });
    }
    
    
});

