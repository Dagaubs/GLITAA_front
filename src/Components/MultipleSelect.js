import React, { Component } from 'react';

export function musicstylesToJson(ms){
    return '{\"styleMusic_id\": '+ ms.styleMusic_id +', \"style\": \"' + ms.style + '\"}'
}

export function locationsToJsonWithDtype(location, dtype){
    return '{name: \"' + location.name +'\", \"dtype\": \"' + dtype + '\"}';
}

export function locationsToJson(location){
    return '{\"name\": \"' + location.name +'\"}';
}

class MultipleSelect extends Component{
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state = {
            selected: []
        }
    }

    render(){
        if(this.props.categorie == 'musicstyles'){
            return(
                <ul className="musicstyles_ul multiple_select">
                    {this.props.content.map(ms =>(
                        <li className={this.isSelected(musicstylesToJson(ms))} onClick={(evt) => this.updateInput(evt, this.isSelected(musicstylesToJson(ms)), musicstylesToJson(ms), 'li')}><input key={ms.styleMusic_id} id={ms.styleMusic_id} checked={this.isSelected(musicstylesToJson(ms)) == 'selected'} type="checkbox" onClick={evt => this.updateInput(evt, this.isSelected(musicstylesToJson(ms)), musicstylesToJson(ms),'input')} value={musicstylesToJson(ms)}/><p>{ms.style}</p></li>
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
                                <li className={this.isSelected(locationsToJson(region))} onClick={(evt) => this.updateInput(evt, this.isSelected(locationsToJson(region)), locationsToJson(region), 'li')}><input key={region.id} id={region.id} checked={this.isSelected(locationsToJson(region)) == 'selected'} type="checkbox" onClick={evt => this.updateInput(evt, this.isSelected(locationsToJson(region)), locationsToJson(region),'input')} value={locationsToJson(region)}/><p>{region.name}</p></li>
                            ))}
                        </ul>
                        }
                        {this.props.content.departements &&
                            <ul className="departements"><p>Departements</p>
                                {this.props.content.departements.map( departement => (
                                <li className={this.isSelected(locationsToJson(departement))} onClick={(evt) => this.updateInput(evt, this.isSelected(locationsToJson(departement)), locationsToJson(departement), 'li')}><input key={departement.id} id={departement.id} checked={this.isSelected(locationsToJson(departement)) == 'selected'} type="checkbox" onClick={evt => this.updateInput(evt, this.isSelected(locationsToJson(departement)), locationsToJson(departement),'input')} value={locationsToJson(departement)}/><p>{departement.name}</p></li>
                                ))}
                            </ul>
                        }
                        {this.props.content.villes &&
                            <ul className="villes"><p>Villes</p>
                                {this.props.content.villes.map( ville => (
                                <li className={this.isSelected(locationsToJson(ville))} onClick={(evt) => this.updateInput(evt, this.isSelected(locationsToJson(ville)), locationsToJson(ville), 'li')}><input key={ville.id} id={ville.id} checked={this.isSelected(locationsToJson(ville)) == 'selected'} type="checkbox" onClick={evt => this.updateInput(evt, this.isSelected(locationsToJson(ville)), locationsToJson(ville),'input')} value={locationsToJson(ville)}/><p>{ville.name}</p></li>
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