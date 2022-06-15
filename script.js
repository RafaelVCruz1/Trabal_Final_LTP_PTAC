let jsonURL = 'https://www.luizpicolo.com.br/api.json';
let XHR = new XMLHttpRequest();
XHR.open('get', jsonURL);
XHR.responseType = 'json';
XHR.send();

XHR.onload = function() {

  
  class Noticia {
    constructor(name, author, publishedAt, title, url) {
      this.name = name;
      this.author = author;
      this.publishedAt = publishedAt;
      this.title = title;
      this.url = url;
    }

  
    mostraNoticia() {
      
      return `
  
      <div class="listaDeNoticias">


              <h2 class="nome">${this.name}</h2>

              <a href="${this.url}"><h2 class="titulo">${this.title}</h2></a>
                     

              <h5 class="autor">${this.author}</h5>
             
              <h6 class="data_pub">Data da publicação:${this.publishedAt}</h6>

<div class="grr"></div>
</div>

    
                  
            `
    }
   
  }

  class NotDestaque extends Noticia {
    constructor(urlToImage, author, publishedAt, url, title, description){
       super(author, publishedAt, url, title, description)
      this.urlToImage = urlToImage;
      this.author = author;
      this.publishedAt = publishedAt;
      this.url = url;
      this.title = title;
      this.description = description;
    }

    mostraNotDestaque(){
      return `

        <div class="noticiaDestaque">
      <img id="imgDestaque" src="${this.urlToImage}"/>
      <a href="${this.url}"><h1 class="tituloDestaque">${this.title}</h1></a>
      <p class="descricao">${this.description}</p>

      <h5 class="autor">${this.author}</h5>
      <h6 class="data_pub">${this.publishedAt}</h6>

</div>

`
    }
    
  }

  let respostaJson = XHR.response;

  

  const pegaADiv = document.getElementById('listaNoticias');

  


  respostaJson.articles.forEach(noticia => {
    
    let noticinhas = new Noticia(noticia.source.name, noticia.author, 
    
    noticia.publishedAt, noticia.title, noticia.url)
    
    pegaADiv.insertAdjacentHTML('beforeend', noticinhas.mostraNoticia());
  });


  let noticiaDestaque = new NotDestaque(
respostaJson.articles[0].urlToImage,
respostaJson.articles[0].author,
respostaJson.articles[0].publishedAt, 
respostaJson.articles[0].url,
respostaJson.articles[0].title,
respostaJson.articles[0].description)


  pegaADiv.insertAdjacentHTML('afterbegin', noticiaDestaque.mostraNotDestaque());
  

  
}