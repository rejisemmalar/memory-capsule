import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CreateCapsule from "../pages/CreateCapsule";
import CapsulesTimeline from "../pages/CapsuleTimeline";

function AppRoutes(){

    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/create" element={<CreateCapsule/>}/>
            <Route path="/capsules" element={<CapsulesTimeline/>}/>
        </Routes>
    )
}

export default AppRoutes;