import React from 'react'
import { connect } from 'react-redux'
import { switchGameMode, applyingRateTower } from '../redux/actions'
import { Header, Button, Grid } from 'semantic-ui-react'

///////////// CHECK IF EDGES END GAME
class Explore extends React.Component {
  constructor(props){
    super(props)

    /* Setting up Board Pieces */
    let board = [];
    for(let i = 0; i<20; i++){
      board.push(new Array(30).fill('brown'))
    }
    let ship = { y: 11, x: 2 };
    board[ship.y][ship.x] = 'white'

    let rocks = [];
    for(let i = 0; i<20; i++){
      let x = Math.floor(Math.random() * 25);
      let y = Math.floor(Math.random() * 7);
      let u = Math.round(Math.random() * 1);
      let l = Math.floor(Math.random() * 10)
      rocks.push({ x: 10 + x, y: y, upright: u, length: l })
    }

    /* Create Game Environment */
    this.state = {
      board: board,
      ship: ship,
      rocks: rocks,
      score: 0,
      gameOver: false
    }

    /* Initialize Game */

    this.travelId = setInterval(() => {
      if(this.state.gameOver){
        return
      }

      let newBoard = [];
      for(let i = 0; i<20; i++){
        newBoard.push(new Array(30).fill('brown'))
      }

      let newRocks = [...this.state.rocks];
      for(let i = 0; i < newRocks.length; i++){
        newRocks[i].x--
        if(newRocks[i].x < 0){
          newRocks[i].x = 29
          newRocks[i].y = Math.floor(Math.random() * 7) + 3
          newRocks[i].upright = Math.round(Math.random() * 1)
          newRocks[i].length = Math.floor(Math.random() * 7)
        }
      }

      for(let i = 0; i < newRocks.length; i++){
        for(let j = 0; j < newRocks[i].y; j++){
          for(let k = 0; k < newRocks[i].length; k++){
            if(newRocks[i].upright){
              newBoard[19-j][newRocks[i].x] = 'black'
              newBoard[19-j][newRocks[i].x + k] = 'black'
            }
            else {
              newBoard[j][newRocks[i].x] = 'black'
              newBoard[j][newRocks[i].x + k] = 'black'
            }
          }
        }
      }

      let newShip = this.state.ship
      newShip.y++

      for(let i = 0; i < 20; i++){
        if(newBoard[i][2] === 'black' && newShip.y === i){
          newShip.y = 10
          this.setState({ gameOver: true})
          clearInterval(this.scoreId)
        }
      }
      if(newShip.y < 0 || newShip.y > 19){
        newShip.y = 10
        this.setState({ gameOver: true })
        clearInterval(this.scoreId)

      }

      newBoard[newShip.y][newShip.x] = 'white'


      this.setState({ board: newBoard, ship: newShip, rocks: newRocks})
    }, 200)


    this.scoreId = setInterval( () => {
      if(this.state.gameOver){
        return
      }
      let scoreCopy = ++this.state.score
      this.setState({ score: scoreCopy })
    }, 1000)
  }

  handleFlying = event => {
    if(this.state.gameOver){
      return
    }
    //for clicking
    let newShip = this.state.ship
    newShip.y-= 2
    this.setState({ ship: newShip })

    // console.log(event)
    // let newShip = this.state.ship
    // if(event.key == 'w'){
    //   newShip.height-= 1
    //   this.setState({ship: newShip})
    // }
    // else if(event.key == 's'){
    //   newShip.height+= 1
    //   this.setState({ship: newShip})
    // }
    // else if(event.key == 'd'){
    //   newShip.position++
    //   this.setState({ship: newShip})
    // }
    // else if(event.key == 'a'){
    //   newShip.position--
    //   this.setState({ship: newShip})
    // }
  }

  switchBack = () => {
    // this.setState({gameOver: false}
    let winnings = this.state.score * 5
    let tower = {...this.props.tower, resources: this.props.tower.resources + winnings}
    this.props.applyingRateTower(tower)
    this.props.switchGameMode()
  }

  render(){
    return (
      <Grid>
        <Grid.Row columns={2}>
        <Grid.Column width={4}>
        <Header inverted size='huge'>
          Time Alive: {this.state.score}
        </Header>
        <Header inverted size='huge'>
          Resources Collected: {this.state.score * 5}
        </Header>
      </Grid.Column>
      <Grid.Column width={8}>
        <div id="space-travel" tabIndex="0" onClick={this.handleFlying}>
        <Board board={this.state.board}/>
        {this.state.gameOver ?
          <div>
            <Button onClick={this.switchBack}>Return to Bunker</Button>
          </div>
          : null
        }
        </div>
      </Grid.Column>
    </Grid.Row>
  </Grid>

    )
  }
}

const mapStateToProps = state => {
  return {
    gameMode: state.gameMode,
    tower: state.tower
  }
}

export default connect(mapStateToProps, { switchGameMode, applyingRateTower })(Explore)


///////////////////////////
/* GAME BOARD COMPONENTS */
///////////////////////////

const BoardCell = props => {
  return (
    <div style={{
      width: 30,
      height: 30,
      backgroundColor: props.cell === "white" ? "brown" : props.cell,
      backgroundSize: '30px 30px',
      backgroundImage: props.cell === "white" ? 'url(https://i.imgur.com/5fLOrIr.png)' : null}}>
      </div>
  )
}

const BoardRow = props => {
  let style = {
    display: 'flex'
  }
  return(
    <div style={style}>
      {props.row.map( (cell, index) => {
        return <BoardCell cell={cell} key={index}/>
        })
      }
    </div>
  )
}

const Board = props => {
  return (
    <div>
      {props.board.map( (row, index) => {
        return <BoardRow row={row} key={index}/>
        })
      }
    </div>
  )
}