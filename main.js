const express = require('express');
const mysql2 = require('mysql2/promise');
const path = require('path');
const bodyParser = require('body-parser');
const pool = mysql2.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'Sergey1990',
    database : 'Sergey'
});


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, function(){console.log('server started')});

app.get('/', async function(req, res){
    const data = await pool.query('SELECT * FROM english');
    const words = data[0];
    res.send(`<!DOCTYPE html>
    <html lang="ru"><head><meta charset="UTF-8"><title>Questions</title><link rel="stylesheet" href="main.css">
    <style>  * {margin-left: 5vh;margin-right: 5vh;margin-top: 0px;margin-bottom: 0px;padding: 0;box-sizing: border-box; }
    .flex-item {padding: 1%; font: 900 60px "Roboto", sans-serif;color: #fff;text-align: center;text-shadow: 4px 2px 0 rgba(0, 0, 0, 0.2);}
    .item-1 {background-image: linear-gradient(45deg, #ff8177, #cf556c);min-height: 10vh}
    .item-2 {background: linear-gradient(45deg, #a6c0fe, #f68084);/*flex:3;*/min-height: 30vh;}
    .item-3 {background: linear-gradient(45deg, #d4fc79, #96e6a1);/*flex: 2;*/min-height: 57vh;display: flex;}
    .item-3 div {background: #fff;width: 50%;margin: 4px;color: #000;font-size: 16px;}
    .flex-container {display: flex;flex-direction: column;}   
    main{display: flex;flex-direction: column;}</style>
      </head>        <body>      <div class="flex-container">       <main>         <header class="flex-item item-1">Main</header>
      <section class="flex-item item-2"><a href="/random">Words at random</a><br>             <a href="/search">Поиск ENG</a>             <a href="/search/ru">Поиск RU</a><br>
      <a href="/add">Добавление/Удаление слов</a>           </section>
      <section class="flex-item item-3"><div>${words.map(el => `<li>${el.Word}  </li>`).join('')} </div><div>${words.map(el => `<li>${el.Translation} </li>`).join('')} </div>
      </section>         </main>       </div>    </html>`        )      })           


