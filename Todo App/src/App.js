import React from 'react'
import './App.css'

class TodoApp extends React.Component {
  constructor(){
    super()
    this.state = {
      items:[],
      appTitle:"Todo App"
    }
  }

  addTodo(item){
    if(item === "") return;
    let newItems = this.state.items.slice()
    newItems.push(item)
    this.setState({
      items:newItems
    })
  }

  remove(index){
    let newItems = this.state.items.slice()
    newItems.splice(index,1)

    this.setState({
      items:newItems
    })
  }

  render(){
    return (
      <div className="container_b">
        <Title title={this.state.appTitle}/>
        <Form add={this.addTodo.bind(this)}/>
        <List items={this.state.items} remove={this.remove.bind(this)}/>
      </div>
      )
  }
}

class Form extends React.Component {
  constructor(){
    super()
    this.state={
      item:''
    }
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.add(this.state.item)
    this.setState({
      item:''
    })
  }

  update(event){
    this.setState({
      item:event.target.value
    })
  }

  render(){
    return (
      <div className="form_elem">
        <form onSubmit={this.handleSubmit.bind(this)} className="form_elem">
          <input type='text' value={this.state.item} onChange={this.update.bind(this)} className="input_elem"/>
          <input type='submit' value="+" className="plus_item"/>
        </form>
      </div>
        )
  }
}

const Title = (props) => {
  return (
    <div className="title_elem">
      <h1>{props.title}</h1>
    </div>
    )
}

class Item extends React.Component{

  removeItem(){
    let index =parseInt(this.props.index,10)
    this.props.remove(index)
  }

  render()
    {  
      return(
      <div className="item_elem">      
        <li onClick={this.removeItem.bind(this)}>{this.props.children}</li>
      </div>
        )
    }
}

const List = (props) => {
  let items = props.items.map((item,index) => {
      return (<Item key={index} index={index} remove={props.remove}>{item}</Item>)
  })

  return (<ul className="list_elem">{items}</ul>)
}

export default TodoApp
