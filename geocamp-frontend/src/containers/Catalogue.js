import React, {Component} from 'react';
import { isAuth } from '../helpers/helpers';

class Catalogue extends Component{



    render(){
        if(!isAuth()){
            this.props.history.push('/');
        }
        return(
            <div>
            <h1>Hi from Catalogue</h1>
            </div>
        )
    }
}

export default Catalogue;