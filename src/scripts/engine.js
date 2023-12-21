const state = {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById('score_points')
    },
    cardSprites:{
        avatar: document.getElementById('card-img'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type'),
    },
    fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card')
    },
    playerSides: {
        player1: "player-cards",
        player1Box: document.querySelector('#player-cards'),
        computer:"computer-cards",
        computerBox: document.querySelector('#computer-cards')
    },
    actions: {
        button: document.querySelector('#next-duel')
    }
}
const pathImagens ="./src/assets/icons/"


const cardData = [
    {
        id: 0,
        name: "blur eyes whitedragon",
        type: "Paper",
        img: `${pathImagens}dragon.png`,
        WinOf:[1],
        LoseOf:[2]
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImagens}magician.png`,
        WinOf:[2],
        LoseOf:[0]
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImagens}exodia.png`,
        WinOf:[0],
        LoseOf:[1]
    },
    {
        id: 3,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImagens}exodia.png`,
        WinOf:[0],
        LoseOf:[1]
    },
    {
        id: 4,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImagens}exodia.png`,
        WinOf:[0],
        LoseOf:[1]
    }
]



async function getRandomCardId()
{
    const randomIndex = Math.floor(Math.random()  * cardData.length)
    return cardData[randomIndex].id
}
async function createCardImage(IdCard,fieldSide)
{
    const cardImage = document.createElement("img")
    cardImage.setAttribute('height','100px')
    cardImage.setAttribute('src','./src/assets/icons/card-back.png')
    cardImage.setAttribute('data-id',IdCard)
    cardImage.classList.add("card")
    

    if(fieldSide === state.playerSides.player1)
    {
        cardImage.addEventListener('mouseover',()=>{
            console.log('ID: ' + IdCard)
            drawSelectCard(IdCard)
        })

        cardImage.addEventListener('click',()=>{
            setCardsField(cardImage.getAttribute("data-id"))
        })

    }
    return cardImage

}

async function setCardsField(cardId)
{
    await removeAllCardsImages()
    
    let computerCardId = await getRandomCardId()
    let duelResults = await checkDuelResults(cardId,computerCardId)

    state.fieldCards.player.style.display = "block"
    state.fieldCards.computer.style.display = "block"

    state.fieldCards.player.src = cardData[cardId].img
    state.fieldCards.computer.src = cardData[computerCardId].img

    
    await hiddenCardDetails()
    await updateScore()
    await drawButton(duelResults)

}

async function hiddenCardDetails()
{
    state.cardSprites.avatar.src = ""
    state.cardSprites.name.innerText = ""
    state.cardSprites.type.innerText = ""


}
async function checkDuelResults(playerCardId,computerCardId)
{
    let duelResults = "Empate"
    let playerCard = cardData[playerCardId]

    if(playerCard.WinOf.includes(computerCardId))
    {
        duelResults = "Ganhou"
        await playerAudio('win')
        state.score.playerScore++
    }
     if(playerCard.LoseOf.includes(computerCardId))
    {
        duelResults = "Perdeu"
        await playerAudio('Lose')

        state.score.computerScore++
        
    }
    return duelResults
    
    
   
    
}
async function updateScore()
{
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`
    console.log(`Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`)
}
async function drawButton(text)
{
    state.actions.button.innerText = text
    state.actions.button.style.display = "block"
    

}
async function removeAllCardsImages()
{
    let {player1Box,computerBox} = state.playerSides

    let imgElements = computerBox.querySelectorAll('img')

    imgElements.forEach((img) => img.remove())

  
    imgElements = player1Box.querySelectorAll('img')

    imgElements.forEach((img)=> img.remove())
}

async function resetDuel()
{
    state.cardSprites.avatar.src = ""
    state.actions.button.style.display = "none"

    state.fieldCards.player.style.display = "none"
    state.fieldCards.computer.style.display = "none"

    init()
}

async function playerAudio(status)
{
    const audio = new Audio(`./src/assets/audios/${status}.wav`)
    audio.play()
}

async function drawCards(cardNumbers,fieldSide)
{
    for(let i=0; i < cardNumbers; i++)
    {
        const randomIdCard = await getRandomCardId()
        const cardImage = await createCardImage(randomIdCard,fieldSide)
       
        document.getElementById(fieldSide).appendChild(cardImage)
    }
}
async function drawSelectCard(IdCard)
{  
    state.cardSprites.avatar.setAttribute('src',cardData[IdCard].img)
    //state.cardSprites.avatar.src = cardData[IdCard].img
    state.cardSprites.name.innerText = cardData[IdCard].name
    state.cardSprites.type.innerText = "Attribute : " + cardData[IdCard].type
}
function init()
{
    drawCards(5,state.playerSides.player1)
    drawCards(5,state.playerSides.computer)
   
    const bgm = document.querySelector('#bgm')
    bgm.play()
    
}
init()