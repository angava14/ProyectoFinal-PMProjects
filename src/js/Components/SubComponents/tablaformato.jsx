
/*CREACION DE FORMATOS TIPO TABLA */

const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import Addicon from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import {formatotabla} from './../../config.jsx';
import * as  firebase from 'firebase';


import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const overflow={
    overflow: 'scroll',
}

const iconbutton ={
    padding: 0 
}

 var styles={
  smallIcon: {
    width: 36,
    height: 36,
  }
}


class Tabla extends React.Component {
        	    constructor(props) {
        super(props);
        this.state = {
        	numfil: 0 ,
        	numcol: 2 , 
        	filas: [],
        	columnas: [],
        }
            this.agregarcolumna = this.agregarcolumna.bind(this);
             this.agregarfila = this.agregarfila.bind(this);
    }



componentWillMount(){
        
    
}

agregarcolumna(){

	 this.state.columnas.push({
	 	id: this.state.columnas.length
	 });
	
	this.setState({
            numcol: this.state.numcol + 1 ,
        }, () => {
            formatotabla( this.state.numcol , this.state.numfil	, this.props.nombreformato);
        });
}

agregarfila(){
 
		 this.state.filas.push({
	 	id: this.state.filas.length
	 });
	
	this.setState({
            numfil: this.state.numfil + 1 ,
        }, () => {
            formatotabla( this.state.numcol , this.state.numfil	, this.props.nombreformato);
        });
	
   
}

	render() {
	    
		return (
<div>
<MuiThemeProvider>
<div>

<h1 className="documentotitulo" >{this.props.nombreformato}</h1>
<div className="tabla">
<Table  style={overflow} >
<TableHeader  adjustForCheckbox={false}  displaySelectAll={false}    >

<TableRow    >
        <TableHeaderColumn>Columna</TableHeaderColumn>
        <TableHeaderColumn>Columna</TableHeaderColumn>
                         	 {this.state.columnas.map(item=>{
    	         return(
    	       
                    <TableHeaderColumn key={item.id} >Columna</TableHeaderColumn>
    	       
    	         );
    	        })
    	      }
        
        
        <TableHeaderColumn> <IconButton style={iconbutton} iconStyle={styles.smallIcon} onClick={this.agregarcolumna}><Addicon /></IconButton>    </TableHeaderColumn>
</TableRow>
</TableHeader>
<TableBody  displayRowCheckbox={false} >
                         	 {this.state.filas.map(item=>{
    	         return(
    	          <div key={item.id}>
                  <TableRow></TableRow>
    	          <Divider />
    	          </div>
    	         );
    	  
    	        })
    	      }


</TableBody>
</Table>
 <IconButton style={iconbutton} iconStyle={styles.smallIcon} onClick={ this.agregarfila} ><Addicon /></IconButton>
</div>
</div>
</MuiThemeProvider>
</div>
			);
	}
	
	


	
}export default Tabla;
