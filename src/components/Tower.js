import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import FloorContainer from './FloorContainer'
import ConstructionFloor from './ConstructionFloor'
import Lobby from './Lobby'

class Tower extends React.Component {
  render(){
    return(
      <div id='tower'>
        <Lobby />
          {this.props.floors.map( floor => (
            <FloorContainer
                key={floor.id}
                floor={floor}/>
          ))}
        <ConstructionFloor
          level={this.props.floors.length + 1}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tower: state.tower,
    floors: state.floors
  }
}

export default connect(mapStateToProps)(Tower)