import './App.css';
import Footer from './Components/Footer/Footer';
import TaskForm from './Components/TaskForm/TaskForm';
import TaskWeeklyList from './Components/TaskWeeklyList/TaskWeeklyList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Prioritization</h1>
      </header>
      <main>
        <TaskForm />
        <TaskWeeklyList />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
