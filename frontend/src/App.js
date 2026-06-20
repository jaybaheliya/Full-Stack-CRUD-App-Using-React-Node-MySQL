import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { Student } from './Student';
import  CreateStudents from './CreateStudents';
import EditStudent from './EditStudent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Student />} />
          <Route path="/create" element={<CreateStudents />} />
          <Route path="/edit/:id" element={<EditStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
