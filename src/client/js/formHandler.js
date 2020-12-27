function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('url').value;

    if(Client.checkForUrl(formText)){
    console.log("::: Form Submitted :::")
    postApi('http://localhost:8082/postapi', {formText})

    .then(function(res) {
      console.log(res);
        document.getElementById('irony').innerHTML = res.irony;
        document.getElementById('confidence').innerHTML = res.confidence;
        document.getElementById('agreement').innerHTML = res.agreement;
        document.getElementById('subjectivity').innerHTML = res.subjectivity;

    })
   }

else {
  alert('Please enter a valid URL');

}


}


 async function postApi (url= "", data) {

    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      try {
        const newData = await res.json();
        return newData;
      } catch (error) {
        console.log('error', error);
      }

};



export { handleSubmit }
