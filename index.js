let myArray=[]
let tempArr=[]
const textData=document.querySelector('#text-box')
const btnSave=document.querySelector('#save-btn')
const btnDel=document.querySelector('#delete-btn')
const btnTab=document.querySelector('#tab-btn')
const btnDelOne=document.getElementById('delete-one-btn')
const listUrls=document.querySelector('#list-urls')

//getting object from local storage
const urlsFromStorage=JSON.parse(localStorage.getItem("myUrls"))

//when page is reloaded
if(urlsFromStorage){
    myArray=urlsFromStorage
    displayList(myArray)
}
//function for displaying the URLs
function displayList(arr)
{
    let listItems=""
for(let i=0; i<arr.length; i++)
{
//a template string
listItems+=`<li>
<a target="_blank" href="${arr[i]}" >
${arr[i]}
</a>
</li>
`
}
listUrls.innerHTML=listItems
}

//function for displaying only the list while deletion
function displayOnlyList(arr) 
{
let listItems=""
for(let i=0; i<arr.length; i++){
listItems+=`<li>
${arr[i]}
</li>
`
}
listUrls.innerHTML=listItems
}
//function for displaying text from input box
btnSave.addEventListener("click", function(){
    myArray.push(textData.value)
    textData.value=""
    //Saving URLs to local storage
    localStorage.setItem("myUrls", JSON.stringify(myArray))
    displayList(myArray)
})
//function for displaying the current tab URL
btnTab.addEventListener("click",function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myArray.push(tabs[0].url)
         //Saving URLs to local storage
        localStorage.setItem("myUrls", JSON.stringify(myArray))
        displayList(myArray)
        })   
})
//function for deleting all the items at once
btnDel.addEventListener("click", function() {
    if(confirm("This action will remove all of the saved inputs!")){
    localStorage.clear()
    myArray=[]
    displayList(myArray)
    }
})
//function for deleting a single list item
btnDelOne.addEventListener("click",function()
{
btnDelOne.style.background="darkred"
displayOnlyList(myArray)
tempArr=[]
let items=document.querySelectorAll('li')

 for(let i=0; i<items.length; i++)
    tempArr.push(items[i].innerHTML)
    
for(let i=0; i<items.length; i++)
{
    items[i].onclick=function(){ 
        let index=tempArr.indexOf(this.innerHTML)
        tempArr.splice(index,1)
        myArray=tempArr
        displayList(myArray)
        btnDelOne.style.background='rgb(176, 42, 42)'
        btnDelOne.style.borderBlockColor='rgb(176, 42, 42)'
        localStorage.setItem("myUrls", JSON.stringify(myArray))
    } 
}
})
//function incase enable delete is pressed and if user wants it to get disabled
btnDelOne.addEventListener("dblclick",function()
{
    displayList(myArray)
    btnDelOne.style.background='rgb(176, 42, 42)'
    btnDelOne.style.borderBlockColor='rgb(176, 42, 42)'
})