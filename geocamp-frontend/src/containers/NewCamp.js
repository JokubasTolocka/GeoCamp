import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from "react-redux";
import { postCampground} from "../store/actions/campgrounds.js";

const AnyReactComponent = () => <div><i className="fas fa-campground"></i></div>;

class NewCamp extends Component{
    constructor(props){
        super(props);
        this.state = {
            location: {
                lat: 59.95,
                lng: 30.33
            },
            zoom: 0,
            center: {
                lat: null,
                lng: null
            },
            name: '',
            description: '',
            image: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick = e => {
        this.setState({center: {lat: e.lat, lng: e.lng}})
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit(e){
        e.preventDefault();
        let data = {
            location: this.state.center, 
            name: this.state.name,
            description: this.state.description,
            image: this.state.image,
            user: this.props.currentUser.user._id
        }
        this.props.postCampground(data);
        this.setState({
            center: null,
            name: '',
            description: '',
            image: '', 
        })
        this.props.history.push('/');
    }

    render(){
        const mapOptions = {
            styles: [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "hue": "#ff4400"
                        },
                        {
                            "saturation": -68
                        },
                        {
                            "lightness": -4
                        },
                        {
                            "gamma": 0.72
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon"
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "hue": "#0077ff"
                        },
                        {
                            "gamma": 3.1
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "stylers": [
                        {
                            "hue": "#00ccff"
                        },
                        {
                            "gamma": 0.44
                        },
                        {
                            "saturation": -33
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "stylers": [
                        {
                            "hue": "#44ff00"
                        },
                        {
                            "saturation": -23
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "hue": "#007fff"
                        },
                        {
                            "gamma": 0.77
                        },
                        {
                            "saturation": 65
                        },
                        {
                            "lightness": 99
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "gamma": 0.11
                        },
                        {
                            "weight": 5.6
                        },
                        {
                            "saturation": 99
                        },
                        {
                            "hue": "#0091ff"
                        },
                        {
                            "lightness": -86
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "lightness": -48
                        },
                        {
                            "hue": "#ff5e00"
                        },
                        {
                            "gamma": 1.2
                        },
                        {
                            "saturation": -23
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "saturation": -64
                        },
                        {
                            "hue": "#ff9100"
                        },
                        {
                            "lightness": 16
                        },
                        {
                            "gamma": 0.47
                        },
                        {
                            "weight": 2.7
                        }
                    ]
                }
            ]
        }
        return(
            <div className='create-form'>
                <div className='create-form-inside'></div>
                <h1>Share a campground.</h1>
                <label htmlFor='name'></label>
                <input
                    placeholder='Campground Name'
                    className='create-input'
                    name='name'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.name}
                />
                <label htmlFor='photo'></label>
                <input
                    placeholder='Photo URL of this campground or a nearby place'
                    className='create-input'
                    name='image'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.image}
                />
                <label htmlFor='story'></label>
                <textarea
                    rows='10'
                    cols='25'
                    placeholder='Your story here'
                    className='create-input textarea'
                    name='description'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.description}
                />
                <h3>In order to post this, you must provide a location by clicking on this map where the campground is</h3>
                <div className='create-google' >
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
                    defaultCenter={this.state.location}
                    defaultZoom={this.state.zoom}
                    options={mapOptions}
                    onClick={this.handleClick}
                    >
                    <AnyReactComponent
                        lat={this.state.center.lat}
                        lng={this.state.center.lng}
                    />
                    </GoogleMapReact>
                </div>
                <button onClick={this.handleSubmit} className='create-button'>Submit!</button>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {postCampground})(NewCamp);