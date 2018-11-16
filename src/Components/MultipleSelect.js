import React, { Component } from 'react';

export function musicstyleToJson(ms){
    return '{\"styleMusic_id\": '+ ms.styleMusic_id +', \"style\": \"' + ms.style + '\"}'
}

export function locationToJsonWithDtype(location, dtype){
    return '{name: \"' + location.name +'\", \"dtype\": \"' + dtype + '\"}';
}

export function locationToJson(location){
    return '{\"name\": \"' + location.name +'\"}';
}

class MultipleSelect extends Component{
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state = {
            selected: props.selected
        }
    }

    render(){
        if(this.props.categorie == 'musicstyles'){
            return(
                <ul className="musicstyles_ul multiple_select">
                    {this.props.content.map(ms =>(
                        <li className={this.isSelected(musicstyleToJson(ms))} onClick={(evt) => this.updateInput(evt, this.isSelected(musicstyleToJson(ms)), musicstyleToJson(ms), 'li')}><input key={ms.styleMusic_id} id={ms.styleMusic_id} checked={this.isSelected(musicstyleToJson(ms)) == 'selected'} type="checkbox" onClick={evt => this.updateInput(evt, this.isSelected(musicstyleToJson(ms)), musicstyleToJson(ms),'input')} value={musicstyleToJson(ms)}/><p>{ms.style}</p></li>
                    ))}
                </ul>
            );
        }
        else if (this.props.categorie == 'locations'){
            return(
                <ul className="locations_ul multiple_select">
                        {this.props.content.regions && 
                        <ul className="regions"><p>Regions</p>
                            {this.props.content.regions.map( region => (
                                <li className={this.isSelected(locationToJson(region))} onClick={(evt) => this.updateInput(evt, this.isSelected(locationToJson(region)), locationToJson(region), 'li')}><input key={region.id} id={region.id} checked={this.isSelected(locationToJson(region)) == 'selected'} type="checkbox" onClick={evt => this.updateInput(evt, this.isSelected(locationToJson(region)), locationToJson(region),'input')} value={locationToJson(region)}/><p>{region.name}</p></li>
                            ))}
                        </ul>
                        }
                        {this.props.content.departements &&
                            <ul className="departements"><p>Departements</p>
                                {this.props.content.departements.map( departement => (
                                <li className={this.isSelected(locationToJson(departement))} onClick={(evt) => this.updateInput(evt, this.isSelected(locationToJson(departement)), locationToJson(departement), 'li')}><input key={departement.id} id={departement.id} checked={this.isSelected(locationToJson(departement)) == 'selected'} type="checkbox" onClick={evt => this.updateInput(evt, this.isSelected(locationToJson(departement)), locationToJson(departement),'input')} value={locationToJson(departement)}/><p>{departement.name}</p></li>
                                ))}
                            </ul>
                        }
                        {this.props.content.villes &&
                            <ul className="villes"><p>Villes</p>
                                {this.props.content.villes.map( ville => (
                                <li className={this.isSelected(locationToJson(ville))} onClick={(evt) => this.updateInput(evt, this.isSelected(locationToJson(ville)), locationToJson(ville), 'li')}><input key={ville.id} id={ville.id} checked={this.isSelected(locationToJson(ville)) == 'selected'} type="checkbox" onClick={evt => this.updateInput(evt, this.isSelected(locationToJson(ville)), locationToJson(ville),'input')} value={locationToJson(ville)}/><p>{ville.name}</p></li>
                                ))}
                            </ul>
                        }
                </ul>
            );
        }
        else{
            return (
                <ul className="obj_ul">
                    {this.props.content.map(obj =>(
                        <li className={this.isSelected(obj)} onClick={(evt) => this.updateInput(evt, this.isSelected(obj), obj, 'li')}><input key={obj.id} id={obj.id} checked={this.isSelected(obj) == 'selected'} type="checkbox" onClick={evt => this.updateInput(evt, this.isSelected(obj), obj,'input')} value={obj}/><p>{obj}</p></li>
                    ))}
                </ul>
            )
        }
    }

    triggerInput = (input_ref) => {
        this.myRef.current.click();
    }

    isSelected(value){
        return this.state.selected.indexOf(value) != -1 ? 'selected' : 'not-selected';
    }

    updateInput(evt, classname, value, type){
        evt.stopPropagation();
        const checked = classname == 'not-selected';
        //console.log(type == 'input' ? "input: ": "li: ", value, checked);
        if(checked){
            this.state.selected.push(value);
        }else{
            const index = this.state.selected.indexOf(value);
            this.state.selected.splice(index, 1);
        }
        this.setState({
            selected : this.state.selected
        })
        this.props.callbackUpdate(this.state.selected);
    }

    updateSelected(evt){
        var options = evt.target.options;
        var values = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                values.push(options[i].value);
            }
        }
        this.props.callbackUpdate(values);
    }
}

export default MultipleSelect