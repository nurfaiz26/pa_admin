import './App.css';

import React from 'react';
import { Button, Navbar } from "flowbite-react";
// import Main from './components/Main';
// import { GlobalProvider } from './context/GlobalContext';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
// import Home from './components/Home';
// import Create from './components/Create';
// import CustomNavbar from './components/CustomNavbar';
import Cookies from 'js-cookie';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Sidebar from './components/sidebar';
import Users from './pages/users';
import UsersForm from './pages/usersForm';
import Classifications from './pages/classifications';
import ClassificationsForm from './pages/classificationsForm';
import { MainProvider } from './context/MainContext';
import Patients from './pages/patients';
import PatientsForm from './pages/patientsForm';

export function Component() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button>Get started</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

function App() {
  const LoginRoute = (props) => {

    if (Cookies.get('token') !== undefined) {
      return <Navigate to={'/dashboard'} />
    } else if (Cookies.get('token') === undefined) {
      return props.children
    }
  }

  const DashboardRoute = (props) => {

    if (Cookies.get('token') === undefined) {
      return <Navigate to={'/'} />
    } else if (Cookies.get('token') !== undefined) {
      return props.children
    }
  }

  return (
    <>
      {/* <Component /> */}
      <BrowserRouter>
        <MainProvider>
          {/* <CustomNavbar /> */}
          <Routes>
            {/* <Route path='/' element={<Home />} /> */}
            {/* <Route path='/main' element={<Main />} /> */}
            {/* <Route path='/create' element={<Create />} /> */}
            <Route path='/' element={
              <LoginRoute>
                <Login />
              </LoginRoute>
            } />
            <Route path='/dashboard' element={
              <DashboardRoute>
                <Sidebar />
                <Dashboard />
              </DashboardRoute>
            } />
            <Route path='/users' element={
              <DashboardRoute>
                <Sidebar />
                <Users />
              </DashboardRoute>
            } />
            <Route path='/users-form' element={
              <DashboardRoute>
                <Sidebar />
                <UsersForm />
              </DashboardRoute>
            } />
            <Route path='/users/:IdData' element={
              <DashboardRoute>
                <Sidebar />
                <UsersForm />
              </DashboardRoute>
            } />
            <Route path='/classifications' element={
              <DashboardRoute>
                <Sidebar />
                <Classifications />
              </DashboardRoute>
            } />
            <Route path='/classifications-form' element={
              <DashboardRoute>
                <Sidebar />
                <ClassificationsForm />
              </DashboardRoute>
            } />
            <Route path='/classifications/:IdData' element={
              <DashboardRoute>
                <Sidebar />
                <ClassificationsForm />
              </DashboardRoute>
            } />
            <Route path='/patients' element={
              <DashboardRoute>
                <Sidebar />
                <Patients />
              </DashboardRoute>
            } />
            <Route path='/patients-form' element={
              <DashboardRoute>
                <Sidebar />
                <PatientsForm />
              </DashboardRoute>
            } />
            <Route path='/patients/:IdData' element={
              <DashboardRoute>
                <Sidebar />
                <PatientsForm />
              </DashboardRoute>
            } />
            <Route path='*' element={<Navigate to='/' />} />
            {/* <Route path='/edit/:IdData' element={<Create />} /> */}
          </Routes>
        </MainProvider>
      </BrowserRouter>
    </>

  );
}

export default App;
