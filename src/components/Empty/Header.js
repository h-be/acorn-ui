import React from 'react'
import GuideBook from '../GuideBook/GuideBook'
import './empty.css'
export default class Header extends React.Component{
    constructor(props){
        
        super(props)
        this.clickAvatar  = this.clickAvatar.bind(this)
        this.clickBook  = this.clickBook.bind(this)
        this.clickStatus  = this.clickStatus.bind(this)
        this.changeStatus  = this.changeStatus.bind(this)
        
        this.state={isOpen:false,online:{},isStatusOpen:false,lista:{}}


    }
    componentDidMount(){
        this.changeStatus("green")
        this.setState({lista:[
            {color:"green",img:"img/check-mark-circle-line.svg",titulo:"Online"},
            {color:"yellow",img:"img/check-mark-circle-line.svg",titulo:"Await"},
            {color:"gray",img:"img/check-mark-circle-line.svg",titulo:"Offline"},
            
        ]})
    }
    clickAvatar(e){
    }
    clickStatus(e){
        this.setState({isStatusOpen:!this.state.isStatusOpen,isOpen:false})
        
    }
    changeStatus(status){
        switch (status){
            case "green": this.setState({online:{color:"green",img:"img/check-mark-circle-line.svg"}});
            break;
            case "blue": this.setState({online:{color:"blue",img:"img/user status - hover.svg"}});
            break;
            default: console.error("no definido");
            break;

        }
    }
    
    clickBook(e){
        this.setState({isOpen:!this.state.isOpen,isStatusOpen:false})
    }
    render(){
        return(
            <>
            <div className="header">
                <div className="logos">
                    <div className="logo" >
                        <img src="img/acorn-svgrepo-com.svg"/>
                        <p className="semi">acorn</p>
                    </div>
                    <div className="logo">
                        <img src="img/maps-lines.svg"/>
                        <p className="regular">H-BE SoA</p>
                    </div>
                </div>
                <div className="estado">
                    <img src="img/search-line.svg"/>
                    <img src="img/notebook-line.svg" onClick={this.clickBook}/>
                    
                    <img src="img/bell-line.svg"/>
                    <div className={this.state.online.color}>
                        <img src="img/user avatar.png" onClick={this.clickAvatar}/>
                        <span>
                            <img src={this.state.online.img} onClick={this.clickStatus}/>
                        </span>
                    </div>
                </div>
                
            </div>
            <div className={this.state.isOpen?"instructions_wrapper":"status_change"}>
                {this.state.isOpen &&<GuideBook />  || this.state.isStatusOpen && Object.keys(this.state.lista).map(key=>
                    <ListStatus key={key }img={this.state.lista[key].img} color={this.state.lista[key].color} titulo={this.state.lista[key].titulo}/>
                )
                }
            </div>
                
            </>
        )
    }
}
const ListStatus=(props)=>{
    return(
            <button className={props.color}><img src={props.img}/><p>{props.titulo}</p></button>
    )
}
