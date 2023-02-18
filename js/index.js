let localStorageKey = 'history';
let currentHistory = [];
let inputField = '#calc-input';

window.onload = () =>
{
    clearInput();

    let clearInputButton = document.querySelector('#calc-clear-input-btn')
    clearInputButton.addEventListener('click', clearInput);

    let clearHistoryButton = document.querySelector('#history-btn')
    clearHistoryButton.addEventListener('click', clearHistory);

    loadDataFromLocalStorage();

    addClickEventToCalcButtons();
}


function writeHistoryInLocalStorage(history)
{
    localStorage.setItem(localStorageKey, history);
}


function loadDataFromLocalStorage()
{
    let data = localStorage.getItem(localStorageKey);
    if(data)
    {
        data.split(',').forEach(set =>
        {
            currentHistory.push(set);
            createHistory(set);
        })
    }
}


function createHistory(data)
{
    let label = document.createElement('label');
    label.setAttribute('id', 'history-label');
    label.innerHTML = data;
    let history = document.querySelector('#history-main')
    history.append(label);
    history.scrollTop = history.scrollHeight;
}


function addClickEventToCalcButtons()
{
    let calcButtonsParent = '#calc-main';
    let childs = document.querySelector(calcButtonsParent).childNodes;
    childs.forEach(child =>
    {
        child.addEventListener('click', writeToInput);
    })
}

function isInputValid(currentInput, value)
{
    let params = ['*', '/', '-', '+', '=', '.']
    if(currentInput.length === 0)
    {
        if(params.includes(value))
        {
            return false;
        }
    }

    if(params.includes(currentInput.charAt(currentInput.length -1)))
    {
        if(params.includes(value))
        {
            return false;
        }
    }

    return true;
}

function writeToInput(event)
{
    let value = event.target.innerHTML;
    let calcInput = document.querySelector(inputField);
    let currentInput = calcInput.innerHTML;

    if(!isInputValid(currentInput, value))
    {
        return;
    }

    if(value === '=')
    {
        let result = `${currentInput}=${eval(currentInput)}`;
        createHistory(result);
        currentHistory.push(result);
        writeHistoryInLocalStorage(currentHistory);
        clearInput();
    }
    else
    {
        calcInput.innerHTML = currentInput + value;
    }
}


function clearInput()
{
    document.querySelector(inputField).innerHTML = '';
}


function clearHistory()
{
    localStorage.removeItem(localStorageKey);
    document.querySelector('#history-main').innerHTML = '';
}