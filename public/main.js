const root = document.querySelector('#root'),
lists = document.querySelector('.lists'),
box = document.querySelector('#box'),
text = document.querySelector('.text'),
boxLabel = document.querySelector('.boxLabel'),
arrow = document.querySelector('.arrow'),
child = document.querySelector('.lists'),
addForm = document.querySelector('#addForm'),
deleteForm = document.querySelector('#deleteForm');

function mounted () {
    fetch('api/select').then(resp => resp.json()).then(data => {
        let child = ''
        data.forEach(val => {
            child += `<span class="list-group-item list-group-item-action list-group-item-light" id=${val._id}>${val.label}</span>`
        })
        lists.innerHTML = child;
        localStorage.setItem('data',JSON.stringify(
            {data:data.reduce((aggr,val) => aggr.label.length > val.label.length ? aggr: val)}))
    })
}

box.addEventListener('click',() => openSelect());

let selectId = JSON.parse(localStorage.getItem('data')).data._id;

child.addEventListener('click',(e) => {

    if(lists.style.opacity === '1'){
        if(boxLabel.style.top !== '5px'){
            boxLabel.style.color = 'hsl(218deg 42% 52%)';
            boxLabel.style.top = '5px';
        }

        const elem = document.getElementById(selectId);
        elem.style.color = '#636464';

        if (e.target.innerText.length <= JSON.parse(localStorage.getItem('data')).data.label.length) {
            text.innerText = e.target.innerText
        } else {
            location.reload();
            alert('Select only one element')
        }

        console.log({_id:e.target.id,label:e.target.innerText});
        selectId = e.target.id
        e.target.style.color = 'hsl(218deg 42% 52%)'
        lists.style.opacity = '0';
        arrow.style.transform = 'rotate(0deg)';
        arrow.style.bottom = '-5px'
    }
})

root.addEventListener('contextmenu',(e) => {
    e.preventDefault();
    lists.style.opacity = '0';
    if(text.innerText === ''){
        boxLabel.style.color = 'black';
        boxLabel.style.top = '24px';
    }
    arrow.style.bottom = '-5px'
    arrow.style.transform = 'rotate(0deg)';
})

const openSelect = () => {
    boxLabel.style.color = 'hsl(218deg 42% 52%)';
    boxLabel.style.top = '5px';
    boxLabel.style.transition = ' all 0.3s linear';
    lists.style.opacity = '1';
    arrow.style.transform = 'rotate(-180deg)';
    arrow.style.bottom = '5px'
}

const closedSelect = () => {
    if(text.innerText !== ''){
        boxLabel.style.color = 'hsl(218deg 42% 52%)';
        boxLabel.style.top = '5px';
    } else {
        boxLabel.style.color = 'black';
        boxLabel.style.top = '24px';
        arrow.style.bottom = '-5px'
    }
    lists.style.opacity = '0';
    arrow.style.transform = 'rotate(0deg)';
}

const clearSelect = () => {
    text.innerText = '';
    const elem = document.getElementById(selectId);
    elem.style.color = '#636464';
    closedSelect();
}

function axios(url,method,body)
{
    fetch(url,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
}
let loading = false;
addForm.addEventListener('change',(e) => {
    setTimeout(() => {
        loading = true;
        axios('/api/select','POST',{label:e.target.value})
        loading = false;
        mounted();
        alert('option successfully added')
    },2000)
})

deleteForm.addEventListener('change',(e) => {
    setTimeout(() => {
        axios('/api/select','DELETE',{label:e.target.value})
        mounted();
        alert('option successfully added')
    },2000)
})

mounted();