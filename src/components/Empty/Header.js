import React from 'react'
import GuideBook from '../GuideBook/GuideBook'
import './empty.css'
export default class Header extends React.Component{
    constructor(props){
        
        super(props)
        this.clickAvatar  = this.clickAvatar.bind(this)
        this.clickBook  = this.clickBook.bind(this)
        
        this.state={isOpen:false}


    }
    clickAvatar(e){
        console.log("hola mundo")
    }
    clickBook(e){
        this.setState({isOpen:!this.state.isOpen})
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
                    <div>
                        <img src="img/user avatar.png" onClick={this.clickAvatar}/>
                        <span>
                            <img src="img/check-mark-circle-line.svg"/>
                        </span>
                    </div>
                </div>
                
            </div>
            <div className="instructions_wrapper">
            {this.state.isOpen &&
                <GuideBook />
            }
            </div>
                
            </>
        )
    }
}