app.get('/start', async function(req, res){
    const data = await pool.query('SELECT * FROM english');
    const words = data[0];
    res.sendFile(path.join(__dirname,'/main/', '/index.html'));
})
app.get('/abc', function(req, res){
    res.send('SELECT * FROM people')
})
app.get('/var1/:variant', function(req, res){
    const variant = req.params.variant;
    /*res.send(req.params.variant); тоже самое*/
    res.send(variant)
})
app.get('/search', async function(req, res){
    const english_query = req.query.english_query;
    const data = await pool.query(`SELECT Word, Translation FROM english
                WHERE Word LIKE ?
                `, '%' + english_query + '%' ).then(function(data){
        const tmp = data[0];
    res.send(`<!DOCTYPE html>
    <html lang="ru"><head><meta charset="UTF-8"><title>Questions</title><link rel="stylesheet" href="main.css">
    <style>  * {margin-left: 5vh;margin-right: 5vh;margin-top: 0px;margin-bottom: 0px;padding: 0;box-sizing: border-box; }
    .flex-item {padding: 1%; font: 900 60px "Roboto", sans-serif;color: #fff;text-align: center;text-shadow: 4px 2px 0 rgba(0, 0, 0, 0.2);}
    .item-1 {background-image: linear-gradient(45deg, #ff8177, #cf556c);min-height: 10vh}
    .item-2 {background: linear-gradient(45deg, #a6c0fe, #f68084);/*flex:3;*/min-height: 30vh;}
    .item-3 {background: linear-gradient(45deg, #d4fc79, #96e6a1);/*flex: 2;*/min-height: 57vh;display: flex;}
    .item-3 div {background: #fff;width: 50%;margin: 4px;color: #000;font-size: 16px;}
    .flex-container {display: flex;flex-direction: column;}   
    main{display: flex;flex-direction: column;}</style>
      </head>      <body>       <div class="flex-container">        <main>
          <header class="flex-item item-1">Main ENG</header>
            <section class="flex-item item-2">Введите слово<br>            <a href="/">На главную</a>            <form method="get" action="/search">
            <input type ="text" name="english_query" placeholder="Слово" value="${english_query ? english_query : ""}"/>
            <button type="submit">Применить</button>            </form>            
            

            </section>
            <section class="flex-item item-3">
              <div>${tmp.map(el =>`<li>${el.Word}  </li>`).join('')}</div>              
              <div>${tmp.map(el =>`<li>${el.Translation} </li>`).join('')}</div>
            </section>          </main>        </div>      </body>    </html>`
            )        })            
});
app.get('/search/ru', async function(req, res){
    const english_query = req.query.english_query;
    const data = await pool.query(`SELECT Word, Translation FROM english
                WHERE Translation LIKE ?
                `, '%' + english_query + '%' ).then(function(data){
        const tmp = data[0];
    res.send(`<!DOCTYPE html>
    <html lang="ru"><head><meta charset="UTF-8"><title>Questions</title><link rel="stylesheet" href="main.css">
    <style>  * {margin-left: 5vh;margin-right: 5vh;margin-top: 0px;margin-bottom: 0px;padding: 0;box-sizing: border-box; }
    .flex-item {padding: 1%; font: 900 60px "Roboto", sans-serif;color: #fff;text-align: center;text-shadow: 4px 2px 0 rgba(0, 0, 0, 0.2);}
    .item-1 {background-image: linear-gradient(45deg, #ff8177, #cf556c);min-height: 10vh}
    .item-2 {background: linear-gradient(45deg, #a6c0fe, #f68084);/*flex:3;*/min-height: 30vh;}
    .item-3 {background: linear-gradient(45deg, #d4fc79, #96e6a1);/*flex: 2;*/min-height: 57vh;display: flex;}
    .item-3 div {background: #fff;width: 50%;margin: 4px;color: #000;font-size: 16px;}
    .flex-container {display: flex;flex-direction: column;}   
    main{display: flex;flex-direction: column;}</style>
      </head>      <body>       <div class="flex-container">        <main>
          <header class="flex-item item-1">Main RU</header>
            <section class="flex-item item-2">Введите слово<br>            <a href="/">На главную</a>            <form method="get" action="/search/ru">
            <input type ="text" name="english_query" placeholder="Слово" value="${english_query ? english_query : ""}"/>
            <button type="submit">Применить</button>            </form>
                       </section>
            <section class="flex-item item-3">
              <div>${tmp.map(el =>`<li>${el.Word}  </li>`).join('')}</div>              
              <div>${tmp.map(el =>`<li>${el.Translation} </li>`).join('')}</div>
            </section>          </main>        </div>      </body>    </html>`
            )        })            
});
app.get('/1', function(req, res){
    pool.query('SELECT * FROM english').then(function(data) {
        const words = data[0];
        res.send(`<!DOCTYPE html>                 <html>                    <body>                        <ul>
                            ${words.map(el => `<li>${el.Word} ${el.Translation} </li>`).join('')}
                            ${words.map(el => `<li>${el.Word} ${el.Translation} </li>`).join('')}  
                        </ul>                    </body>                 </html>`        )    });
})
app.get('/add', async function(req, res){
    const { Slovo } = req.params;
    pool.query('SELECT * FROM english').then(function(data) {
        const words = data[0]; 
       res.send(`<!DOCTYPE html>
    <html lang="ru"><head><meta charset="UTF-8"><title>Questions</title><link rel="stylesheet" href="main.css">
    <style>  * {margin-left: 5vh;margin-right: 5vh;margin-top: 0px;margin-bottom: 0px;padding: 0;box-sizing: border-box; }
    .flex-item {padding: 1%; font: 900 60px "Roboto", sans-serif;color: #fff;text-align: center;text-shadow: 4px 2px 0 rgba(0, 0, 0, 0.2);}
    .item-1 {background-image: linear-gradient(45deg, #ff8177, #cf556c);min-height: 10vh}
    .item-2 {background: linear-gradient(45deg, #a6c0fe, #f68084);/*flex:3;*/min-height: 30vh;}
    .item-3 {background: linear-gradient(45deg, #d4fc79, #96e6a1);/*flex: 2;*/min-height: 57vh;display: flex;}
    .item-3 div {background: #fff;width: 50%;margin: 4px;color: #000;font-size: 16px;}
    .flex-container {display: flex;flex-direction: column;}   
    main{display: flex;flex-direction: column;}</style>
      </head>      <body>       <div class="flex-container">        <main>
          <header class="flex-item item-1">Addition/delete</header>
            <section class="flex-item item-2">Добавление/Удаление слов<br>            <a href="/">На главную</a>                     
            <form method="post" action="/addSlovo/${Slovo}">
            <input type="text" name="NewWord" placeholder="ENG"/>
            <input type="text" name="NewTranslation" placeholder="RUS"/>
            <button type="submit">Добавить слово</button>    </form>
            </section>        
            <section class="flex-item item-3"><div>${words.map(el => `<li>${el.Word} <a href="/remove/${el.ID}">x</a></li>`).join('')} 
            </div><div>${words.map(el => `<li>${el.Translation} <a href="/remove/${el.ID}">x</a></li>`).join('')} </div>
      </section>              </main>        </div>      </body>    </html>`);})
})
app.get('/remove/:el_ID', async function(req, res){
    const { el_ID } = req.params;
    await pool.query('DELETE FROM english WHERE ID=?', el_ID);
    res.redirect(`/add`)
})
app.post('/addSlovo/:slovo', async function(req, res){
    const { Slovo } = req.params;
    const { NewWord, NewTranslation } = req.body;
    await pool.query('INSERT INTO english SET ?', {
        Word: NewWord,
        Translation: NewTranslation,
    })
    /*console.log(req.body);
    res.send(true);*/
    res.redirect(`/add`)
})

