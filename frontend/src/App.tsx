import { useEffect, useState } from 'react';
import './App.css';

interface Livro {
  _id: string;
  titulo: string;
  autor: string;
  isbn: string;
  paginas: number;
  ano: number;
  valor: number;
}

function App() {
  const [livros, setLivros] = useState<Livro[]>([])
  const [pageTotal, setPageTotal] = useState(0)
  console.log("🚀 ~ App ~ pageTotal:", pageTotal)
  const [amount, setAmount] = useState(0)
  console.log("🚀 ~ App ~ amount:", amount)
  const [btn1, setBtn1] = useState(0);
  const [btn2, setBtn2] = useState(0);
  const [btn3, setBtn3] = useState(0);
  const [btn4, setBtn4] = useState(1);
  console.log("🚀 ~ App ~ btn4:", btn4)
  const [btn5, setBtn5] = useState(0);
  const [btn6, setBtn6] = useState(0);
  console.log("🚀 ~ App ~ btn6:", btn6)
  const [btn7, setBtn7] = useState(0);
  const [page, setPage] = useState(1)
  
  function next(){
    setBtn4( btn4 + 1)
    setPage(btn4)
  }
  
  function previous(){
    if( (btn4 - 1) > 0){
      setBtn4( btn4 - 1)
      setPage(btn4)
    }
  }

  function lastPage(){
    setPage(pageTotal)
    setBtn4(pageTotal) 
  }
  function firstPage(){
    setPage(1)
    setBtn4(1)
  }

  function handlePage(value: number){
    setBtn4(value)
    setPage(btn4)
  }

  function getLivros(btn4: number){
    try{
      setLivros([])
      fetch(`http://localhost:3008/livros/${page}`)
        .then(async response => {
          if(response.ok){
            setLivros(await response.json())
            
          }else{
            setLivros([])
          }
        })
    }catch(erro){
    }
  }

  async function getAmount(){
  await fetch(`http://localhost:3008/len`)
    .then(async response => {
      if(response.ok){
        setAmount(await response.json())
        countPages(amount)
      }else{
        setAmount(0)
      }
    })
}

function setButtonValues(){
    setBtn1(btn4 - 3)
    setBtn2(btn4 - 2)
    setBtn3(btn4 - 1)
    setBtn5(btn4 + 1)
    setBtn6(btn4 + 2)
    setBtn7(btn4 + 3)
}

function countPages(qtd: number){
  const x = qtd
  const numberOfPages =  Math.ceil(x/10)
  setPageTotal(numberOfPages)
}

  useEffect(()=>{
    getAmount()
    setButtonValues()
    countPages(amount)
    getLivros(page)
    console.log('treste',livros)
  },[btn4, page, amount])


  return ( 
    <div className="App">
      <header className="App-header">
        <h1>Catálogo de Livros</h1>
        <thead>
        <tr>
          <th style={{width:'35vw'}}>Titulo </th>
          <th style={{width:'25vw'}}>Autor</th>
          <th style={{width:'10vw'}}>ISBN</th>
          <th style={{width:'8vw'}}>Páginas</th>
          <th style={{width:'7vw'}}>Ano</th>
          <th style={{width:'7vw'}}>Valor</th>
        </tr>
        {
          livros && (
            livros.map((livro:Livro) => (
              <tr key={livro._id} >
                <td style={{fontWeight:600}}>{livro.titulo}</td>
                <td style={{fontWeight:600}}>{livro.autor}</td>
                <td style={{fontWeight:600}}>{livro.isbn}</td>
                <td style={{fontWeight:600}}>{livro.paginas}</td>
                <td style={{fontWeight:600}}>{livro.ano}</td>
                <td style={{fontWeight:600}}>R$ {livro.valor}</td>
              </tr>

            ))
          )
        }

        </thead>
        <div>
          { btn4 >= pageTotal ? (
            <div>Exibindo de {btn4 * 10 - 9} até { amount }  de  {amount} livros</div>
          ):  btn4 > 1 ? (
            <div>Exibindo de {btn4 * 10 - 9} até { btn4 * 10 }  de  {amount} livros</div>
          ):(
            <div>Exibindo de {btn4} até {10} de  {amount} livros</div>
          )
          }
          
        <button disabled={btn4 <= 1 ? true : false} onClick={()=>{firstPage()}}>{'<<'}</button>
        <button disabled={btn4 <= 1 ? true : false} onClick={()=>{previous()}}>{'<'}</button>

        <button style={{ display: btn1 > 0 ? '' : 'none'}} value={btn1} onClick={()=>{ handlePage(btn1) }}> {btn1} </button>
        <button style={{ display: btn2 > 0 ? '' : 'none'}} value={btn2} onClick={()=>{ handlePage(btn2) }}> {btn2} </button>
        <button style={{ display: btn3 > 0 ? '' : 'none'}} value={btn3} onClick={()=>{ handlePage(btn3) }}> {btn3} </button>

        <button style={{background: `black`, color: `white`}} value={btn4} onClick={()=>{}}> {btn4} </button>

        <button style={{ display: btn5 > pageTotal ? 'none' : ''}} value={btn5} onClick={()=>{ handlePage(btn5) }}> {btn5} </button>
        <button style={{ display: btn6 > pageTotal ? 'none' : ''}} value={btn6} onClick={()=>{ handlePage(btn6) }}> {btn6} </button>
        <button style={{ display: btn7 >  pageTotal ? 'none' : ''}} value={btn7} onClick={()=>{ handlePage(btn7) }}> {btn7} </button>

        <button disabled={ btn4 >= pageTotal ? true : false } onClick={()=>{next()}}>{'>'}</button>
        <button disabled={ btn4 >= pageTotal ? true : false } onClick={()=>{lastPage()}}>{'>>'}</button>

      </div>
      </header>
    </div>
  );
}

export default App;
