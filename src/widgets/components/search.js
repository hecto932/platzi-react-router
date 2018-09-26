import React from 'react';
import './search.css';
import { Prompt } from 'react-router';

const Search = (props) => (
  <form 
    className="Search" 
    onSubmit={props.handleSubmit}>
      <Prompt
        when={props.prompt}
        message="¿Estás seguro de querer dejar la página?"
      />
      <input
        ref={props.setRef}
        className="Search-input"
        name="search"
        type="text" 
        placeholder="Busca tu video favorito"
        onChange={props.handleChange}
        value={props.value}
      />
  </form>
)

export default Search
