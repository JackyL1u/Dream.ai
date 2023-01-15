import Grid from '@mui/material/Grid';
import './App.css';
import Header from "./components/Header"
import Body from "./components/Body"

function App() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Grid container>
        <Grid item xs={12}>
          <Header></Header>
          </Grid>
          <Grid item xs={12} style={{position: "relative"}}>
          <Body></Body>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
