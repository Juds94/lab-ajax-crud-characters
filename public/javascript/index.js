const charactersAPI = new APIHandler(' https://minions-api.herokuapp.com/characters');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    event.preventDefault()

    charactersAPI
      .getFullList()
      .then(response => {
        let text = ''
        response.data.forEach(eachCharacter => text += `Name: ${eachCharacter.name} Id:${eachCharacter.id} Occupation: ${eachCharacter.occupation} Weapon: ${eachCharacter.weapon}`)
        document.querySelector('.character-info').innerHTML = text
      })
      .catch(err => console.log(err))


  })

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    event.preventDefault()

    const characterId = document.querySelector('#fetch-by-id').value


    charactersAPI
      .getOneRegister(characterId)
      .then(response => {
        let text = `${response.data.name} ${response.data.occupation} ${response.data.weapon}`
        document.querySelector('.character-info').innerHTML = text
      })


  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

    event.preventDefault()

    const characterId = document.querySelector('#delete-just-one').value

    charactersAPI
      .deleteOneRegister(characterId)
      .then(() => console.log('ELIMINADO'))
      .catch(err => console.log(err))
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#edit-character-form input')

    const characterData = {
      ID: inputs[0].value,
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value
    }

    charactersAPI

      .updateOneRegister(characterData.ID, characterData)
      .then(response => {
        if (response.data) {
          document.querySelector('#send-data-updated').classList.add('green')
        }
      })
      .catch(err => {
        console.log(err)
        document.querySelector('#send-data-updated').classList.add('red')
      })

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#new-character-form input')

    const characterData = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    }

    charactersAPI

      .createOneRegister(characterData)
      .then(response =>{
        if (response.data){
          document.querySelector('#send-data').classList.add('green')
        } else{
          document.querySelector('#send-data').classList.add('red')
        }
        console.log(response.data)
      })
      .catch(err=> console.log(err))


  });
});
