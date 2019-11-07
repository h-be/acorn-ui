import React from 'react'
import GuideBook from '../GuideBook/GuideBook'
import './empty.css'
import Avatar from '../Avatar/Avatar'
export default class Header extends React.Component{
    constructor(props){
        
        super(props)
        this.clickAvatar  = this.clickAvatar.bind(this)
        this.clickBook  = this.clickBook.bind(this)
        this.clickStatus  = this.clickStatus.bind(this)
        this.changeStatus  = this.changeStatus.bind(this)
        this.clickProfile  = this.clickProfile.bind(this)

        this.hover  = this.hover.bind(this)
        this.state={isOpen:false,online:{},isStatusOpen:false,lista:{},avatar:false,listaProfile:{}}


    }
    componentDidMount(){
        this.changeStatus("green")
        this.setState({lista:[
            {color:"green",img:"img/check-mark-circle-line.svg",titulo:"Online"},
            {color:"yellow",img:"img/Group 8.svg",titulo:"Await"},
            {color:"gray",img:"img/Mask Group 3.svg",titulo:"Offline"},
            
        ],
        avatar:false,
        listaProfile:[{titulo:"Profile Settings",click:this.clickProfile},{titulo:"Preferences",click:null}]
    })
    }
    clickProfile(e){
        this.props.setShowProfileEditForm(true)
        this.setState({isProfileOpen:false,isStatusOpen:false,isOpen:false})
    }
    clickAvatar(e){
        this.setState({isProfileOpen:!this.state.isProfileOpen,isStatusOpen:false,isOpen:false})
    }
    hover(bool){
        this.setState({avatar:bool})
    }
    clickStatus(e){
        this.changeStatus("blue")
        this.setState({isStatusOpen:!this.state.isStatusOpen,isOpen:false,isProfileOpen:false})
        
    }
    changeStatus(status){
        switch (status){
            case "green": this.setState({online:{color:"green",img:"img/check-mark-circle-line.svg"}});
            break;
            case "blue": this.setState({online:{color:"blue",img:"img/user status - hover.svg"}});
            break;
            case "yellow": this.setState({online:{color:"yellow",img:"img/Group 8.svg"}});
            break;
            case "gray": this.setState({online:{color:"gray",img:"img/Mask Group 3.svg"}});
            break;
            default: console.error("no definido");
            break;

        }
        this.setState({isProfileOpen:false,isStatusOpen:false,isOpen:false})
    }
    
    clickBook(e){
        this.setState({isOpen:!this.state.isOpen,isStatusOpen:false,isProfileOpen:false})
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
                <div className="status2">
                    <img src="img/search-line.svg"/>
                    <img src="img/notebook-line.svg" onClick={this.clickBook}/>
                    
                    <img src="img/bell-line.svg"/>
                    <div className={this.state.online.color}>
                        <div className="avatar_container" onMouseEnter={e=>{
                            this.hover(true)
                        }} onMouseOut={e=>{
                            this.hover(false)
                        }}><Avatar avatar_url={this.props.whoami.entry.avatar_url} highlighted={this.state.avatar} clickable onClick={this.clickAvatar}/></div>
                        
                        <span>
                            <img src={this.state.online.img} onClick={this.clickStatus}/>
                        </span>
                    </div>
                </div>
                
            </div>
            <div className={this.state.isOpen?"instructions_wrapper":"status_change"}>
                {this.state.isOpen &&<GuideBook />  || this.state.isStatusOpen && Object.keys(this.state.lista).map(key=>
                    <ListStatus key={key }img={this.state.lista[key].img} color={this.state.lista[key].color} titulo={this.state.lista[key].titulo} changeStatus={this.changeStatus}/>) 
                    || this.state.isProfileOpen && Object.keys(this.state.listaProfile).map(key=>
                        <ListProfile key={key }  titulo={this.state.listaProfile[key].titulo} click={this.state.listaProfile[key].click} />)
                }
            </div>
                
            </>
        )
    }
}
const ListStatus=(props)=>{
    return(
            <button className={props.color+" but"} onClick={color=>{
                props.changeStatus(props.color)
            }}><img src={props.img}/><p>{props.titulo}</p></button>
    )
}
const ListProfile=(props)=>{
    return(
            <button onClick={props.click}><p>{props.titulo}</p></button>
    )
}
