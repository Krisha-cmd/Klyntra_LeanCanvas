async function fetchYamlFile() {
     try {
     const response = await fetch('data.yaml');
     const yamlContent = await response.text();
     return yamlContent;
     } catch (error) {
     console.error('Error fetching YAML file:', error);
     }
    }
    
    async function renderYamlContent() {
     const yamlContent = await fetchYamlFile();
    
     try {
     const parsedYaml = jsyaml.load(yamlContent);
     const formattedYaml = JSON.stringify(parsedYaml, null, 4);
     console.log(formattedYaml)
     display(formattedYaml)
    } catch (error) {
     console.error('Error parsing YAML content:', error);
     }
    
    }
    
    window.onload = renderYamlContent;
    
    
    const cardsContainer = document.getElementById('cards-container');
    
    function display(formattedYaml){
    const jsonObject = JSON.parse(formattedYaml);
    for (const key in jsonObject) {
    if (jsonObject.hasOwnProperty(key)) {
    const card = document.createElement('div');
    card.classList.add('card');
     
    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = key;
     
    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
     
    if (Array.isArray(jsonObject[key])) {
    jsonObject[key].forEach(value => {
    const valueLine = document.createElement('div');
    valueLine.textContent = value;
     cardContent.appendChild(valueLine);
     });
     } else {
     const valueLine = document.createElement('div');
     valueLine.textContent = jsonObject[key];
     cardContent.appendChild(valueLine);
     }
    
    card.appendChild(cardTitle);
     card.appendChild(cardContent);
     cardsContainer.appendChild(card);
}
}
 }

    