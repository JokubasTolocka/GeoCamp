import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {apiCall} from '../services/api';
import {removeCamp, postRating} from '../store/actions/campgrounds';
import GoogleMapReact from 'google-map-react';
import getPreciseDistance from 'geolib/es/getDistance';
import {googleStyles} from '../googleMapStyles';
import StarRatingComponent from 'react-star-rating-component';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const AnyReactComponent = () => <div><i className="fas fa-campground"></i></div>;

class CampgroundPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            title: '',
            image: '',
            description: '',
            zoom: 2,
            user_id: '',
            id: '',
            userLoc: {
                lat: null,
                lng: null,
            },
            center: {
                lat: 59,
                lng: 40
            },
            ratingCount: 0,
            AvgRating: 0
        }
    }
    removeCampground = e =>{
        e.preventDefault();
        this.props.removeCamp(this.state.user_id, this.state.id);
        this.props.history.push('/');
    }

    async onStarClick(nextValue, prevValue, name) {
        await this.setState({rating: nextValue});
        // this.props.postRating(this.state.rating, this.props.currentUser.user._id)
        this.props.postRating(this.state, this.props.currentUser.user)
        window.location.reload();
      }

    componentDidMount(){
        apiCall('get', `http://localhost:8000/api/${window.location.pathname}`)
            .then(res => {
                this.setState({
                    user: res.user.name,
                    user_id: res.user._id,
                    location: res.location,
                    title: res.name,
                    description: res.description,
                    id: res._id,
                    image: res.image,
                    AvgRating: res.AvgRating,
                    ratingCount: res.ratingCount
                })
            });
        navigator.geolocation.getCurrentPosition(
            position => this.setState({ 
                userLoc: position.coords
            }), 
            err => console.log(err)
            );
        
    }

    render(){
        const { AvgRating } = this.state;
        const mapOptions = {
            styles: googleStyles
        }
        return(
            <div>
                <ToastContainer/>
            <div className='camp-page'>
                <div className='camp-top'>
                    <div className='camp-top-left'>
                        <h1 className='camp-title'>{this.state.title}</h1>
                        <h3 className='camp-field'><i className="far fa-user"></i> {this.state.user}</h3>
                        {this.state.userLoc && this.state.location ?(
                        <div>
                            <h5 className='camp-field'><i className="fas fa-map-marker-alt"></i> {getPreciseDistance({latitude: this.state.userLoc.latitude, longitude: this.state.userLoc.longitude}, {latitude: this.state.location.lat, longitude: this.state.location.lng}) / 1000}km Away</h5>
                            <div className='camp-rating'>
                                <StarRatingComponent 
                                    name="rate1" 
                                    starCount={5}
                                    value={AvgRating}
                                    onStarClick={this.onStarClick.bind(this)}
                                    starColor={this.props.currentUser.user._id === this.state.user_id ? "#ffffff" : "#FFB400"}
                                    editing={this.props.currentUser.user._id === this.state.user_id ? false : true}
                                />
                                <h5 className='rating-count'>( {this.state.ratingCount} )</h5>
                            </div>
                        </div>
                        ): null}
                    </div>
                    <div className='camp-image'>
                        <img className='campground-image' src={this.state.image} alt='campground'/>
                    </div>
                </div>
                <div className='camp-text'>
                    <p className='camp-description'>"{this.state.description}"</p>
                </div>
                <div className='camp-map'>
                    {this.state.location ?
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
                        defaultCenter={this.state.location}
                        defaultZoom={this.state.zoom}
                        options={mapOptions}
                        >
                        {this.state.location && (   
                        <AnyReactComponent
                            lat={this.state.location.lat}
                            lng={this.state.location.lng}
                        />
                        )} 
                    </GoogleMapReact>
                    : null}
                </div>
                {this.props.currentUser.user._id === this.state.user_id &&
                    <div className='camp-buttons'>
                        <Link className='camp-edit' to={`/users/${this.state.user_id}/campgrounds/${this.state.id}/edit`}>Edit <i className="far fa-edit"></i></Link>
                        <button className='camp-delete' onClick={this.removeCampground}>Delete <i className="far fa-trash-alt"></i></button>
                    </div>
                    }
            </div>
            </div>
        )
    }
}

const mapStateToProps =  function(state){
    return{
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {removeCamp, postRating})(CampgroundPage);