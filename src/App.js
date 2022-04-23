import React from 'react'
import { useForm } from 'react-hook-form'
import './estilo.css'

export default function App() {
  const {register, handleSubmit, setValue, setFocus} = useForm()

  const onSubmit = (e) => {
      console.log(e)
  }
   
   const onblurCep = (ev) => {
      const cep = ev.target.value.replace(/\D/g, '')
      console.log(cep)

      if (cep.length !== 8 ) {
        return
      }
   
      fetch (`https://viacep.com.br/ws/${cep}/json/`)
          .then ((res) => res.json())
          .then ((data) => {
            setValue('logradouro', data.logradouro)
            setValue('bairro', data.bairro)
            setValue('cidade', data.localidade)
            setValue('uf', data.uf)
            setFocus('numero')
           
          })
          
        }
   
    return (
    <div className='tudo'>
      <h1 className='t'>
        Consulta endereço ViaCep
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
  
        <div>
          <label> CEP: </label> 
          <input type='text' {...register('cep')} onBlur={onblurCep}></input>
        </div>
        <div>
        <label> Logradouro: </label> 
        <input type='text' {...register('logradouro')}></input>
        </div>
        <div>
        <label> Número: </label> 
        <input type='text' {...register('numero')}></input>
        </div>
        <div>
        <label> Bairro: </label> 
        <input type='text' {...register('bairro')}></input>
        </div>
        <div>
        <label> Cidade: </label> 
        <input type='text' {...register('cidade')}></input>
        </div>
        <div>
        <label> Estado: </label> 
        <input type='text' {...register('uf')}></input>
        </div>

        <button type='submit' className='b'>Enviar</button>
      </form>
    </div>
  )
}
