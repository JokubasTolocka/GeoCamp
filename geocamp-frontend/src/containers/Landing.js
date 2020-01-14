import React, {Component} from 'react';
import Facebook from './Facebook';
import Google from './Google';
import {connect} from 'react-redux';


class Landing extends Component{

    render(){
        if(this.props.currentUser.isAuthenticated){
            this.props.history.push('/catalogue');
        }
        return(
            <section>
                <div className='landing'>
                    <Facebook />
                    <Google />
                </div>
            </section>
        )
    }
}

function mapStateToProps(state){
    return {
       currentUser: state.currentUser 
    };
}

export default connect(mapStateToProps, {})(Landing);