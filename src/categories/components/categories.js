import React from 'react'
import Category from './category'
import './categories.css'
import Search from '../../widgets/containers/search'
import Media from '../../playlist/components/media'

function Categories(props) {
  console.log(props.categories)
  return (
    <div className="Categories">
      <Search />
      {
        props.isLoading &&
        <p>Buscando tus videos favoritos... </p>
      }
      {
        props.search.map(item => {
          return <Media
            openModal={props.handleOpenModal}
            title={item.get('title')}
            key={item.get('id')}
            author={item.get('author')}
            type={item.get('type')}
            cover={item.get('cover')}
            src={item.get('src')}
            id={item.get('id')}
          />
        })
      }
      {
        props.categories.map(item => {
          return (
            <Category 
              key={item.get('id')} 
              {...item.toJS()}
              handleOpenModal={props.handleOpenModal}
            />
          )
        })
      }
    </div>
  )
}

export default Categories
