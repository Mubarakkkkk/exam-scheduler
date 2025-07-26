import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { StudentPage } from './pages/StudentPage';
import { ScheduleExam } from './components/ScheduleExam';

import { Routes, Route } from 'react-router-dom';

function App() {
 

  return (
    <>
      <Routes>
        <Route path = "/" element = { <LoginPage /> } />
        <Route path = "/admin/*" element = { <AdminPage /> } />
        <Route path = "/student/*" element = { <StudentPage /> } />
      </Routes>
    </>
  )
}

export default App
