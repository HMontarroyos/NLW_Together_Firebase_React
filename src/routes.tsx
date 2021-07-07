import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./Pages/Home";
import { NewRoom } from "./Pages/NewRoom";

import "./Styles/Global.scss";
import { auth} from "./Services/Firebase";
import firebase from "firebase";

import {AuthContextProvider} from "./Contexts/AuthContext"
import { Room } from "./Pages/Room";
import { AdminRoom } from "./Pages/AdminRoom";
import {ThemeContextProvider} from "./Contexts/ThemeContext";




function Routes() {



    return (
        <BrowserRouter>
            <ThemeContextProvider>
                    <AuthContextProvider>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/rooms/new" exact component={NewRoom} />
                            <Route path="/rooms/:id" exact component={Room} />
                            <Route path="/admin/rooms/:id/:authid" exact component={AdminRoom}/>
                            {/* <Route path="/admin/rooms/:id" component={AdminRoom}/>  */}
                        </Switch>
                    </AuthContextProvider>
            </ThemeContextProvider>
        </BrowserRouter>
    );
}

export default Routes;
