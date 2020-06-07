const form = document.querySelector('form');
const list = document.querySelector('.list-group');
const input = document.querySelector('.mainInput');
const addBtn = document.querySelector('.addBtn');
const log = document.querySelector('.log');

// "Store" items like in DB
const randomID = () => Math.floor(Math.random() * 10000);
let items = [
    {
        id: randomID(),
        text: 'Item 1',
    }
];

// Track form submission
let formStatus = 'add';

// Item HTML
const generateItem = item => {
    const div = document.createElement('div');
    div.setAttribute(
        'class',
        `list-group-item list-group-item${item.id}`
    );
      
    div.id = item.id;
    const span = document.createElement('span');
    span.setAttribute('class','text');
    span.innerText = item.text;
    const div2 = document.createElement('div');
    const editButton = document.createElement('button');
    editButton.setAttribute(
        'class',
        'btn editBtn'
    );
    editButton.setAttribute('onClick',`editItemName(${item.id})`);
    editButton.innerText = 'Edit';
    const delButton = document.createElement('button');
    delButton.setAttribute('class', 'btn delBtn');    
    delButton.innerText = 'Delete';
    div2.appendChild(editButton);
    div2.appendChild(delButton);
    div.appendChild(span);
    div.appendChild(div2);
    return div;
}

// Read
function showItems() {
    list.innerHTML = '';
    items.forEach(item => {
        list.appendChild(generateItem(item));
    });    
}
showItems();

function checkItem(){       
   if(document.querySelector('.list-group').children.length === 0){
    log.innerHTML = 'Empty list';
   }
}

// Create
function addItem(item) {    
    const newItem = {
        id: randomID(),
        text: item
    }       
    const animation = document.querySelector(`.list-group-item${newItem.id}`);    
    
    items.unshift(newItem);
    setTimeout(()=>{
        document.querySelector(`.list-group-item${newItem.id}`).classList.remove('animationScroll');
        log.innerText = '';
    },850);
    input.value = '';
    showItems();
    log.innerText = `Item '${item}' was added.`;
    document.querySelector(`.list-group-item${newItem.id}`).classList.add('animationScroll');        
    animation.classList.add('animationScroll');    
}

// Update 
window.addEventListener('click', e => {
    if(e.target.classList.contains('editBtn')) {
        const item = e.target.parentNode.parentNode;
        const id = item.id;
        const text = item.firstChild.innerText;
        input.value = text;
        input.id = id;
        formStatus = 'update';
        addBtn.innerText = 'Update';
    }
});


function editItemName(id){
    document.getElementById(`${id}`).style.opacity = '0.5';    
}


// Update item
function updateItem(item) {
    
    items.forEach(itemObj => {
        if(Number(itemObj.id) === Number(item.id)) {
            itemObj.text = item.text;            
        }
    });
    log.innerText = `Item '${item.text}' was renamed.`;
    setTimeout(()=>{
        log.innerText = '';
    },1500);
    // Reset form
    input.value = '';
    formStatus = 'add';
    addBtn.innerText = 'Add';
    showItems();    
}

// Sumbit form
form.addEventListener('submit', e => {
    e.preventDefault();
    if(formStatus === 'add' && input.value !== '') {
        addItem(input.value);
        showItems();         
    }
    if(input.value === '') {
        log.innerHTML = 'Please, enter something';
        
        setTimeout(()=>{
            log.innerHTML = '';
            checkItem();
        },800);
    }
    if(formStatus === 'update' && input.value !== '') {
        updateItem({id: input.id, text: input.value});
    }
});

// Delete 
window.addEventListener('click', e =>{    
    if(e.target.classList.contains('delBtn')) {
        
        const item = e.target.parentNode.parentNode;
        const id = item.id;
        document.querySelector(`.list-group-item${id}`).classList.add('delElement');
        setTimeout(()=>{
            items = items.filter(itemObj => Number(itemObj.id) !== Number(id));
            showItems();
        },500);
        
        log.innerText = `Item was deleted.`;
        setTimeout(()=>{
        log.innerText = '';
        checkItem();
        },800);
    }    
});

