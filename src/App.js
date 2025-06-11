import './style.scss'
import * as React from "react";
// import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Footer from './Components/Footer'
import Register from './Pages/Register'
import Write from './Pages/Write'
import Single from './Pages/Single'


const Layout=()=> {

return (
<>
<Navbar/>
<Outlet/>
<Footer/>
</>

)
  
}

function App() {

const router = createBrowserRouter([
{

path: "/",
element : <Layout/>,
children:[
{
          path: "/",
          element:<Home/>
}
       ,
       {
          path: "/post/:id",
          element:<Single/>
}
,
{
          path: "/write",
          element:<Write/>
}   
           
 
]
},

  {
    path: "/login",
    element: <Login/>
     
  },
  {
    path: "/register",
    element: <Register/>
  },
]);

  return (

   <div className='app'> 
    <div className='container'>
    <RouterProvider router={router} />
    </div>
   </div>

 
  );
}

export default App;
