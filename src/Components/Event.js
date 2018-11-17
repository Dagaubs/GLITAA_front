import React, { Component } from 'react';

class Event extends Component {
    render() {
        const {title, url, locations, musicStyles, dateBegin, dateEnd, img} = this.props;
        var dateStart = null, dateFinish = null, img_text = '';
        if(dateBegin != null){
            dateStart = dateBegin.replace(/-/g, '/');
        }

        if(dateEnd != null){
            dateFinish = dateEnd.replace(/-/g, '/');
        }
        if(img == null)
        {
            img_text = 'default_img';
        }
        //console.log('start : ' + dateStart + ' | end : ' + dateFinish);
        return (
            <div className="event" >
                {img ? 
                    <img className="img_ev" />
                    :
                    <img className="img_ev default" src="../images/empty-img.jpg" />
                }
                <div>
                    <h4>{title}</h4>
                    <a href={this.props.url}>Link to event page</a>
                    <div className="date_ev">
                        <p className="begin_ev">{dateBegin != null && dateBegin}</p>
                        <p className="date_sep"> - </p>
                        <p className="begin_ev">{dateEnd != null && dateEnd}</p>
                    </div>
                    <ul className="musicstyles_ev">
                        {this.props.musicStyles.map(ms => (
                            <li className="ms_ev">{ms.style}</li>
                        ))}
                    </ul>
                    <div className="locations_ev">
                        {this.props.locations.regions &&
                        <ul className="regions_ev">
                            {this.props.locations.regions.map(reg => (
                                <li className="reg">reg.name</li>
                            ))}
                        </ul>
                        }
                        {this.props.locations.departements &&
                        <ul className="departements_ev">
                            {this.props.locations.departements.map(dep => (
                                <li className="dep">dep.name</li>
                            ))}
                        </ul>
                        }
                        {this.props.locations.villes &&
                        <ul className="villes_ev">
                            {this.props.locations.villes.map(vil => (
                                <li className="vil">vil.name</li>
                            ))}
                        </ul>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Event
/*
 <ul className="musicstyles">
                        {this.props.musicstyles.map(ms => (
                        <li className="music">{ms.style}</li>    
                        ))}
                    </ul>*/