app.get('/random', async function(req, res){
    
    const english_query = req.query.english_query;
   
    const data = await pool.query(`SELECT * FROM english ORDER BY RAND() LIMIT 1`).then(function(data){
    const tmp = data[0];
    a = tmp.map(el =>`<li>${el.Word}  </li>`).join('');
    b = tmp.map(el =>`<li>${el.Translation}  </li>`).join('');
    res.send(`<!DOCTYPE html>
    <html lang="ru"><head><meta charset="UTF-8"><title>Questions</title><link rel="stylesheet" href="main.css">
    <style>  * {margin-left: 5vh;margin-right: 5vh;margin-top: 0px;margin-bottom: 0px;padding: 0;box-sizing: border-box; }
    .flex-item {padding: 1%; font: 900 60px "Roboto", sans-serif;color: #fff;text-align: center;text-shadow: 4px 2px 0 rgba(0, 0, 0, 0.2);}
    .item-1 {background-image: linear-gradient(45deg, #ff8177, #cf556c);min-height: 10vh}
    .item-2 {background: linear-gradient(45deg, #a6c0fe, #f68084);/*flex:3;*/min-height: 30vh;}
    .item-3 {background: linear-gradient(45deg, #d4fc79, #96e6a1);/*flex: 2;*/min-height: 57vh;display: flex;}
    .item-3 div {background: #fff;width: 50%;margin: 4px;color: #000;font-size: 16px;}
    .flex-container {display: flex;flex-direction: column;}   
    main{display: flex;flex-direction: column;}</style>
      </head>      <body>       <div class="flex-container">        <main>
          <header class="flex-item item-1">Words at random</header>
            <section class="flex-item item-2">Введите слово<br>            <a href="/">На главную</a>            
            
            <form method="get" action="/random"> 
            <button type="submit" value=1>Наугад русское слово</button></form>      
       
            
            </section>
            <section class="flex-item item-3">
              <div>${a}</div>              
              <div>${b}</div>
            </section>          </main>        </div>      </body>    </html>`
            )        })            });


/*
              <div>${tmp.map(el =>`<li>${el.Word}  </li>`).join('')}</div>              
              <div>${tmp.map(el =>`<li>${el.Word}  </li>`).join('')}</div>

${function func(){tmp.map(el =>`<li>${el.Word}  </li>`).join('')}}
${tmp.map(el =>`<li>${el.Word}  </li>`).join('')}


${tmp.map(el =>`<li>${el.Word}  </li>`).join('')}
<form method="post" action="/search/${english_query}">
            <input type="text" name="Word" placeholder="Word"/>
            <input type="text" name="Translation" placeholder="Translation"/>
            <button type="submit">Добавить слово</button>    </form>


<section class="flex-item item-3">
            <div>${words.map(el => `<li>${el.Word}  </li>`).join('')}</div>              
            <div>${words.map(el => `<li> ${el.Translation} </li>`).join('')} </div>
          </section>  






</section>            <section class="flex-item item-3">
              <div>${words.map(el => `<li>${el.Word} ${el.Translation} </li>`).join('')};</div>              
              <div>${words.map(el => `<li>${el.Word} ${el.Translation} </li>`).join('')} </div>
            </section> 

            
app.get('/', function(req, res){
    pool.query('SELECT * FROM english').then(function(data) {
        const words = data[0];
    res.sendFile(path.join(__dirname,'/main/', '/index.html'));
})})


                        <ul>
                            ${res.json(data[0])}  
                        </ul>


app.get('/add', async function(req, res){
    const english_query = req.query.english_query;
    const data = await pool.query(`SELECT Word, Translation FROM english
                WHERE Word LIKE ?
                `, '%' + english_query + '%' ).then(function(data){
        const tmp = data[0];
    res.send(
            )        })            });

res.json(Object.keys(data[0][0])[0]);

app.get('/search/:english_query', function(req, res){
    const english_query = req.params.english_query;
    pool.query(`SELECT Word, Translation FROM english
                WHERE Translation LIKE ?
                `, '%' + english_query + '%' ).then(function(data){
        res.json(data[0]);

        

object.keys()
conn.connect( err =>{
    if(err){
        console.log(err);
    }
    else{console.log('data baze ---- ok')}
});

app.get('/abc', function(req, res){
  
    res.send('SELECT * FROM people')
})


 res.send('123')

 app.get('/1', function(req, res){
    const english_query = req.params.english_query;
    pool.query('SELECT Word, Translation FROM english').then(function(data){
        res.json(data[0][1]);
    });
})


${word.Translation} 
*/


